import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { PricingSection } from '../../components/landing/PricingSection';
import { StripeCheckoutModal } from '../../components/customer/StripeCheckoutModal';
import { EventSimulatorModal } from '../../components/common/EventSimulatorModal';
import { MembershipPlanType } from '../../types';
import { ShieldCheck, HelpCircle } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const [checkoutPlan, setCheckoutPlan] = useState<MembershipPlanType | null>(null);
  const [simulatorOpen, setSimulatorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F6F2] flex flex-col antialiased">
      <Navbar onOpenSimulator={() => setSimulatorOpen(true)} />

      <div className="pt-12 pb-6 text-center max-w-2xl mx-auto px-4 space-y-3">
        <span className="text-xs font-bold text-[#285B49] tracking-wider uppercase bg-[#E0E9E0] px-3 py-1 rounded-full">
          DIRECT STRIPE PRICING
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#17392F] tracking-tight">
          Simple, Transparent AUD Pricing
        </h1>
        <p className="text-sm text-[#747E76]">
          No hidden fees. No middleman revenue cuts. Direct Discord access.
        </p>
      </div>

      <PricingSection onSelectPlan={(plan) => setCheckoutPlan(plan)} />

      {/* Pricing FAQs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-6 text-xs text-[#202923]">
        <h3 className="text-xl font-bold text-[#17392F] text-center">Frequently Asked Questions</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E3E8E1] space-y-1.5">
            <h4 className="font-bold text-sm text-[#17392F]">Are payments charged in AUD?</h4>
            <p className="text-xs text-[#747E76] leading-relaxed">
              Yes, all plans (Weekly A$37, Monthly A$99, Lifetime A$1,499) are processed natively in Australian Dollars through Stripe.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E3E8E1] space-y-1.5">
            <h4 className="font-bold text-sm text-[#17392F]">Can I cancel my weekly or monthly plan?</h4>
            <p className="text-xs text-[#747E76] leading-relaxed">
              Yes, cancel anytime via the permanent Stripe Customer Portal. You retain full Discord access until the end of your paid billing period.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E3E8E1] space-y-1.5">
            <h4 className="font-bold text-sm text-[#17392F]">What is included in the Lifetime membership?</h4>
            <p className="text-xs text-[#747E76] leading-relaxed">
              Lifetime members pay once (A$1,499) and receive permanent VIP @Premium role protection, excluded from recurring billing checks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E3E8E1] space-y-1.5">
            <h4 className="font-bold text-sm text-[#17392F]">How does age verification work?</h4>
            <p className="text-xs text-[#747E76] leading-relaxed">
              In accordance with Australian compliance guidelines, all members must verify they are 18+ before the Discord bot assigns the @Premium role.
            </p>
          </div>
        </div>
      </div>

      <Footer />

      {checkoutPlan && (
        <StripeCheckoutModal
          isOpen={!!checkoutPlan}
          onClose={() => setCheckoutPlan(null)}
          plan={checkoutPlan}
        />
      )}

      <EventSimulatorModal
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
      />
    </div>
  );
};

