import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, MessageSquare, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenCheckout: (plan: 'weekly' | 'monthly' | 'lifetime') => void;
  onOpenSimulator: () => void;
}

const LIVE_EVENTS = [
  'Premium access granted • jordanmitch_au',
  'Discord role synchronised • AFL Round 24',
  'Weekly subscription renewed • lachlan_punts',
  'New 18+ age confirmation recorded • AEST',
  'Lifetime VIP protected • vance_tipper'
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCheckout, onOpenSimulator }) => {
  const [eventIndex, setEventIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setEventIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Cinematic Sports Stadium Atmosphere Background */}
      <div className="absolute inset-0 -z-10 bg-radial from-[#17392F]/8 via-[#F5F6F2] to-[#F5F6F2] pointer-events-none" />
      <div className="absolute top-0 right-0 w-full max-w-4xl h-[650px] -z-10 bg-gradient-to-bl from-[#E0E9E0]/50 via-transparent to-transparent blur-3xl pointer-events-none" />
      
      {/* Subtle stadium field geometric pattern */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#17392F 1px, transparent 1px), linear-gradient(to right, #17392F 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0E9E0] border border-[#A1B5A3]/50 text-[#17392F] text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#4B805D] animate-ping" />
              PUNT AI PREMIUM MEMBERSHIP INFRASTRUCTURE
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#17392F] tracking-tight leading-[1.08]">
              Better tipping.<br />
              Better community.<br />
              <span className="text-[#285B49] underline decoration-[#A1B5A3]/50 decoration-wavy decoration-2">
                Premium access.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#747E76] leading-relaxed max-w-xl">
              Connect your existing Stripe checkout to your 2,000-member Discord community.
              Automate Premium role assignment, renewals, cancellations and refunds with 100% source code ownership.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#17392F] text-white hover:bg-[#285B49] transition-all shadow-md active:scale-98"
              >
                Explore Premium Membership
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/admin/overview"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-white text-[#17392F] hover:bg-[#EBEFE9] border border-[#E3E8E1] transition-all shadow-xs"
              >
                Explore Admin Console
              </Link>

              <button
                type="button"
                onClick={onOpenSimulator}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold bg-[#E0E9E0] text-[#285B49] hover:bg-[#d2e4d2] border border-[#A1B5A3]/40 transition-colors"
              >
                <Zap className="w-3.5 h-3.5" />
                Simulate Stripe Event
              </button>
            </div>

            {/* Trust Reassurance Badges */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#E3E8E1]/80 text-xs">
              <div className="flex items-center gap-2 text-[#202923]">
                <ShieldCheck className="w-4 h-4 text-[#4B805D] shrink-0" />
                <span>Existing Stripe Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-[#202923]">
                <MessageSquare className="w-4 h-4 text-[#5865F2] shrink-0" />
                <span>Existing 2,000-Member Discord</span>
              </div>
              <div className="flex items-center gap-2 text-[#202923]">
                <CheckCircle2 className="w-4 h-4 text-[#4B805D] shrink-0" />
                <span>Zero Whop Fees • 100% Margin</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Interactive Discord & Membership Product Preview */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Backing decorative glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-[#285B49]/20 to-[#A1B5A3]/20 blur-xl opacity-75" />

              {/* Main Product Preview Card */}
              <div className="relative rounded-2xl bg-white border border-[#E3E8E1] shadow-2xl overflow-hidden text-xs">
                {/* Window Bar */}
                <div className="bg-[#17392F] px-4 py-3 text-white flex items-center justify-between border-b border-[#112C25]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    <span className="font-bold tracking-wide text-xs">PUNT AI PREMIUM ECOSYSTEM</span>
                  </div>
                  <span className="text-[10px] bg-[#285B49] px-2 py-0.5 rounded text-emerald-200 font-mono font-medium">
                    LIVE PREVIEW
                  </span>
                </div>

                <div className="p-5 space-y-4">
                  {/* Member Profile Snapshot */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#17392F] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                        JM
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-[#17392F] text-sm">Jordan Mitchell</h4>
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#E0E9E0] text-[#285B49]">
                            @Premium
                          </span>
                        </div>
                        <p className="text-[11px] text-[#747E76]">jordanmitch_au • Linked Discord ID: 84920491...</p>
                      </div>
                    </div>
                    <span className="text-right">
                      <span className="font-bold text-xs text-[#202923] font-tabular">A$99 / mo</span>
                      <p className="text-[10px] text-[#4B805D] font-semibold">Active Member</p>
                    </span>
                  </div>

                  {/* Channel Feed Simulation */}
                  <div className="rounded-xl border border-[#E3E8E1] bg-[#313338] text-white p-3.5 space-y-3 font-sans">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px]">
                      <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                        <span>#</span>
                        <span>premium-tipping</span>
                      </div>
                      <span className="text-[10px] text-gray-400">Punt AI Bot • 9:45 AM</span>
                    </div>

                    <div className="bg-[#2b2d31] p-3 rounded-lg border-l-4 border-[#285B49] space-y-1.5">
                      <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                        🏇 Flemington Race 7 — Weekend Value Pick
                      </p>
                      <p className="text-gray-200 text-xs leading-relaxed">
                        <strong>Horse:</strong> #4 Starlight Express (Current $6.50 / $2.30)<br />
                        <strong>Staking:</strong> 1.5 units WIN • High confidence on Good 4 track conditions.
                      </p>
                    </div>
                  </div>

                  {/* Real-time Webhook Activity Ticker */}
                  <div className="p-3 rounded-xl bg-[#EBEFE9] border border-[#E3E8E1] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-[#285B49] animate-bounce" />
                      <span className="font-mono text-[11px] text-[#17392F] font-semibold">
                        {LIVE_EVENTS[eventIndex]}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#4B805D] uppercase">
                      Synchronised
                    </span>
                  </div>

                  {/* Interactive CTA to test flow */}
                  <div className="pt-1 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenCheckout('monthly')}
                      className="w-full py-2 px-3 text-center rounded-lg text-xs font-semibold bg-[#17392F] text-white hover:bg-[#285B49] transition-colors"
                    >
                      Test Checkout (A$99)
                    </button>
                    <Link
                      to="/connect-discord"
                      className="w-full py-2 px-3 text-center rounded-lg text-xs font-semibold bg-white border border-[#E3E8E1] text-[#202923] hover:bg-[#F5F6F2] transition-colors"
                    >
                      Test Discord Link
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

