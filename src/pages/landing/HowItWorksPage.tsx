import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import { HowItWorksSection } from '../../components/landing/HowItWorksSection';
import { ArchitectureSection } from '../../components/landing/ArchitectureSection';
import { EventSimulatorModal } from '../../components/common/EventSimulatorModal';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const [simulatorOpen, setSimulatorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F6F2] flex flex-col antialiased">
      <Navbar onOpenSimulator={() => setSimulatorOpen(true)} />

      <div className="pt-12 pb-6 text-center max-w-2xl mx-auto px-4 space-y-3">
        <span className="text-xs font-bold text-[#285B49] tracking-wider uppercase bg-[#E0E9E0] px-3 py-1 rounded-full">
          SYSTEM ARCHITECTURE
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#17392F] tracking-tight">
          How Punt AI Automation Works
        </h1>
        <p className="text-sm text-[#747E76]">
          Step-by-step technical execution from Stripe webhook to Discord role assignment.
        </p>
      </div>

      <HowItWorksSection />
      <ArchitectureSection />

      <div className="py-12 bg-white text-center border-t border-[#E3E8E1]">
        <div className="max-w-xl mx-auto px-4 space-y-4">
          <h3 className="text-xl font-bold text-[#17392F]">Test the Full Flow in Action</h3>
          <p className="text-xs text-[#747E76]">
            Try our interactive event simulator to watch Stripe webhooks update live Discord roles in real time.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setSimulatorOpen(true)}
              className="py-2.5 px-5 rounded-xl text-xs font-bold bg-[#17392F] text-white hover:bg-[#285B49] flex items-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-300" />
              Open Event Simulator
            </button>
            <Link
              to="/admin/overview"
              className="py-2.5 px-5 rounded-xl text-xs font-semibold bg-[#EBEFE9] text-[#17392F] hover:bg-[#E0E9E0] flex items-center gap-1.5"
            >
              Admin Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />

      <EventSimulatorModal
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
      />
    </div>
  );
};

