import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { HeroSection } from '../../components/landing/HeroSection';
import { TrustStrip } from '../../components/landing/TrustStrip';
import { CommunitySection } from '../../components/landing/CommunitySection';
import { HowItWorksSection } from '../../components/landing/HowItWorksSection';
import { PricingSection } from '../../components/landing/PricingSection';
import { LifecycleSection } from '../../components/landing/LifecycleSection';
import { ArchitectureSection } from '../../components/landing/ArchitectureSection';
import { StripeCheckoutModal } from '../../components/customer/StripeCheckoutModal';
import { EventSimulatorModal } from '../../components/common/EventSimulatorModal';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { MembershipPlanType } from '../../types';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const [checkoutPlan, setCheckoutPlan] = useState<MembershipPlanType | null>(null);
  const [simulatorOpen, setSimulatorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F6F2] flex flex-col antialiased">
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Navigation */}
      <Navbar onOpenSimulator={() => setSimulatorOpen(true)} />

      {/* Hero */}
      <HeroSection
        onOpenCheckout={(plan) => setCheckoutPlan(plan)}
        onOpenSimulator={() => setSimulatorOpen(true)}
      />

      {/* Trust & Performance Strip */}
      <TrustStrip />

      {/* Problem & Before/After Community Section */}
      <CommunitySection />

      {/* 5-Step Workflow */}
      <HowItWorksSection />

      {/* Real Pricing Section */}
      <PricingSection onSelectPlan={(plan) => setCheckoutPlan(plan)} />

      {/* 6 Event Lifecycle Scenarios */}
      <LifecycleSection />

      {/* Proposed Architecture Section */}
      <ArchitectureSection />

      {/* Final Call to Action Section */}
      <section className="py-20 bg-[#17392F] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10">
            TOTAL MEMBERSHIP AUTOMATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            A better membership experience starts here.
          </h2>
          <p className="text-base sm:text-lg text-[#A1B5A3] max-w-xl mx-auto leading-relaxed">
            Bring your Stripe payments, Discord community, and membership operations together into one self-managed platform.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#pricing"
              className="py-3 px-6 rounded-xl text-sm font-bold bg-white text-[#17392F] hover:bg-[#EBEFE9] transition-all shadow-md active:scale-98"
            >
              Explore Membership Plans
            </a>
            <Link
              to="/admin/overview"
              className="py-3 px-6 rounded-xl text-sm font-bold bg-[#285B49] text-white hover:bg-[#34755e] transition-all shadow-md flex items-center gap-2"
            >
              Explore Interactive Admin Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer with Simulated Contact Form */}
      <Footer />

      {/* Stripe Checkout Modal */}
      {checkoutPlan && (
        <StripeCheckoutModal
          isOpen={!!checkoutPlan}
          onClose={() => setCheckoutPlan(null)}
          plan={checkoutPlan}
        />
      )}

      {/* Simulator Modal */}
      <EventSimulatorModal
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
      />
    </div>
  );
};

