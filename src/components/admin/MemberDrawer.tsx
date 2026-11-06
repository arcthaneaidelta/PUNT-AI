import React, { useState } from 'react';
import { Member } from '../../types';
import { useDemoStore } from '../../store/demoStore';
import {
  X,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  UserCheck,
  UserX,
  FileText
} from 'lucide-react';

interface MemberDrawerProps {
  member: Member | null;
  onClose: () => void;
}

export const MemberDrawer: React.FC<MemberDrawerProps> = ({ member, onClose }) => {
  const { manualRoleOverride, updateMember } = useDemoStore();
  const [overrideModal, setOverrideModal] = useState<'grant' | 'revoke' | null>(null);
  const [overrideReason, setOverrideReason] = useState('');
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  if (!member) return null;

  const handleOverrideSubmit = () => {
    if (!overrideModal || !overrideReason.trim()) return;
    manualRoleOverride(member.id, overrideModal === 'grant', overrideReason);
    setOverrideModal(null);
    setOverrideReason('');
  };

  const handleResync = async () => {
    setSyncing(true);
    await new Promise((r) => setTimeout(r, 600));
    setSyncing(false);
    setSyncSuccess(true);
    setTimeout(() => setSyncSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-xl bg-white shadow-2xl border-l border-[#E3E8E1] h-full flex flex-col overflow-y-auto animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E3E8E1] bg-[#F5F6F2] sticky top-0 z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#17392F] text-white font-bold flex items-center justify-center text-sm shadow-xs">
              {member.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#17392F]">{member.name}</h3>
                {member.lifetime && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAE2D6] text-[#785929]">
                    LIFETIME VIP
                  </span>
                )}
              </div>
              <p className="text-xs text-[#747E76]">{member.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#747E76] hover:text-[#202923] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 text-xs flex-1">
          {/* Quick Status Bar */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#EBEFE9] border border-[#E3E8E1]">
            <div>
              <span className="text-[10px] font-semibold text-[#747E76] uppercase tracking-wider">
                Plan
              </span>
              <p className="font-bold text-[#17392F] text-xs capitalize">
                {member.membershipType} (A${member.amount})
              </p>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#747E76] uppercase tracking-wider">
                Stripe Status
              </span>
              <p className="font-bold text-xs capitalize text-[#202923]">
                {member.membershipStatus.replace('_', ' ')}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-[#747E76] uppercase tracking-wider">
                Discord Role
              </span>
              <p className={`font-bold text-xs capitalize ${
                member.roleStatus === 'active' ? 'text-[#4B805D]' : 'text-[#B75F58]'
              }`}>
                {member.roleStatus}
              </p>
            </div>
          </div>

          {/* Discord Identity & Age Verification */}
          <div className="p-4 rounded-xl border border-[#E3E8E1] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3E8E1]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#5865F2]" />
                <h4 className="font-bold text-[#17392F]">Discord Server Integration</h4>
              </div>
              <span className="text-[11px] font-medium text-[#747E76]">
                Server: Punt AI Community (~2k)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[#747E76]">Discord Username:</span>
                <p className="font-mono font-medium text-[#202923]">
                  {member.discordUsername || 'Not Connected'}
                </p>
              </div>
              <div>
                <span className="text-[#747E76]">Discord User ID (Permanent Key):</span>
                <p className="font-mono font-medium text-[#202923]">
                  {member.discordId || 'Pending OAuth2'}
                </p>
              </div>
              <div>
                <span className="text-[#747E76]">18+ Age Verified:</span>
                <p className="font-semibold text-[#4B805D] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {member.ageConfirmed ? 'Confirmed (Audit Stored)' : 'Pending Check'}
                </p>
              </div>
              <div>
                <span className="text-[#747E76]">Role Status:</span>
                <p className="font-semibold text-[#202923]">
                  @Premium ({member.roleStatus === 'active' ? 'Assigned' : 'Unassigned'})
                </p>
              </div>
            </div>
          </div>

          {/* Stripe Billing Details */}
          <div className="p-4 rounded-xl border border-[#E3E8E1] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3E8E1]">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#17392F]" />
                <h4 className="font-bold text-[#17392F]">Stripe Billing Identity</h4>
              </div>
              <span className="text-[11px] text-[#285B49] font-semibold">
                AUD Currency
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
              <div>
                <span className="text-[#747E76] font-sans">Customer ID:</span>
                <p className="text-[#202923]">{member.stripeCustomerId}</p>
              </div>
              <div>
                <span className="text-[#747E76] font-sans">Subscription ID:</span>
                <p className="text-[#202923]">{member.subscriptionId}</p>
              </div>
              <div>
                <span className="text-[#747E76] font-sans">Joined Date:</span>
                <p className="text-[#202923] font-sans">{member.joinedAt.substring(0, 10)}</p>
              </div>
              <div>
                <span className="text-[#747E76] font-sans">Current Period End:</span>
                <p className="text-[#202923] font-sans font-semibold">
                  {member.currentPeriodEnd.substring(0, 10)}
                </p>
              </div>
            </div>
          </div>

          {/* Administrative Actions */}
          <div className="p-4 rounded-xl border border-[#E3E8E1] bg-[#F5F6F2] space-y-3">
            <h4 className="font-bold text-[#17392F] flex items-center justify-between">
              <span>Administrative Actions & Overrides</span>
              <span className="text-[10px] text-[#747E76] font-normal">
                Audit logged in system
              </span>
            </h4>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleResync}
                disabled={syncing}
                className="py-1.5 px-3 rounded-lg border border-[#E3E8E1] bg-white hover:bg-[#EBEFE9] font-medium text-[#202923] flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                {syncSuccess ? 'Role Synced!' : 'Resync Discord Role'}
              </button>

              {member.roleStatus !== 'active' ? (
                <button
                  onClick={() => setOverrideModal('grant')}
                  className="py-1.5 px-3 rounded-lg bg-[#285B49] hover:bg-[#17392F] text-white font-medium flex items-center gap-1.5 transition-colors"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Manually Grant Role
                </button>
              ) : (
                <button
                  onClick={() => setOverrideModal('revoke')}
                  className="py-1.5 px-3 rounded-lg border border-[#B75F58]/40 text-[#B75F58] hover:bg-[#F9ECEB] font-medium flex items-center gap-1.5 transition-colors"
                >
                  <UserX className="w-3.5 h-3.5" />
                  Manually Revoke Role
                </button>
              )}
            </div>

            {/* Confirmation Dialog for Override */}
            {overrideModal && (
              <div className="p-3.5 rounded-lg border border-[#B68B4D]/50 bg-white space-y-2 mt-2">
                <div className="flex items-center gap-1.5 text-[#B68B4D] font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Confirm Manual Role Override ({overrideModal.toUpperCase()})</span>
                </div>
                <p className="text-[11px] text-[#747E76]">
                  A manual override alters the live Discord role without changing Stripe billing. A formal audit reason is required.
                </p>
                <input
                  type="text"
                  required
                  placeholder="Reason (e.g. VIP goodwill, dispute resolution, trial extension)"
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
                />
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => setOverrideModal(null)}
                    className="px-2.5 py-1 text-xs text-[#747E76] hover:bg-[#F5F6F2] rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleOverrideSubmit}
                    disabled={!overrideReason.trim()}
                    className="px-3 py-1 text-xs font-semibold rounded bg-[#17392F] text-white hover:bg-[#285B49] disabled:opacity-50"
                  >
                    Confirm Override
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Membership Timeline */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#17392F] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#747E76]" />
              <span>Membership Lifecycle Audit Trail</span>
            </h4>

            <div className="space-y-3 border-l-2 border-[#E3E8E1] pl-4 ml-2">
              {member.timeline?.map((t) => (
                <div key={t.id} className="relative group">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#17392F] ring-4 ring-white" />
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#202923]">{t.event}</span>
                    <span className="text-[#747E76] font-mono text-[10px]">{t.timestamp}</span>
                  </div>
                  <p className="text-[#747E76] text-[11px] mt-0.5 leading-snug">{t.details}</p>
                  <span className="inline-block mt-1 text-[9px] uppercase font-bold text-[#A1B5A3] tracking-wider">
                    Source: {t.source}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

