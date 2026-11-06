import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { EventSimulatorModal } from '../common/EventSimulatorModal';
import { Zap } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F6F2] flex flex-col antialiased">
      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <AdminSidebar onOpenSimulator={() => setSimulatorOpen(true)} />
        </div>

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative z-10 w-64 bg-white h-full shadow-2xl">
              <AdminSidebar
                onOpenSimulator={() => {
                  setSimulatorOpen(true);
                  setMobileMenuOpen(false);
                }}
                mobileClose={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader
            onOpenSimulator={() => setSimulatorOpen(true)}
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          />

          <main className="flex-1 p-5 sm:p-8 max-w-7xl w-full mx-auto">
            <Outlet context={{ onOpenSimulator: () => setSimulatorOpen(true) }} />
          </main>
        </div>
      </div>

      {/* Floating Demo Simulator Quick Action Button (always visible on bottom-right of screen for rapid testing) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setSimulatorOpen(true)}
          className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#17392F] hover:bg-[#285B49] text-white shadow-xl hover:shadow-2xl transition-all border border-emerald-400/20 active:scale-95"
          title="Open interactive event simulator"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-emerald-300 fill-current animate-pulse" />
          </div>
          <span className="text-xs font-semibold tracking-wide">
            Simulate Event
          </span>
        </button>
      </div>

      {/* Interactive Simulator Modal */}
      <EventSimulatorModal
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
      />
    </div>
  );
};

