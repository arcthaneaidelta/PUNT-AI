import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import { CustomerPortalModal } from '../../components/customer/CustomerPortalModal';
import { CreditCard, ShieldCheck, CheckCircle2, AlertCircle, ArrowLeft, ExternalLink, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MembershipManagePage: React.FC = () => {
  const { members, activeMemberId, scheduleCancellation } = useDemoStore();
  const [portalOpen, setPortalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const currentMember = members.find((m) => m.id === activeMemberId) || members[0];

  const handleCancel = () => {
    scheduleCancellation(currentMember.id);
    setCancelModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F6F2] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-[#E3E8E1] overflow-hidden space-y-0">
        {/* Top Header */}
        <div className="bg-[#17392F] px-8 py-6 text-white space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Punt AI Self-Service Portal</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Your membership. Your choice.</h2>
          <p className="text-xs text-[#A1B5A3]">
            Manage subscriptions, update payment methods, or download tax receipts securely.
          </p>
        </div>

        <div className="p-8 space-y-6 text-xs text-[#202923]">
          {/* Subscription Snapshot */}
          <div className="p-4 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3E8E1]">
              <span className="font-bold text-[#17392F] text-sm capitalize">
                {currentMember.membershipType} Premium
              </span>
              <span className="font-bold text-sm text-[#17392F] font-tabular">
                A${currentMember.amount}.00 AUD / {currentMember.billingInterval}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-[#747E76]">Customer Email:</span>
                <p className="font-semibold text-[#202923]">{currentMember.email}</p>
              </div>
              <div>
                <span className="text-[#747E76]">Discord Account:</span>
                <p className="font-mono font-semibold text-[#202923]">
                  {currentMember.discordUsername || 'Not Connected'}
                </p>
              </div>
              <div>
                <span className="text-[#747E76]">Next Renewal / Expiration:</span>
                <p className="font-semibold text-[#202923]">
                  {currentMember.currentPeriodEnd.substring(0, 10)}
                </p>
              </div>
              <div>
                <span className="text-[#747E76]">Role Status:</span>
                <p className="font-bold text-[#4B805D] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> @Premium Active
                </p>
              </div>
            </div>
          </div>

          {/* Primary Action Button to Open Customer Portal */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => setPortalOpen(true)}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-[#17392F] hover:bg-[#285B49] text-white flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <CreditCard className="w-4 h-4" />
              Open Secure Billing Portal
              <ExternalLink className="w-4 h-4" />
            </button>

            <Link
              to="/member/dashboard"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-white border border-[#E3E8E1] hover:bg-[#F5F6F2] text-[#202923] flex items-center justify-center gap-2 transition-colors"
            >
              Go to Member Dashboard
            </Link>
          </div>

          {/* Permanent Login Explanation from PRD Section 6.4 */}
          <div className="p-4 rounded-xl bg-[#EBEFE9] border border-[#E3E8E1] space-y-1.5 text-[11px] text-[#747E76]">
            <p className="font-semibold text-[#17392F] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#285B49]" />
              Permanent Portal Entry Point:
            </p>
            <p className="leading-relaxed">
              This URL remains permanent for all Punt AI members. When opening the portal, a customer-specific session is authenticated for your registered email address without relying on an expiring link.
            </p>
          </div>
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

