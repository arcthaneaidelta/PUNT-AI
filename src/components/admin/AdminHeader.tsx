import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import {
  Menu,
  Zap,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Bell
} from 'lucide-react';

interface AdminHeaderProps {
  onOpenSimulator: () => void;
  onToggleMobileMenu: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onOpenSimulator, onToggleMobileMenu }) => {
  const location = useLocation();
  const { resetDemoData, members, reconciliationIssues } = useDemoStore();
  const [resetDone, setResetDone] = useState(false);

  const getPageTitle = (path: string) => {
    switch (path) {
      case '/admin/overview': return { title: 'Membership Overview', subtitle: 'Real-time performance across your 2,000-member community' };
      case '/admin/members': return { title: 'Members Directory', subtitle: 'Stripe customers mapped to Discord accounts and role status' };
      case '/admin/subscriptions': return { title: 'Subscription Lifecycle', subtitle: 'Active, scheduled cancellations and grace period expirations' };
      case '/admin/payments': return { title: 'Payment Ledger (AUD)', subtitle: 'Weekly A$37, Monthly A$99 and Lifetime A$1,499 transactions' };
      case '/admin/analytics': return { title: 'Financial Analytics & MRR', subtitle: 'Audited Australian Dollar revenue reporting and churn trends' };
      case '/admin/payment-links': return { title: 'Stripe Payment Links', subtitle: 'Dynamic product registry without source code modification' };
      case '/admin/discord': return { title: 'Discord Server Management', subtitle: 'Server structure, #manage-membership and bot status' };
      case '/admin/reconciliation': return { title: 'Daily Stripe-Discord Reconciliation', subtitle: 'Automated discrepancy detection and idempotent role correction' };
      case '/admin/migration': return { title: 'Instagram Member Migration', subtitle: 'Move existing private Instagram tipping members without re-charging' };
      case '/admin/automations': return { title: 'Event Automation Engine', subtitle: '8 active rules connecting Stripe webhooks to Discord roles' };
      case '/admin/activity': return { title: 'Activity & Audit Log', subtitle: 'Chronological timeline of webhooks, bot actions and overrides' };
      case '/admin/settings': return { title: 'Platform & Infrastructure Settings', subtitle: 'Configuration for Stripe, Discord bot, PostgreSQL and security' };
      case '/admin/settings/email': return { title: 'Email & Amazon SES', subtitle: 'Low-cost transactional email templates and delivery logs' };
      default: return { title: 'Admin Workspace', subtitle: 'Punt AI Membership Infrastructure' };
    }
  };

  const { title, subtitle } = getPageTitle(location.pathname);
  const pendingMismatches = reconciliationIssues.filter((i) => !i.resolved).length;

  const handleReset = () => {
    resetDemoData();
    setResetDone(true);
    setTimeout(() => setResetDone(false), 2000);
  };

  return (
    <header className="h-18 bg-white border-b border-[#E3E8E1] px-5 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile button + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-[#202923] hover:bg-[#F5F6F2]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-[#17392F] leading-tight">
            {title}
          </h1>
          <p className="text-[11px] text-[#747E76] hidden sm:block">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Discrepancy indicator pill */}
        {pendingMismatches > 0 && (
          <Link
            to="/admin/reconciliation"
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FDF3E3] text-[#B68B4D] border border-[#B68B4D]/30 hover:bg-[#faebd4] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B68B4D] animate-ping" />
            {pendingMismatches} Reconciliation {pendingMismatches === 1 ? 'Issue' : 'Issues'}
          </Link>
        )}

        {/* Reset State Button */}
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#747E76] hover:text-[#B75F58] hover:bg-[#F9ECEB] transition-colors"
          title="Reset simulated data to default"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{resetDone ? 'Reset!' : 'Reset Demo'}</span>
        </button>

        {/* Floating Event Simulator Trigger */}
        <button
          onClick={onOpenSimulator}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#17392F] hover:bg-[#285B49] text-white transition-all shadow-xs"
        >
          <Zap className="w-3.5 h-3.5 text-emerald-300" />
          <span className="hidden sm:inline">Event Simulator</span>
        </button>

        {/* Admin User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#E3E8E1]">
          <div className="w-8 h-8 rounded-full bg-[#285B49] text-white flex items-center justify-center font-bold text-xs">
            JA
          </div>
          <div className="hidden lg:block text-left text-xs leading-none">
            <p className="font-semibold text-[#202923]">Jack</p>
            <p className="text-[10px] text-[#747E76]">Punt AI Lead</p>
          </div>
        </div>
      </div>
    </header>
  );
};

