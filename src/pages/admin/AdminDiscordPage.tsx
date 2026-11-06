import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import { DiscordManageChannelPreview } from '../../components/admin/DiscordManageChannelPreview';
import {
  MessageSquare,
  Bot,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Hash,
  Users,
  Lock,
  ExternalLink,
  Zap
} from 'lucide-react';

export const AdminDiscordPage: React.FC = () => {
  const { members } = useDemoStore();
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const activePremiumCount = members.filter(
    (m) => (m.membershipStatus === 'active' || m.membershipStatus === 'cancellation_scheduled') && m.roleStatus === 'active'
  ).length;

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setTestResult(null);
    await new Promise((r) => setTimeout(r, 700));
    setTestingConnection(false);
    setTestResult('Success! Discord Gateway v10 connected. Latency: 42ms. Guild ID verified.');
    setTimeout(() => setTestResult(null), 4000);
  };

  const channelCategories = [
    {
      category: 'GENERAL',
      channels: ['welcome', 'announcements', 'community-rules', 'introductions']
    },
    {
      category: 'FREE COMMUNITY',
      channels: ['general-chat', 'sports-discussion', 'match-day-chat']
    },
    {
      category: 'PREMIUM CHANNELS (Role Locked)',
      locked: true,
      channels: [
        'premium-announcements',
        'premium-tipping',
        'premium-picks',
        'premium-discussion',
        'premium-results'
      ]
    },
    {
      category: 'MEMBERSHIP & BILLING',
      channels: ['manage-membership', 'membership-support']
    },
    {
      category: 'STAFF & LOGS',
      channels: ['staff-chat', 'moderation-logs', 'bot-audit-logs']
    }
  ];

  return (
    <div className="space-y-6 text-xs text-[#202923]">
      {/* Top Integration Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#5865F2] bg-[#5865F2]/10 px-2.5 py-0.5 rounded-full">
              DISCORD BOT INTEGRATION
            </span>
            <span className="text-xs text-[#747E76]">• Live Guild Gateway</span>
          </div>
          <h2 className="text-xl font-bold text-[#17392F] mt-1">Discord Server Control Centre</h2>
          <p className="text-xs text-[#747E76] mt-0.5">
            Managing the existing 2,000-member Punt AI server with dedicated role automation.
          </p>
        </div>

        <button
          onClick={handleTestConnection}
          disabled={testingConnection}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#5865F2] hover:bg-[#4752c4] text-white flex items-center gap-2 shadow-xs transition-colors shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${testingConnection ? 'animate-spin' : ''}`} />
          {testingConnection ? 'Testing Gateway...' : 'Test Discord Connection'}
        </button>
      </div>

      {testResult && (
        <div className="p-3.5 rounded-xl bg-[#E0E9E0] border border-[#A1B5A3]/50 text-xs text-[#17392F] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#4B805D]" />
          <span>{testResult}</span>
        </div>
      )}

      {/* Guild KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#747E76] uppercase">Guild Name</span>
          <p className="text-base font-bold text-[#17392F]">Punt AI Sports Tipping</p>
          <p className="text-[10px] font-mono text-[#747E76]">ID: 981029384910293847</p>
        </div>

        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#747E76] uppercase">Total Members</span>
          <p className="text-2xl font-extrabold text-[#17392F] font-tabular">~2,000</p>
          <p className="text-[10px] text-[#747E76]">Existing server baseline</p>
        </div>

        <div className="p-4.5 rounded-2xl bg-[#17392F] text-white shadow-md space-y-1">
          <span className="text-[10px] font-bold text-emerald-300 uppercase">@Premium Role Holders</span>
          <p className="text-2xl font-extrabold text-white font-tabular">{activePremiumCount || 486}</p>
          <p className="text-[10px] text-[#A1B5A3]">Role ID: role_9810293841</p>
        </div>

        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#747E76] uppercase">Bot Status</span>
          <p className="text-base font-bold text-[#4B805D] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4B805D] animate-pulse" /> Connected
          </p>
          <p className="text-[10px] text-[#747E76]">WebSocket Gateway v10</p>
        </div>
      </div>

      {/* Specific Client Requirement: Interactive #manage-membership Preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#17392F] flex items-center gap-2">
              <span className="text-[#5865F2] font-mono">#</span>
              #manage-membership Discord Channel Simulation
            </h3>
            <p className="text-xs text-[#747E76]">
              Client requirement: Members click the pinned button to privately generate their billing link.
            </p>
          </div>
          <span className="text-[11px] font-bold text-[#4B805D] bg-[#E0E9E0] px-2 py-0.5 rounded">
            Interactive Test Available
          </span>
        </div>

        <DiscordManageChannelPreview />
      </div>

      {/* Proposed Server Architecture Tree */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E1]">
          <div>
            <h3 className="text-base font-bold text-[#17392F]">Proposed Server Layout & Role Gates</h3>
            <p className="text-xs text-[#747E76]">
              Structured channels isolating free community discussion from paid sports tipping.
            </p>
          </div>
          <span className="text-[11px] text-[#747E76]">Subject to client approval</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {channelCategories.map((cat) => (
            <div
              key={cat.category}
              className={`p-4 rounded-xl border space-y-2 ${
                cat.locked
                  ? 'bg-[#17392F] text-white border-[#17392F]'
                  : 'bg-[#F5F6F2] border-[#E3E8E1] text-[#202923]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold tracking-wider uppercase ${cat.locked ? 'text-emerald-300' : 'text-[#747E76]'}`}>
                  {cat.category}
                </span>
                {cat.locked && <Lock className="w-3.5 h-3.5 text-emerald-300" />}
              </div>

              <div className="space-y-1">
                {cat.channels.map((ch) => (
                  <div
                    key={ch}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono ${
                      cat.locked ? 'bg-white/10 text-white' : 'bg-white text-[#202923] border border-[#E3E8E1]/60'
                    }`}
                  >
                    <span className={cat.locked ? 'text-emerald-300' : 'text-[#747E76]'}>#</span>
                    <span>{ch}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

