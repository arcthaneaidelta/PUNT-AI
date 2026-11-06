import React from 'react';
import { Check, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { MembershipPlanType } from '../../types';

interface PricingSectionProps {
  onSelectPlan: (plan: MembershipPlanType) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#F5F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#285B49] tracking-wider uppercase bg-[#E0E9E0] px-3 py-1 rounded-full border border-[#A1B5A3]/40">
            TRANSPARENT AUD PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17392F] tracking-tight">
            Punt AI Premium Membership Plans
          </h2>
          <p className="text-sm text-[#747E76]">
            Processed directly through your existing Stripe checkout links with instant automated Discord access.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Card 1: Premium Weekly */}
          <div className="p-7 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#747E76] uppercase tracking-wider">
                  Flexible Tier
                </span>
                <h3 className="text-xl font-bold text-[#17392F] mt-1">Premium Weekly</h3>
                <p className="text-xs text-[#747E76] mt-1">
                  Flexible weekly access to Punt AI Premium sports tipping.
                </p>
              </div>

              <div className="pt-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-[#17392F] font-tabular">
                    A$37
                  </span>
                  <span className="text-xs font-semibold text-[#747E76]">/ week</span>
                </div>
                <p className="text-[11px] text-[#A1B5A3] mt-1">Billed weekly in AUD. Cancel anytime.</p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-[#E3E8E1] text-xs text-[#202923]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4B805D] shrink-0" />
                  <span>Full access to #premium-tipping channels</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4B805D] shrink-0" />
                  <span>AFL, NRL, Racing & Global Sports picks</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4B805D] shrink-0" />
                  <span>Automatic @Premium role assignment</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4B805D] shrink-0" />
                  <span>Grace period protection on renewal</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('weekly')}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-[#17392F] bg-[#EBEFE9] hover:bg-[#E0E9E0] transition-colors border border-[#E3E8E1]"
            >
              Choose Weekly (A$37)
            </button>
          </div>

          {/* Card 2: Premium Monthly (Featured) */}
          <div className="p-8 rounded-2xl bg-[#17392F] text-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden ring-2 ring-[#285B49]">
            <div className="absolute top-0 right-0 bg-[#285B49] text-emerald-200 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Featured Plan
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#A1B5A3] uppercase tracking-wider">
                  Most Popular
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">Premium Monthly</h3>
                <p className="text-xs text-[#A1B5A3] mt-1">
                  Premium membership with monthly billing and complete community access.
                </p>
              </div>

              <div className="pt-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-white font-tabular">
                    A$99
                  </span>
                  <span className="text-xs font-semibold text-[#A1B5A3]">/ month</span>
                </div>
                <p className="text-[11px] text-[#A1B5A3] mt-1">Billed monthly in AUD. 30-day billing cycle.</p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-[#E0E9E0]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>All #premium-tipping & analysis channels</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Live match-day discussion & staking guidance</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Self-service billing portal via #manage-membership</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cancellations retained until paid-through date</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct Stripe Customer Portal access</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('monthly')}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#4B805D] hover:bg-[#3d694c] text-white shadow-lg transition-all"
            >
              Choose Monthly (A$99)
            </button>
          </div>

          {/* Card 3: Lifetime Premium */}
          <div className="p-7 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#785929] uppercase tracking-wider">
                  Permanent VIP Access
                </span>
                <h3 className="text-xl font-bold text-[#17392F] mt-1">Lifetime Premium</h3>
                <p className="text-xs text-[#747E76] mt-1">
                  One single payment. Permanent lifetime Premium membership.
                </p>
              </div>

              <div className="pt-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-[#17392F] font-tabular">
                    A$1,499
                  </span>
                  <span className="text-xs font-semibold text-[#747E76]">one-time</span>
                </div>
                <p className="text-[11px] text-[#A1B5A3] mt-1">Single payment in AUD. Never charged again.</p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-[#E3E8E1] text-xs text-[#202923]">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4B805D] shrink-0" />
                  <span>Permanent lifetime @Premium role in Discord</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4B805D] shrink-0" />
                  <span>Protected flag: Exempt from recurring expiration</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4B805D] shrink-0" />
                  <span>VIP founding member community badge</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#4B805D] shrink-0" />
                  <span>All current & future sports tipping channels</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan('lifetime')}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#17392F] hover:bg-[#285B49] transition-colors shadow-xs"
            >
              Choose Lifetime (A$1,499)
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="text-center text-xs text-[#747E76] flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#4B805D]" />
          <span>Interactive demonstration: Clicking any plan simulates Stripe checkout with zero real charges.</span>
        </div>
      </div>
    </section>
  );
};

