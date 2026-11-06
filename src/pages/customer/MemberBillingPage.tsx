import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import { CustomerPortalModal } from '../../components/customer/CustomerPortalModal';
import { CreditCard, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MemberBillingPage: React.FC = () => {
  const { members, activeMemberId, scheduleCancellation } = useDemoStore();
  const [portalOpen, setPortalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const currentMember = members.find((m) => m.id === activeMemberId) || members[0];

  const handleCancel = () => {
    scheduleCancellation(currentMember.id);
    setCancelModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F6F2] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E1]">
          <Link
            to="/member/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17392F] hover:text-[#285B49]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <span className="text-xs text-[#747E76]">Stripe Self-Service Billing</span>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#17392F]">Your Billing & Subscription</h2>
            <p className="text-xs text-[#747E76] mt-1">
              Review recurring plan details, tax invoices, and payment methods.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#747E76] uppercase tracking-wider">
                  Active Subscription
                </span>
                <h3 className="text-lg font-bold text-[#17392F] capitalize mt-0.5">
                  {currentMember.membershipType} Premium
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E0E9E0] text-[#285B49]">
                A${currentMember.amount}.00 AUD / {currentMember.billingInterval}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-3 border-t border-[#E3E8E1] text-[11px]">
              <div>
                <span className="text-[#747E76]">Status:</span>
                <p className="font-bold text-[#202923] capitalize">
                  {currentMember.membershipStatus.replace('_', ' ')}
                </p>
              </div>
              <div>
                <span className="text-[#747E76]">Paid-Through Date:</span>
                <p className="font-semibold text-[#202923]">
                  {currentMember.currentPeriodEnd.substring(0, 10)}
                </p>
              </div>
              <div>
                <span className="text-[#747E76]">Stripe Customer ID:</span>
                <p className="font-mono text-[#202923]">{currentMember.stripeCustomerId}</p>
              </div>
            </div>
          </div>

          {/* Customer Portal Action */}
          <div className="p-5 rounded-xl border border-[#E3E8E1] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-[#17392F] flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#285B49]" />
                Permanent Stripe Customer Portal
              </h4>
              <p className="text-xs text-[#747E76] max-w-md">
                Securely update your payment method, view invoices, or change your billing details without contacting support.
              </p>
            </div>
            <button
              onClick={() => setPortalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#17392F] hover:bg-[#285B49] text-white transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
            >
              Open Secure Billing Portal <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cancellation section */}
          {!currentMember.lifetime && currentMember.membershipStatus !== 'cancellation_scheduled' && (
            <div className="pt-4 border-t border-[#E3E8E1] flex items-center justify-between">
              <div>
                <h5 className="font-bold text-xs text-[#202923]">Cancel Subscription</h5>
                <p className="text-[11px] text-[#747E76]">
                  Access continues uninterrupted until {currentMember.currentPeriodEnd.substring(0, 10)}.
                </p>
              </div>
              <button
                onClick={() => setCancelModalOpen(true)}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#B75F58] border border-[#B75F58]/30 hover:bg-[#F9ECEB] rounded-lg transition-colors"
              >
                Cancel Subscription
              </button>
            </div>
          )}

          {cancelModalOpen && (
            <div className="p-4 rounded-xl border border-[#B68B4D]/50 bg-[#FDF8F0] space-y-3">
              <div className="flex items-start gap-2 text-xs">
                <AlertCircle className="w-4 h-4 text-[#B68B4D] shrink-0 mt-0.5" />
                <p className="text-[#747E76]">
                  Under Punt AI cancellation rules, you will retain your <strong>@Premium Discord role</strong> until the end of your current paid period on <strong>{currentMember.currentPeriodEnd.substring(0, 10)}</strong>.
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setCancelModalOpen(false)}
                  className="px-3 py-1 rounded text-xs text-[#747E76]"
                >
                  Never mind
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3.5 py-1 rounded text-xs font-bold bg-[#B75F58] text-white"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <CustomerPortalModal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        initialEmail={currentMember.email}
      />
    </div>
  );
};

