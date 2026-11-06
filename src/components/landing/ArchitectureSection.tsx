import React from 'react';
import { Server, Database, Bot, Mail, ShieldCheck, ArrowDown, ArrowRight, Code } from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#285B49] tracking-wider uppercase bg-[#E0E9E0] px-3 py-1 rounded-full border border-[#A1B5A3]/40">
            INDEPENDENCE & CONTROL
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17392F] tracking-tight">
            Simple infrastructure. Complete ownership.
          </h2>
          <p className="text-base text-[#747E76] leading-relaxed">
            Eliminate middleman platforms taking 3–10% of your recurring turnover.
            Run a lightweight, dedicated membership stack that you own completely.
          </p>
        </div>

        {/* Architecture Visual Diagram */}
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-base font-bold text-[#17392F]">Proposed Production Architecture</h3>
            <p className="text-xs text-[#747E76] mt-1">
              Decoupled, event-driven design connecting Stripe webhooks to Discord with daily reconciliation.
            </p>
          </div>

          {/* Diagram Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {/* Box 1: Stripe */}
            <div className="p-5 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] text-center space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#17392F] text-white flex items-center justify-center font-bold text-sm mx-auto">
                S
              </div>
              <h4 className="font-bold text-xs text-[#202923]">Existing Stripe</h4>
              <p className="text-[11px] text-[#747E76]">Weekly A$37 • Monthly A$99 • Lifetime A$1,499</p>
            </div>

            <div className="hidden md:flex justify-center text-[#A1B5A3]">
              <ArrowRight className="w-5 h-5" />
            </div>

            {/* Box 2: Membership Engine & Database */}
            <div className="p-5 rounded-xl bg-[#17392F] text-white text-center space-y-2 shadow-md">
              <div className="w-10 h-10 rounded-lg bg-[#285B49] text-white flex items-center justify-center text-sm mx-auto">
                <Server className="w-5 h-5 text-emerald-300" />
              </div>
              <h4 className="font-bold text-xs text-white">Membership Engine</h4>
              <p className="text-[11px] text-[#A1B5A3]">Node.js + PostgreSQL + Dynamic Price Registry</p>
            </div>

            <div className="hidden md:flex justify-center text-[#A1B5A3]">
              <ArrowRight className="w-5 h-5" />
            </div>

            {/* Box 3: Custom Discord Bot */}
            <div className="p-5 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] text-center space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#5865F2] text-white flex items-center justify-center text-sm mx-auto">
                <Bot className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs text-[#202923]">Custom Discord Bot</h4>
              <p className="text-[11px] text-[#747E76]">Instant @Premium Role Sync on Existing 2k Guild</p>
            </div>
          </div>

          {/* Supporting Microservices Strip */}
          <div className="pt-6 border-t border-[#E3E8E1] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#EBEFE9] border border-[#E3E8E1] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#17392F]">
                <Mail className="w-4 h-4 text-[#285B49]" />
                <span>Amazon SES Transactional</span>
              </div>
              <p className="text-[11px] text-[#747E76]">
                Pennies per thousand emails for receipts, claim links, and login emails. No expensive providers.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EBEFE9] border border-[#E3E8E1] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#17392F]">
                <Database className="w-4 h-4 text-[#285B49]" />
                <span>Daily Reconciliation Worker</span>
              </div>
              <p className="text-[11px] text-[#747E76]">
                Automated background job guarantees zero discrepancies between Stripe payers and Discord role holders.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EBEFE9] border border-[#E3E8E1] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#17392F]">
                <Code className="w-4 h-4 text-[#285B49]" />
                <span>100% Client-Owned Source</span>
              </div>
              <p className="text-[11px] text-[#747E76]">
                Host on your own low-cost VPS ($10–20/month total infrastructure). No revenue-cut platforms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

