import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import { X, ShieldCheck, CreditCard, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface CustomerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

export const CustomerPortalModal: React.FC<CustomerPortalModalProps> = ({
  isOpen,
  onClose,
  initialEmail = 'jordan.mitchell@sydneyfooty.com.au'
}) => {
  const { members, scheduleCancellation } = useDemoStore();
  const [step, setStep] = useState<'request_otp' | 'verify_otp' | 'portal_view'>('portal_view');
  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState('491823');
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancellationConfirmed, setCancellationConfirmed] = useState(false);

  if (!isOpen) return null;

  const currentMember = members.find((m) => m.email.toLowerCase() === email.toLowerCase()) || members[0];

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('verify_otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('portal_view');
  };

  const handleCancelSubscription = () => {
    if (currentMember) {
      scheduleCancellation(currentMember.id);
      setCancellationConfirmed(true);
      setCancelModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E3E8E1] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Stripe Customer Portal Header */}
        <div className="bg-[#17392F] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#285B49] text-white flex items-center justify-center font-bold text-xs">
              S
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#A1B5A3] font-semibold">
                Stripe Customer Portal
              </p>
              <h3 className="text-sm font-bold text-white">Punt AI Billing Management</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#A1B5A3] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content depending on Step */}
        <div className="p-6 space-y-4">
          {step === 'request_otp' && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#17392F]">Permanent Billing Portal Login</h4>
                <p className="text-xs text-[#747E76]">
                  Enter the email address you used at Stripe checkout to receive a secure login link.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202923] mb-1">
                  Stripe Customer Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg text-xs font-semibold bg-[#17392F] text-white hover:bg-[#285B49] transition-all"
              >
                Send Verification Code
              </button>
            </form>
          )}

          {step === 'verify_otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#17392F]">Enter Security Code</h4>
                <p className="text-xs text-[#747E76]">
                  A 6-digit verification code has been dispatched to <strong>{email}</strong>.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202923] mb-1">
                  6-Digit Verification Code
                </label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-3 py-2 text-sm tracking-widest text-center font-mono rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg text-xs font-semibold bg-[#17392F] text-white hover:bg-[#285B49] transition-all"
              >
                Access Billing Portal →
              </button>
            </form>
          )}

          {step === 'portal_view' && currentMember && (
            <div className="space-y-4 text-xs">
              {cancellationConfirmed && (
                <div className="p-3 rounded-xl bg-[#E0E9E0] border border-[#A1B5A3]/50 flex items-start gap-2.5 text-xs text-[#17392F]">
                  <CheckCircle2 className="w-4 h-4 text-[#4B805D] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Cancellation Scheduled Successfully</p>
                    <p className="text-[11px] text-[#285B49]">
                      Your Discord @Premium role remains active until{' '}
                      <strong>{currentMember.currentPeriodEnd.substring(0, 10)}</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* Current Subscription Card */}
              <div className="p-4 rounded-xl border border-[#E3E8E1] bg-[#F5F6F2] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#747E76] tracking-wider">
                      Current Subscription
                    </span>
                    <h4 className="text-sm font-bold text-[#17392F]">
                      {currentMember.membershipType.toUpperCase()} PREMIUM
                    </h4>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    currentMember.membershipStatus === 'active'
                      ? 'bg-[#E0E9E0] text-[#285B49]'
                      : currentMember.membershipStatus === 'cancellation_scheduled'
                      ? 'bg-[#FDF3E3] text-[#B68B4D]'
                      : 'bg-white text-[#747E76] border border-[#E3E8E1]'
                  }`}>
                    {currentMember.membershipStatus === 'cancellation_scheduled'
                      ? 'Cancels at Period End'
                      : currentMember.membershipStatus.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E3E8E1] text-[11px]">
                  <div>
                    <span className="text-[#747E76]">Billing Rate:</span>
                    <p className="font-semibold text-[#202923]">
                      A${currentMember.amount}.00 / {currentMember.billingInterval}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#747E76]">Paid-Through Date:</span>
                    <p className="font-semibold text-[#202923]">
                      {currentMember.currentPeriodEnd.substring(0, 10)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="p-3.5 rounded-xl border border-[#E3E8E1] bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EBEFE9] flex items-center justify-center text-[#17392F]">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#202923]">Visa ending in 4242</p>
                    <p className="text-[10px] text-[#747E76]">Expires 12/28 • Default Payment Method</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Simulated card update dialog.')}
                  className="px-2.5 py-1 text-[11px] font-semibold text-[#285B49] hover:bg-[#E0E9E0] rounded transition-colors"
                >
                  Update
                </button>
              </div>

              {/* Cancellation Actions */}
              {!currentMember.lifetime && currentMember.membershipStatus !== 'cancellation_scheduled' && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setCancelModalOpen(true)}
                    className="w-full py-2 px-3 text-xs font-semibold text-[#B75F58] border border-[#B75F58]/30 hover:bg-[#F9ECEB] rounded-lg transition-colors"
                  >
                    Cancel Membership
                  </button>
                </div>
              )}

              {/* Confirmation Dialog for Cancellation */}
              {cancelModalOpen && (
                <div className="p-4 rounded-xl border border-[#B68B4D]/50 bg-[#FDF8F0] space-y-3 animate-in fade-in">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-[#B68B4D] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-xs text-[#202923]">Confirm Subscription Cancellation</h5>
                      <p className="text-[11px] text-[#747E76] mt-1 leading-relaxed">
                        Under Punt AI policies, your <strong>Discord @Premium role will remain active</strong> until the end of your current paid billing period on <strong>{currentMember.currentPeriodEnd.substring(0, 10)}</strong>. You will not be charged again.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setCancelModalOpen(false)}
                      className="px-3 py-1.5 rounded text-xs text-[#747E76] hover:bg-white"
                    >
                      Keep Membership
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelSubscription}
                      className="px-3 py-1.5 rounded text-xs font-semibold bg-[#B75F58] text-white hover:bg-[#a64e48]"
                    >
                      Confirm Cancellation
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#747E76]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4B805D]" />
                <span>Permanent Stripe portal URL: Never relies on an expiring session URL.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

