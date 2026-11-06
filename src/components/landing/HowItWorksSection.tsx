import React, { useState } from 'react';
import { CreditCard, Mail, ShieldCheck, MessageSquare, CheckCircle2, ChevronRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Select Plan & Checkout',
      subtitle: 'Existing Stripe Payment Links',
      icon: CreditCard,
      summary: 'Subscriber chooses Weekly (A$37), Monthly (A$99) or Lifetime (A$1,499) through Stripe.',
      detail: 'Punt AI continues using its existing Stripe payment links and account. No new payment provider is needed, and customers pay securely via Apple Pay, Google Pay or credit card in AUD.',
      technicalBadge: 'Stripe Checkout Session • AUD Currency'
    },
    {
      num: '02',
      title: 'Transactional Email',
      subtitle: 'Keep This Email Dispatched',
      icon: Mail,
      summary: 'Amazon SES sends automated email with single-use OAuth2 connection token.',
      detail: 'The customer immediately receives a transactional confirmation containing their one-time Discord linking URL and a permanent bookmark to their Stripe billing portal login.',
      technicalBadge: 'Amazon SES • 1-Time Nonce Token'
    },
    {
      num: '03',
      title: 'Discord OAuth2 Link',
      subtitle: 'Permanent Discord User ID',
      icon: MessageSquare,
      summary: 'Customer clicks Connect Discord to securely authorize identity.',
      detail: 'The platform authenticates the member via Discord OAuth2 to record their permanent numerical Discord user ID, associating it cleanly with their Stripe customer record.',
      technicalBadge: 'Discord OAuth2 • ID Token Association'
    },
    {
      num: '04',
      title: '18+ Age Verification',
      subtitle: 'Mandatory Compliance Check',
      icon: ShieldCheck,
      summary: 'Customer confirms they are 18 or older before role assignment.',
      detail: 'To comply with Australian sports tipping and gambling age regulations, users must formally verify they are 18+. The timestamp, IP hash, and account record are permanently archived in the audit ledger.',
      technicalBadge: 'Compliance Audit Hash • Timestamp Stored'
    },
    {
      num: '05',
      title: 'Automated Role Assignment',
      subtitle: 'Punt AI Bot Assigns @Premium',
      icon: CheckCircle2,
      summary: 'Discord bot grants access to all premium tipping channels.',
      detail: 'Upon verified webhook confirmation, the custom Punt AI Bot assigns the @Premium role on your existing Discord server. Access is instantly active with a welcome ping in #premium-announcements.',
      technicalBadge: 'Discord Bot API • guilds.members.addRole'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white border-y border-[#E3E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#285B49] tracking-wider uppercase bg-[#E0E9E0] px-3 py-1 rounded-full border border-[#A1B5A3]/40">
            SEAMLESS WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17392F] tracking-tight">
            From payment to Premium access. Automatically.
          </h2>
          <p className="text-sm text-[#747E76]">
            Click any step to inspect the underlying security and automation logic.
          </p>
        </div>

        {/* Step Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl text-left transition-all border relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#17392F] text-white border-[#17392F] shadow-lg scale-[1.02]'
                    : 'bg-[#F5F6F2] hover:bg-[#EBEFE9] text-[#202923] border-[#E3E8E1]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs font-bold ${isSelected ? 'text-emerald-300' : 'text-[#285B49]'}`}>
                      {s.num}
                    </span>
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-[#747E76]'}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs tracking-tight">{s.title}</h4>
                    <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-[#A1B5A3]' : 'text-[#747E76]'}`}>
                      {s.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-[10px]">
                  <span className={isSelected ? 'text-emerald-200 font-semibold' : 'text-[#A1B5A3]'}>
                    {isSelected ? 'Active View' : 'Inspect'}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-300' : 'text-[#A1B5A3]'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Technical Explanation Panel */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F5F6F2] border border-[#E3E8E1] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-[#285B49] bg-white px-2 py-0.5 rounded border border-[#E3E8E1]">
                STEP {steps[activeStep].num}
              </span>
              <h3 className="text-xl font-bold text-[#17392F]">
                {steps[activeStep].title} — {steps[activeStep].subtitle}
              </h3>
            </div>

            <p className="text-sm font-semibold text-[#202923]">
              {steps[activeStep].summary}
            </p>

            <p className="text-xs text-[#747E76] leading-relaxed">
              {steps[activeStep].detail}
            </p>
          </div>

          <div className="md:col-span-4 p-4 rounded-xl bg-white border border-[#E3E8E1] space-y-2 text-xs">
            <span className="text-[10px] uppercase font-bold text-[#A1B5A3] tracking-wider">
              Technical Verification Standard
            </span>
            <p className="font-mono text-xs font-semibold text-[#17392F]">
              {steps[activeStep].technicalBadge}
            </p>
            <p className="text-[11px] text-[#747E76]">
              Built with idempotent webhook logic, signed tokens and automated failure retries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

