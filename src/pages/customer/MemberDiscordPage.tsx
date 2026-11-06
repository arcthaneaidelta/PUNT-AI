import React from 'react';
import { useDemoStore } from '../../store/demoStore';
import { ArrowLeft, MessageSquare, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MemberDiscordPage: React.FC = () => {
  const { members, activeMemberId } = useDemoStore();
  const currentMember = members.find((m) => m.id === activeMemberId) || members[0];

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
          <span className="text-xs text-[#747E76]">Discord Guild Integration</span>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#17392F]">Discord Account & Permissions</h2>
            <p className="text-xs text-[#747E76] mt-1">
              Your linked Discord profile and active server roles.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#17392F] font-mono">
                    {currentMember.discordUsername || 'Not Connected'}
                  </h3>
                  <p className="text-[11px] text-[#747E76] font-mono">
                    Discord ID: {currentMember.discordId || 'Pending OAuth'}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E0E9E0] text-[#285B49] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> @Premium Role
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E3E8E1] text-[11px]">
              <div>
                <span className="text-[#747E76]">Server Name:</span>
                <p className="font-semibold text-[#202923]">Punt AI Sports Tipping</p>
              </div>
              <div>
                <span className="text-[#747E76]">Total Guild Members:</span>
                <p className="font-semibold text-[#202923]">~2,000 members</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <Link
              to="/connect-discord"
              className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#17392F] text-white hover:bg-[#285B49] transition-colors"
            >
              Re-link or Switch Discord Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

