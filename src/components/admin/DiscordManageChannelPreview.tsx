import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import {
  MessageSquare,
  Lock,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  EyeOff,
  Sparkles
} from 'lucide-react';

export const DiscordManageChannelPreview: React.FC = () => {
  const { members } = useDemoStore();
  const currentMember = members.find((m) => m.id === 'mem_01') || members[0];
  const [interactionTriggered, setInteractionTriggered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleManageClick = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    setInteractionTriggered(true);
  };

  return (
    <div className="rounded-2xl border border-[#E3E8E1] bg-[#313338] text-[#dbdee1] overflow-hidden shadow-lg font-sans">
      {/* Discord Channel Header Bar */}
      <div className="bg-[#2b2d31] px-4 py-3 border-b border-[#1f2023] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[#80848e] font-bold text-sm">#</span>
          <span className="font-bold text-white tracking-wide">manage-membership</span>
          <span className="hidden sm:inline-block text-[#949ba4] text-[11px] border-l border-[#3f4147] pl-2 ml-1">
            Official Punt AI Premium Member Self-Service Channel
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#949ba4]">
          <span className="w-2 h-2 rounded-full bg-[#23a55a]" />
          <span>Bot Online</span>
        </div>
      </div>

      {/* Discord Chat Messages View */}
      <div className="p-4 sm:p-6 space-y-5 text-xs">
        {/* Pinned Bot Announcement */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#17392F] flex items-center justify-center text-white font-bold text-xs shrink-0 ring-2 ring-[#285B49]">
            PAI
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-[13px]">Punt AI Bot</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#5865F2] text-white uppercase tracking-wider">
                BOT
              </span>
              <span className="text-[10px] text-[#949ba4]">Today at 9:00 AM</span>
            </div>

            {/* Embedded Card */}
            <div className="p-4 rounded-lg bg-[#2b2d31] border-l-4 border-[#285B49] space-y-2.5 max-w-lg">
              <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                Manage Your Punt AI Premium Membership
              </h4>
              <p className="text-[#dbdee1] text-xs leading-relaxed">
                Need to update your billing card, download tax invoices, or cancel your subscription?
                Click below to privately generate your verified Stripe Customer Portal session.
              </p>
              <p className="text-[11px] text-[#949ba4]">
                🔒 <em>Access links are generated ephemerally and visible only to you.</em>
              </p>

              {/* Bot Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleManageClick}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#5865F2] hover:bg-[#4752c4] text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  {loading ? (
                    'Resolving Stripe Identity...'
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      Manage My Membership
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ephemeral Response (Visible Only to Member) */}
        {interactionTriggered && (
          <div className="flex items-start gap-3 bg-[#2b2d31]/50 p-3 rounded-lg border border-[#5865F2]/30 animate-in fade-in slide-in-from-top-1">
            <div className="w-8 h-8 rounded-full bg-[#5865F2] flex items-center justify-center text-white text-xs font-bold shrink-0">
              PAI
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-xs">Punt AI Bot</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#5865F2] text-white">
                    BOT
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#949ba4] bg-[#1e1f22] px-2 py-0.5 rounded">
                  <EyeOff className="w-3 h-3 text-[#f23f43]" />
                  Only you can see this message
                </span>
              </div>

              <div className="p-3 rounded bg-[#1e1f22] border border-[#3f4147] space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-[#23a55a] font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Your membership link is ready</span>
                </div>
                <p className="text-[#dbdee1] leading-relaxed">
                  We located your linked Stripe customer record associated with Discord ID{' '}
                  <code className="bg-[#2b2d31] px-1.5 py-0.5 rounded font-mono text-white text-[11px]">
                    {currentMember.discordId || '849204918204918201'}
                  </code>.
                </p>

                <div className="bg-[#2b2d31] p-2.5 rounded space-y-1 text-[11px]">
                  <p><strong>Member:</strong> {currentMember.name} ({currentMember.email})</p>
                  <p><strong>Plan:</strong> {currentMember.membershipType.toUpperCase()} (A${currentMember.amount})</p>
                  <p><strong>Stripe Customer:</strong> {currentMember.stripeCustomerId}</p>
                </div>

                <div className="pt-1 flex flex-wrap items-center gap-2">
                  <Link
                    to="/membership/manage"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#23a55a] hover:bg-[#1f9350] text-white font-semibold text-xs transition-colors"
                  >
                    Open Membership Portal <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <span className="text-[10px] text-[#949ba4]">
                    Dispatched copy to {currentMember.email} via Amazon SES
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Production Architecture Callout Footer */}
      <div className="bg-[#232428] px-4 py-3 border-t border-[#1f2023] flex items-center justify-between text-[11px] text-[#949ba4]">
        <div className="flex items-center gap-1.5 text-[#e0e9e0]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4B805D]" />
          <span>Production Architecture: Ephemeral response prevents public billing leaks.</span>
        </div>
        <span className="text-[10px] font-mono text-[#80848e]">Discord.js Interaction Hook</span>
      </div>
    </div>
  );
};

