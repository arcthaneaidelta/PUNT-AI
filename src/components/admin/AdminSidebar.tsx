import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Receipt,
  BarChart3,
  Link2,
  MessageSquare,
  RefreshCw,
  ArrowRightLeft,
  Sliders,
  History,
  Settings,
  Mail,
  Zap,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface AdminSidebarProps {
  onOpenSimulator: () => void;
  mobileClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onOpenSimulator, mobileClose }) => {
  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', path: '/admin/overview', icon: LayoutDashboard }
      ]
    },
    {
      title: 'MEMBERSHIP',
      items: [
        { label: 'All Members', path: '/admin/members', icon: Users },
        { label: 'Subscriptions', path: '/admin/subscriptions', icon: CreditCard },
        { label: 'Payments (AUD)', path: '/admin/payments', icon: Receipt },
        { label: 'Analytics & Revenue', path: '/admin/analytics', icon: BarChart3 }
      ]
    },
    {
      title: 'INTEGRATIONS',
      items: [
        { label: 'Stripe Payment Links', path: '/admin/payment-links', icon: Link2 },
        { label: 'Discord Server (~2k)', path: '/admin/discord', icon: MessageSquare }
      ]
    },
    {
      title: 'OPERATIONS',
      items: [
        { label: 'Daily Reconciliation', path: '/admin/reconciliation', icon: RefreshCw },
        { label: 'Instagram Migration', path: '/admin/migration', icon: ArrowRightLeft },
        { label: 'Automation Rules', path: '/admin/automations', icon: Sliders },
        { label: 'Activity & Audit Logs', path: '/admin/activity', icon: History }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'System Settings', path: '/admin/settings', icon: Settings },
        { label: 'Email & Amazon SES', path: '/admin/settings/email', icon: Mail }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E3E8E1] flex flex-col h-full min-h-screen text-xs select-none">
      {/* Brand Header */}
      <div className="h-18 px-5 border-b border-[#E3E8E1] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#17392F] flex items-center justify-center text-white font-bold text-base shadow-xs">
            P
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-[#17392F]">
                PUNT<span className="text-[#4B805D]">·AI</span>
              </span>
              <span className="text-[10px] bg-[#E0E9E0] text-[#285B49] font-bold px-1 rounded">
                ADMIN
              </span>
            </div>
            <p className="text-[10px] text-[#747E76]">Operations Console</p>
          </div>
        </Link>
      </div>

      {/* Simulator Trigger Banner in Sidebar */}
      <div className="p-3 border-b border-[#E3E8E1] bg-[#F5F6F2]">
        <button
          onClick={onOpenSimulator}
          className="w-full py-2 px-3 rounded-lg bg-[#17392F] hover:bg-[#285B49] text-white font-semibold text-xs flex items-center justify-between shadow-xs transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-emerald-300" />
            Simulate Event
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {navSections.map((sec) => (
          <div key={sec.title} className="space-y-1">
            <h4 className="px-3 text-[10px] font-bold tracking-wider text-[#A1B5A3] uppercase">
              {sec.title}
            </h4>
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={mobileClose}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-all ${
                        isActive
                          ? 'bg-[#17392F] text-white shadow-xs font-semibold'
                          : 'text-[#202923] hover:bg-[#EBEFE9] hover:text-[#17392F]'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Status in Sidebar */}
      <div className="p-3 border-t border-[#E3E8E1] bg-[#F5F6F2] space-y-2">
        <div className="flex items-center justify-between text-[11px] text-[#747E76]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4B805D] animate-pulse" />
            Discord Bot Online
          </span>
          <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#E3E8E1]">
            v2.4.0
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-[#747E76] pt-1 border-t border-[#E3E8E1]/60">
          <Link to="/" className="text-[#285B49] hover:underline flex items-center gap-1">
            View Public Site <ExternalLink className="w-3 h-3" />
          </Link>
          <span className="text-[#A1B5A3]">Demo Mode</span>
        </div>
      </div>
    </aside>
  );
};

