import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import { CustomerPortalModal } from '../../components/customer/CustomerPortalModal';
import {
  CreditCard,
  MessageSquare,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  Receipt
} from 'lucide-react';

export const MemberDashboardPage: React.FC = () => {
  const { members, activeMemberId, setActiveMemberId, scheduleCancellation } = useDemoStore();
  const [portalOpen, setPortalOpen] = useState(false);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  const currentMember = members.find((m) => m.id === activeMemberId) || members[0];

  const handleCancel = () => {
    scheduleCancellation(currentMember.id);
    setCancelConfirmOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F6F2] py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header & Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E8E1]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#285B49] bg-[#E0E9E0] px-2.5 py-0.5 rounded-full">
                CUSTOMER PORTAL
              </span>
              <span className="text-xs text-[#747E76]">• Punt AI Discord Community</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17392F] tracking-tight mt-1">
              Welcome back, {currentMember.name}
            </h1>
            <p className="text-xs text-[#747E76]">
              Stripe Customer: <code>{currentMember.stripeCustomerId}</code> • Discord:{' '}
              <strong>{currentMember.discordUsername || 'Unlinked'}</strong>
            </p>
          </div>

          {/* Quick Demo Switcher so the client can inspect different member states */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <span className="text-[11px] text-[#747E76] font-medium hidden sm:inline">Viewing:</span>
            <select
              value={currentMember.id}
              onChange={(e) => setActiveMemberId(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-[#E3E8E1] bg-white font-medium text-[#202923] shadow-xs focus:outline-none focus:border-[#285B49]"
            >
              {members.slice(0, 10).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.membershipType.toUpperCase()} - {m.membershipStatus})
                </option>
              ))}
            </select>

            <Link
              to="/admin/overview"
              className="px-3 py-1.5 text-xs font-semibold bg-[#17392F] text-white hover:bg-[#285B49] rounded-lg transition-colors whitespace-nowrap shadow-xs"
            >
              Admin View →
            </Link>
          </div>
        </div>

        {/* Cancellation Scheduled Grace Period Alert Banner */}
        {currentMember.membershipStatus === 'cancellation_scheduled' && (
          <div className="p-4 rounded-2xl bg-[#FDF8F0] border border-[#B68B4D]/40 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#B68B4D] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-[#202923]">Cancellation Scheduled at Period End</h4>
              <p className="text-[#747E76] leading-relaxed">
                Your subscription is set to end, but your <strong>Discord @Premium role remains active</strong> until the end of your paid billing period on <strong>{currentMember.currentPeriodEnd.substring(0, 10)}</strong>. You will not be charged again.
              </p>
            </div>
          </div>
        )}

        {/* Key Membership Snapshot Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Subscription Status */}
          <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#747E76] font-semibold uppercase tracking-wider text-[10px]">
                Membership Tier
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                currentMember.membershipStatus === 'active'
                  ? 'bg-[#E0E9E0] text-[#285B49]'
                  : currentMember.membershipStatus === 'cancellation_scheduled'
                  ? 'bg-[#FDF3E3] text-[#B68B4D]'
                  : 'bg-[#F9ECEB] text-[#B75F58]'
              }`}>
                {currentMember.membershipStatus.toUpperCase().replace('_', ' ')}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#17392F] capitalize">
                {currentMember.membershipType} Premium
              </h3>
              <p className="text-xs text-[#747E76] font-tabular mt-0.5">
                A${currentMember.amount}.00 AUD / {currentMember.billingInterval}
              </p>
            </div>

            <div className="pt-2 border-t border-[#E3E8E1] flex items-center justify-between text-xs text-[#747E76]">
              <span>Next Renewal / End:</span>
              <span className="font-semibold text-[#202923]">
                {currentMember.currentPeriodEnd.substring(0, 10)}
              </span>
            </div>
          </div>

          {/* Card 2: Discord Connection */}
          <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#747E76] font-semibold uppercase tracking-wider text-[10px]">
                Discord Identity
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                currentMember.roleStatus === 'active'
                  ? 'bg-[#E0E9E0] text-[#285B49]'
                  : 'bg-[#F9ECEB] text-[#B75F58]'
              }`}>
                {currentMember.roleStatus === 'active' ? '@Premium Active' : 'Role Missing'}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#17392F] font-mono">
                {currentMember.discordUsername || 'Not Connected'}
              </h3>
              <p className="text-[11px] text-[#747E76] font-mono mt-0.5">
                ID: {currentMember.discordId || 'Pending OAuth'}
              </p>
            </div>

            <div className="pt-2 border-t border-[#E3E8E1] flex items-center justify-between text-xs">
              <span className="text-[#747E76]">Server Access:</span>
              <span className="font-semibold text-[#4B805D] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Punt AI Community
              </span>
            </div>
          </div>

          {/* Card 3: 18+ Verification & Compliance */}
          <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#747E76] font-semibold uppercase tracking-wider text-[10px]">
                Compliance
              </span>
              <ShieldCheck className="w-4 h-4 text-[#4B805D]" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#17392F]">18+ Verified</h3>
              <p className="text-xs text-[#747E76] mt-0.5">
                {currentMember.ageConfirmed ? 'Legal age confirmation logged' : 'Pending verification'}
              </p>
            </div>

            <div className="pt-2 border-t border-[#E3E8E1] flex items-center justify-between text-xs text-[#747E76]">
              <span>Audit Stored:</span>
              <span className="font-mono text-[11px] text-[#202923]">AU-WAGERING-COMPLIANT</span>
            </div>
          </div>
        </div>

        {/* Member Action Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setPortalOpen(true)}
            className="p-4 rounded-xl bg-white border border-[#E3E8E1] hover:border-[#17392F] transition-all text-left space-y-2 group shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E0E9E0] text-[#285B49] flex items-center justify-center group-hover:bg-[#17392F] group-hover:text-white transition-colors">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#202923]">Manage Stripe Billing</h4>
              <p className="text-[11px] text-[#747E76]">Update card, download invoices</p>
            </div>
          </button>

          <Link
            to="/connect-discord"
            className="p-4 rounded-xl bg-white border border-[#E3E8E1] hover:border-[#17392F] transition-all text-left space-y-2 group shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E0E9E0] text-[#285B49] flex items-center justify-center group-hover:bg-[#17392F] group-hover:text-white transition-colors">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#202923]">Discord Connection</h4>
              <p className="text-[11px] text-[#747E76]">Reconnect or re-verify role</p>
            </div>
          </Link>

          <Link
            to="/member/payment-history"
            className="p-4 rounded-xl bg-white border border-[#E3E8E1] hover:border-[#17392F] transition-all text-left space-y-2 group shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E0E9E0] text-[#285B49] flex items-center justify-center group-hover:bg-[#17392F] group-hover:text-white transition-colors">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#202923]">Payment History</h4>
              <p className="text-[11px] text-[#747E76]">View past AUD receipts</p>
            </div>
          </Link>

          <Link
            to="/member/support"
            className="p-4 rounded-xl bg-white border border-[#E3E8E1] hover:border-[#17392F] transition-all text-left space-y-2 group shadow-xs"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E0E9E0] text-[#285B49] flex items-center justify-center group-hover:bg-[#17392F] group-hover:text-white transition-colors">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[#202923]">Community Support</h4>
              <p className="text-[11px] text-[#747E76]">Assistance & tipping FAQ</p>
            </div>
          </Link>
        </div>

        {/* Member Timeline */}
        <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E1]">
            <h3 className="font-bold text-sm text-[#17392F] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#285B49]" />
              Your Membership Timeline
            </h3>
            <span className="text-[11px] text-[#747E76]">Real-time events</span>
          </div>

          <div className="space-y-3 pl-4 border-l-2 border-[#E3E8E1] ml-2 text-xs">
            {currentMember.timeline?.map((t) => (
              <div key={t.id} className="relative group">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#285B49] ring-4 ring-white" />
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#202923] text-xs">{t.event}</span>
                  <span className="text-[#747E76] font-mono text-[10px]">{t.timestamp}</span>
                </div>
                <p className="text-[#747E76] text-[11px] mt-0.5 leading-snug">{t.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Self-Service Cancellation Option */}
        {!currentMember.lifetime && currentMember.membershipStatus !== 'cancellation_scheduled' && (
          <div className="pt-4 flex items-center justify-between p-4 rounded-xl bg-white border border-[#E3E8E1] text-xs">
            <div>
              <p className="font-bold text-[#202923]">Need to pause or cancel your subscription?</p>
              <p className="text-[11px] text-[#747E76]">
                You will retain full Discord @Premium access until the end of your paid billing period.
              </p>
            </div>
            <button
              onClick={() => setCancelConfirmOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#B75F58] border border-[#B75F58]/30 hover:bg-[#F9ECEB] rounded-lg transition-colors"
            >
              Cancel Subscription
            </button>
          </div>
        )}

        {/* Cancellation Confirmation Dialog */}
        {cancelConfirmOpen && (
          <div className="p-4 rounded-xl border border-[#B68B4D]/60 bg-[#FDF8F0] space-y-3">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-[#B68B4D] shrink-0 mt-0.5" />
              <div className="text-xs">
                <h5 className="font-bold text-[#202923]">Confirm Subscription Cancellation</h5>
                <p className="text-[#747E76] mt-1 leading-relaxed">
                  Your access will remain active until <strong>{currentMember.currentPeriodEnd.substring(0, 10)}</strong>. After that date, your Discord @Premium role will be removed automatically.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setCancelConfirmOpen(false)}
                className="px-3 py-1.5 rounded text-xs text-[#747E76] hover:bg-white"
              >
                Keep Active
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-1.5 rounded text-xs font-semibold bg-[#B75F58] text-white hover:bg-[#9c4c47]"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stripe Customer Portal Modal */}
      <CustomerPortalModal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        initialEmail={currentMember.email}
      />
    </div>
  );
};

