import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import { MembershipPlanType } from '../../types';
import { X, Lock, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface StripeCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: MembershipPlanType;
}

export const StripeCheckoutModal: React.FC<StripeCheckoutModalProps> = ({ isOpen, onClose, plan }) => {
  const navigate = useNavigate();
  const { addMember, addPayment, addActivity } = useDemoStore();
  const [email, setEmail] = useState('demo.customer@punt-ai.com.au');
  const [name, setName] = useState('Alex Punter');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('321');
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const planDetails = {
    weekly: {
      name: 'Premium Weekly',
      priceText: 'A$37.00',
      intervalText: 'per week',
      amount: 37,
      billingInterval: 'week' as const,
      priceId: 'price_1N982xWeekly37AUD'
    },
    monthly: {
      name: 'Premium Monthly',
      priceText: 'A$99.00',
      intervalText: 'per month',
      amount: 99,
      billingInterval: 'month' as const,
      priceId: 'price_1N983xMonthly99AUD'
    },
    lifetime: {
      name: 'Lifetime Premium',
      priceText: 'A$1,499.00',
      intervalText: 'one-time payment',
      amount: 1499,
      billingInterval: 'lifetime' as const,
      priceId: 'price_1N984xLifetime1499AUD'
    }
  }[plan];

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    await new Promise((r) => setTimeout(r, 700));

    const now = new Date().toISOString();
    const newMemberId = `mem_demo_${Date.now()}`;
    const stripeCustomerId = `cus_${Math.random().toString(36).substring(2, 9)}`;

    // Add new member in unlinked state (as per PRD: checkout success does not automatically grant role until Discord is connected!)
    addMember({
      id: newMemberId,
      name,
      email,
      discordId: '',
      discordUsername: '',
      stripeCustomerId,
      subscriptionId: `sub_${Date.now()}`,
      membershipType: plan,
      membershipStatus: 'unlinked',
      roleStatus: 'missing',
      amount: planDetails.amount,
      currency: 'AUD',
      billingInterval: planDetails.billingInterval,
      joinedAt: now,
      currentPeriodEnd: plan === 'lifetime' ? '2099-12-31' : '2026-12-06',
      lifetime: plan === 'lifetime',
      linked: false,
      ageConfirmed: false,
      timeline: [
        {
          id: `tl_${Date.now()}_1`,
          timestamp: now.replace('T', ' ').substring(0, 16),
          event: 'Stripe Checkout Completed',
          details: `Purchased ${planDetails.name} for ${planDetails.priceText} AUD via Stripe Payment Link`,
          source: 'stripe'
        },
        {
          id: `tl_${Date.now()}_2`,
          timestamp: now.replace('T', ' ').substring(0, 16),
          event: 'Awaiting Discord Connection',
          details: 'Dispatched "Keep This Email" with one-time Discord account linking token',
          source: 'system'
        }
      ]
    });

    addPayment({
      id: `pay_${Date.now()}`,
      memberId: newMemberId,
      memberName: name,
      memberEmail: email,
      amount: planDetails.amount,
      currency: 'AUD',
      status: 'succeeded',
      paymentMethod: 'Visa •••• 4242',
      stripePaymentIntentId: `pi_${Date.now()}`,
      createdAt: now.replace('T', ' ').substring(0, 16),
      planName: planDetails.name
    });

    addActivity({
      category: 'payment',
      memberId: newMemberId,
      memberName: name,
      title: 'Checkout Succeeded (Awaiting Discord Link)',
      description: `Verified ${planDetails.priceText} AUD for ${name}. Token generated.`,
      result: 'success',
      referenceId: stripeCustomerId
    });

    setProcessing(false);
    onClose();
    navigate(`/membership/success?memberId=${newMemberId}&plan=${plan}&email=${encodeURIComponent(email)}&amount=${planDetails.amount}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E3E8E1] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Stripe Header */}
        <div className="bg-[#17392F] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#285B49] flex items-center justify-center text-white text-xs font-bold">
              P
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#A1B5A3] font-semibold">
                Simulated Stripe Checkout
              </p>
              <h3 className="text-sm font-bold text-white">Punt AI Sports Tipping</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#A1B5A3] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleCheckoutSubmit} className="p-6 space-y-4">
          {/* Order Summary */}
          <div className="p-3.5 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-[#202923]">{planDetails.name}</h4>
              <p className="text-xs text-[#747E76]">{planDetails.intervalText}</p>
            </div>
            <div className="text-right">
              <span className="font-bold text-base text-[#17392F] font-tabular">
                {planDetails.priceText}
              </span>
              <p className="text-[10px] text-[#747E76]">AUD including GST</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Email Address (associated with Stripe customer)
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Card Information (Simulated Demo Test Card)
              </label>
              <div className="border border-[#E3E8E1] rounded-lg p-2.5 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#747E76]" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="text-xs text-[#202923] focus:outline-none w-48 font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-[#4B805D] font-bold">TEST MODE</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E3E8E1]/60">
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="text-xs text-[#747E76] focus:outline-none"
                  />
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="CVC"
                    className="text-xs text-[#747E76] focus:outline-none text-right"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={processing}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#17392F] hover:bg-[#285B49] text-white transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying with Stripe Demo...
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  Pay {planDetails.priceText} AUD (Simulated)
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-[#747E76]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4B805D]" />
            <span>Encrypted Stripe checkout simulation. No real funds charged.</span>
          </div>
        </form>
      </div>
    </div>
  );
};

