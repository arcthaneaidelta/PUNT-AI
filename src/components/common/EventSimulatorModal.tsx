import React, { useState } from 'react';
import { useDemoStore, SimulationResult } from '../../store/demoStore';
import {
  Zap,
  X,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Server,
  Bot,
  CreditCard,
  Mail,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface EventSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EventSimulatorModal: React.FC<EventSimulatorModalProps> = ({ isOpen, onClose }) => {
  const { members, simulateEvent, manualRoleOverride, resetDemoData } = useDemoStore();
  const [selectedMemberId, setSelectedMemberId] = useState<string>(members[0]?.id || 'mem_01');
  const [selectedEvent, setSelectedEvent] = useState<string>('monthly_payment');
  const [isRunning, setIsRunning] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Manual override reason state
  const [overrideReason, setOverrideReason] = useState('Customer support resolution');

  if (!isOpen) return null;

  const currentMember = members.find((m) => m.id === selectedMemberId) || members[0];

  const handleRunSimulation = async () => {
    setIsRunning(true);
    setSimulationResult(null);

    // Simulate animated processing delay
    await new Promise((r) => setTimeout(r, 600));

    if (selectedEvent === 'manual_grant') {
      manualRoleOverride(selectedMemberId, true, overrideReason);
      setSimulationResult({
        title: 'Manual Role Granted Override',
        stripeEvent: 'admin.override.role_grant',
        member: currentMember.name,
        plan: currentMember.membershipType,
        previousStatus: currentMember.membershipStatus,
        newStatus: currentMember.membershipStatus,
        discordAction: '@Premium role assigned directly by Admin override',
        result: 'warning',
        steps: [
          { step: 1, title: 'Admin Action Authenticated', description: 'Jack (Admin) authorized manual role override with reason', status: 'completed', system: 'membership_engine' },
          { step: 2, title: 'Discord Bot API Call', description: `Assigned @Premium role to Discord ID ${currentMember.discordId}`, status: 'completed', system: 'discord' },
          { step: 3, title: 'Audit Trail Recorded', description: 'Stripe subscription state left unmodified (safe decoupled action)', status: 'completed', system: 'membership_engine' }
        ]
      });
      setIsRunning(false);
      return;
    }

    if (selectedEvent === 'manual_revoke') {
      manualRoleOverride(selectedMemberId, false, overrideReason);
      setSimulationResult({
        title: 'Manual Role Revocation Override',
        stripeEvent: 'admin.override.role_revoke',
        member: currentMember.name,
        plan: currentMember.membershipType,
        previousStatus: currentMember.membershipStatus,
        newStatus: currentMember.membershipStatus,
        discordAction: '@Premium role revoked directly by Admin override',
        result: 'warning',
        steps: [
          { step: 1, title: 'Admin Action Authenticated', description: 'Jack (Admin) authorized manual role revocation', status: 'completed', system: 'membership_engine' },
          { step: 2, title: 'Discord Bot API Call', description: `Removed @Premium role from Discord ID ${currentMember.discordId}`, status: 'completed', system: 'discord' },
          { step: 3, title: 'Audit Trail Recorded', description: 'Override logged in administrative audit ledger', status: 'completed', system: 'membership_engine' }
        ]
      });
      setIsRunning(false);
      return;
    }

    try {
      const res = await simulateEvent(selectedMemberId, selectedEvent);
      setSimulationResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    resetDemoData();
    setResetSuccess(true);
    setSimulationResult(null);
    setTimeout(() => setResetSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E3E8E1] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Top Header */}
        <div className="bg-[#17392F] px-6 py-4.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#285B49] flex items-center justify-center text-white">
              <Zap className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">Interactive Event Simulator</h3>
              <p className="text-xs text-[#A1B5A3]">
                Simulate real Stripe & Discord webhook lifecycle events with live state updates
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A1B5A3] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Member Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1.5">
                Select Member to Simulate
              </label>
              <select
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] bg-[#F5F6F2] font-medium text-[#202923] focus:outline-none focus:border-[#285B49]"
              >
                {members.slice(0, 18).map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.membershipType.toUpperCase()} • Status: {m.membershipStatus} • Role:{' '}
                    {m.roleStatus})
                  </option>
                ))}
              </select>
            </div>

            {/* Event Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1.5">
                Select Lifecycle Event
              </label>
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] bg-[#F5F6F2] font-medium text-[#202923] focus:outline-none focus:border-[#285B49]"
              >
                <optgroup label="Payments & Activation">
                  <option value="weekly_payment">Successful Weekly Payment (A$37.00)</option>
                  <option value="monthly_payment">Successful Monthly Payment (A$99.00)</option>
                  <option value="lifetime_purchase">Lifetime Membership Purchase (A$1,499.00)</option>
                  <option value="subscription_renewal">Subscription Renewal (invoice.paid)</option>
                </optgroup>
                <optgroup label="Cancellations & Expirations">
                  <option value="cancellation_requested">Cancellation Requested (Period End Grace)</option>
                  <option value="subscription_expired">Subscription Expired (Role Revoked)</option>
                </optgroup>
                <optgroup label="Refunds & Disputes">
                  <option value="full_refund">Full Refund (Immediate Revocation)</option>
                  <option value="partial_refund">Partial Refund (Retain Role / Flagged)</option>
                  <option value="chargeback">Chargeback / Dispute (Immediate Revocation)</option>
                </optgroup>
                <optgroup label="Payment Failures & Grace">
                  <option value="temp_payment_failure">Temporary Failed Payment (3-Day Grace)</option>
                  <option value="final_payment_failure">Final Payment Failure (Role Revoked)</option>
                </optgroup>
                <optgroup label="Administrative Overrides">
                  <option value="manual_grant">Manual Role Grant Override</option>
                  <option value="manual_revoke">Manual Role Revocation Override</option>
                </optgroup>
              </select>
            </div>
          </div>

          {/* Current Member Status Card */}
          {currentMember && (
            <div className="p-3.5 rounded-xl bg-[#EBEFE9] border border-[#E3E8E1] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[#747E76]">Target Member:</span>{' '}
                <strong className="text-[#202923]">{currentMember.name}</strong>{' '}
                <span className="text-[#747E76]">({currentMember.email})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white border border-[#E3E8E1]">
                  Plan: {currentMember.membershipType.toUpperCase()} (A${currentMember.amount})
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                  currentMember.roleStatus === 'active'
                    ? 'bg-[#E0E9E0] text-[#285B49]'
                    : 'bg-[#F9ECEB] text-[#B75F58]'
                }`}>
                  Discord Role: {currentMember.roleStatus.toUpperCase()}
                </span>
                {currentMember.lifetime && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EAE2D6] text-[#785929]">
                    LIFETIME PROTECTED
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Manual override reason if selected */}
          {(selectedEvent === 'manual_grant' || selectedEvent === 'manual_revoke') && (
            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Override Reason (Mandatory Audit Requirement)
              </label>
              <input
                type="text"
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#E3E8E1] bg-white text-[#202923]"
                placeholder="Reason for manual override"
              />
            </div>
          )}

          {/* Action Trigger Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#747E76] hover:text-[#B75F58] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {resetSuccess ? 'Demo Data Reset!' : 'Reset Demo State'}
            </button>

            <button
              onClick={handleRunSimulation}
              disabled={isRunning}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#17392F] hover:bg-[#285B49] text-white transition-all shadow-md disabled:opacity-50"
            >
              {isRunning ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing Webhook & Role...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Run Live Simulation
                </>
              )}
            </button>
          </div>

          {/* Simulation Result Presentation */}
          {simulationResult && (
            <div className="mt-4 p-4.5 rounded-xl border border-[#A1B5A3]/40 bg-[#F5F6F2] space-y-3.5 animate-in fade-in duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${
                      simulationResult.result === 'error'
                        ? 'text-[#B75F58]'
                        : simulationResult.result === 'warning'
                        ? 'text-[#B68B4D]'
                        : 'text-[#4B805D]'
                    }`} />
                    <h4 className="text-sm font-bold text-[#17392F]">
                      {simulationResult.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#747E76] mt-0.5">
                    Stripe Event: <code className="bg-white px-1.5 py-0.5 rounded border border-[#E3E8E1] text-[#202923]">{simulationResult.stripeEvent}</code>
                  </p>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white text-[#285B49] border border-[#E3E8E1]">
                  State Synchronised
                </span>
              </div>

              {/* Multi-step pipeline animation */}
              <div className="space-y-2 border-t border-[#E3E8E1] pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#747E76]">
                  Processing Pipeline Stages
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {simulationResult.steps.map((s) => (
                    <div key={s.step} className="p-2.5 rounded-lg bg-white border border-[#E3E8E1] flex items-start gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#E0E9E0] text-[#285B49] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {s.step}
                      </div>
                      <div>
                        <p className="font-semibold text-[#202923] text-[11px]">{s.title}</p>
                        <p className="text-[10px] text-[#747E76] leading-tight">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* State Comparison Card */}
              <div className="p-3 rounded-lg bg-white border border-[#E3E8E1] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#747E76] text-[11px]">Discord Bot Action:</span>
                  <p className="font-semibold text-[#17392F]">{simulationResult.discordAction}</p>
                </div>
                <div className="text-right">
                  <span className="text-[#747E76] text-[11px]">Final Status:</span>
                  <p className="font-bold text-[#202923] capitalize">{simulationResult.newStatus.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

