import React from 'react';
import { XCircle, CheckCircle2, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from '../common/InstagramIcon';
import { Link } from 'react-router-dom';

export const CommunitySection: React.FC = () => {
  return (
    <section id="platform" className="py-20 lg:py-28 bg-[#F5F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#285B49] tracking-wider uppercase bg-[#E0E9E0] px-3 py-1 rounded-full border border-[#A1B5A3]/40">
            STRATEGIC EVOLUTION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17392F] tracking-tight">
            Managing memberships shouldn't become another full-time job.
          </h2>
          <p className="text-base text-[#747E76] leading-relaxed">
            Transition your paying sports tipping subscribers from a manual private Instagram group into your established 2,000-member Discord server — with completely hands-free automation.
          </p>
        </div>

        {/* Before and After Visual Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* CURRENT: Private Instagram Manual Group */}
          <div className="p-8 rounded-2xl bg-white border border-[#B75F58]/20 shadow-xs flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#B75F58]" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#B75F58] font-bold text-sm">
                  <InstagramIcon className="w-5 h-5" />
                  <span>CURRENT: Private Instagram Group</span>
                </div>
                <span className="text-[10px] font-semibold bg-[#F9ECEB] text-[#B75F58] px-2.5 py-0.5 rounded-full">
                  High Admin Overhead
                </span>
              </div>

              <p className="text-xs text-[#747E76] leading-relaxed">
                Manually checking Stripe dashboard records, cross-referencing Instagram handles, and sending individual direct messages to verify access.
              </p>

              <ul className="space-y-3 pt-2 text-xs text-[#202923]">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-[#B75F58] shrink-0 mt-0.5" />
                  <span>Manually adding members to private close friends / group chats.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-[#B75F58] shrink-0 mt-0.5" />
                  <span>Hours spent cross-referencing failed payments in spreadsheets.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-[#B75F58] shrink-0 mt-0.5" />
                  <span>Members removed instantly when asking to cancel, losing paid days.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-[#B75F58] shrink-0 mt-0.5" />
                  <span>Refunded or chargeback users frequently forgotten in the group.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-[#B75F58] shrink-0 mt-0.5" />
                  <span>No automated way to migrate paying users without charging them again.</span>
                </li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F9ECEB]/50 border border-[#B75F58]/20 text-[11px] text-[#B75F58] font-medium">
              ⚠️ Result: Lost revenue, member churn, and endless manual administrative work.
            </div>
          </div>

          {/* PROPOSED: Automated Discord Premium Membership */}
          <div className="p-8 rounded-2xl bg-[#17392F] text-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#4B805D]" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <MessageSquare className="w-5 h-5" />
                  <span>PROPOSED: Punt AI Discord Automation</span>
                </div>
                <span className="text-[10px] font-semibold bg-[#285B49] text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                  Fully Hands-Free
                </span>
              </div>

              <p className="text-xs text-[#A1B5A3] leading-relaxed">
                Connect your existing Stripe payment links directly to your existing 2,000-member Discord server with a custom bot.
              </p>

              <ul className="space-y-3 pt-2 text-xs text-[#E0E9E0]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Automatic @Premium role assignment</strong> within 2 seconds of payment.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Cancellations honored to period end</strong> — members retain paid access.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Instant role revocation</strong> on full refunds and bank chargebacks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Daily automated reconciliation</strong> matching Stripe against Discord.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Seamless Instagram migration</strong> with personal claim tokens (no double charges).</span>
                </li>
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between">
              <span className="text-xs text-emerald-200 font-semibold">
                Ready to migrate existing VIPs?
              </span>
              <Link
                to="/migration/claim"
                className="text-xs font-bold text-white hover:text-emerald-300 inline-flex items-center gap-1"
              >
                View Migration Wizard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
