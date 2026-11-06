import React, { useState } from 'react';
import { PaymentLink, MembershipPlanType } from '../../types';
import { useDemoStore } from '../../store/demoStore';
import { X, Link2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PaymentLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingLink?: PaymentLink | null;
}

export const PaymentLinkModal: React.FC<PaymentLinkModalProps> = ({
  isOpen,
  onClose,
  existingLink = null
}) => {
  const { addPaymentLink, updatePaymentLink, addActivity } = useDemoStore();

  const [name, setName] = useState(existingLink?.name || 'VIP Seasonal Pass');
  const [url, setUrl] = useState(existingLink?.url || 'https://buy.stripe.com/test_vip_seasonal_punt_ai');
  const [productId, setProductId] = useState(existingLink?.stripeProductId || 'prod_PuntSeasonal_2026');
  const [priceId, setPriceId] = useState(existingLink?.stripePriceId || 'price_1N985xSeasonal299AUD');
  const [membershipType, setMembershipType] = useState<MembershipPlanType>(existingLink?.membershipType || 'monthly');
  const [amount, setAmount] = useState(existingLink?.amount || 299);
  const [billingInterval, setBillingInterval] = useState<'week' | 'month' | 'one_time'>(
    existingLink?.billingInterval || 'month'
  );
  const [accessBehavior, setAccessBehavior] = useState(
    existingLink?.accessBehavior ||
      'Assign Premium role on invoice.paid. Keep role active through paid-through period.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    if (existingLink) {
      updatePaymentLink(existingLink.id, {
        name,
        url,
        stripeProductId: productId,
        stripePriceId: priceId,
        membershipType,
        amount: Number(amount),
        billingInterval,
        accessBehavior,
        updatedAt: now
      });

      addActivity({
        category: 'admin',
        title: 'Payment Link Configuration Updated',
        description: `Updated mapping for ${name} (${priceId} → ${membershipType}). No code redeployment required.`,
        result: 'success',
        referenceId: priceId
      });
    } else {
      const newId = `plink_${Date.now()}`;
      addPaymentLink({
        id: newId,
        name,
        stripePaymentLinkId: `plink_${Date.now()}`,
        stripeProductId: productId,
        stripePriceId: priceId,
        url,
        membershipType,
        amount: Number(amount),
        currency: 'AUD',
        billingInterval,
        active: true,
        accessBehavior,
        updatedAt: now
      });

      addActivity({
        category: 'admin',
        title: 'New Stripe Payment Link Registered',
        description: `Registered new link ${name} (${priceId}) in central mapping registry.`,
        result: 'success',
        referenceId: priceId
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E3E8E1] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#17392F] px-6 py-4.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#285B49] flex items-center justify-center text-white">
              <Link2 className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">
                {existingLink ? 'Edit Stripe Payment Link Configuration' : 'Add New Stripe Payment Link'}
              </h3>
              <p className="text-[11px] text-[#A1B5A3]">
                Zero-code Price-to-membership mapping registry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#A1B5A3] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Internal Plan / Link Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. VIP Spring Carnival Special"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Stripe Payment Link URL
              </label>
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://buy.stripe.com/..."
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Stripe Product ID
              </label>
              <input
                type="text"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                placeholder="prod_..."
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Stripe Price ID (Crucial Verification Key)
              </label>
              <input
                type="text"
                required
                value={priceId}
                onChange={(e) => setPriceId(e.target.value)}
                placeholder="price_..."
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Membership Type
              </label>
              <select
                value={membershipType}
                onChange={(e) => setMembershipType(e.target.value as MembershipPlanType)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] bg-white focus:outline-none focus:border-[#285B49]"
              >
                <option value="weekly">Recurring Weekly</option>
                <option value="monthly">Recurring Monthly</option>
                <option value="lifetime">Lifetime Premium</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Amount (AUD)
              </label>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Access Behavior Policy
              </label>
              <textarea
                rows={2}
                value={accessBehavior}
                onChange={(e) => setAccessBehavior(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#E0E9E0] border border-[#A1B5A3]/40 text-[11px] text-[#17392F] space-y-1">
            <p className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#285B49]" />
              Architectural Independence Rule:
            </p>
            <p className="text-[#285B49]">
              Webhook processing verifies the purchased <strong>Price ID</strong> rather than hardcoded URLs. Any payment link using this Price ID will automatically assign the correct Discord @Premium role without requiring code changes!
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg text-[#747E76] hover:bg-[#F5F6F2]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#17392F] hover:bg-[#285B49] text-white shadow-xs transition-colors"
            >
              {existingLink ? 'Save Configuration Changes' : 'Register Payment Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

