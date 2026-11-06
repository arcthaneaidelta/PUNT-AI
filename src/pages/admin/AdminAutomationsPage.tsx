import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import {
  Sliders,
  Zap,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  Clock,
  ShieldCheck,
  ChevronDown,
  Info
} from 'lucide-react';

export const AdminAutomationsPage: React.FC = () => {
  const { automations, toggleAutomationRule, addActivity } = useDemoStore();
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  const handleToggle = (id: string, name: string, currentEnabled: boolean) => {
    toggleAutomationRule(id);
    addActivity({
      category: 'admin',
      title: `Automation Rule ${!currentEnabled ? 'Enabled' : 'Paused'}`,
      description: `Administrator toggled ${name} to ${!currentEnabled ? 'Operational' : 'Paused'}.`,
      result: !currentEnabled ? 'success' : 'warning',
      referenceId: id
    });
  };

  return (
    <div className="space-y-6 text-xs text-[#202923]">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#285B49] bg-[#E0E9E0] px-2.5 py-0.5 rounded-full">
              EVENT AUTOMATION ENGINE
            </span>
            <span className="text-xs text-[#747E76]">• 8 Configured Rules</span>
          </div>
          <h2 className="text-xl font-bold text-[#17392F] mt-1">
            Membership Event Automation Rules
          </h2>
          <p className="text-xs text-[#747E76] mt-0.5">
            Idempotent event-driven triggers mapping Stripe webhooks to Discord role operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E0E9E0] text-[#285B49] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4B805D] animate-pulse" />
            Webhook Ingestion Operational
          </span>
        </div>
      </div>

      {/* 8 Automation Rule Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {automations.map((rule) => {
          const isExpanded = expandedRule === rule.id;
          return (
            <div
              key={rule.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                rule.enabled
                  ? 'bg-white border-[#E3E8E1] shadow-xs hover:border-[#285B49]'
                  : 'bg-[#F9FAF8] border-[#E3E8E1] opacity-75'
              }`}
            >
              <div className="space-y-4">
                {/* Header & Toggle */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] font-bold text-[#285B49] uppercase tracking-wider">
                      {rule.id.toUpperCase()}
                    </span>
                    <h3 className="font-bold text-sm text-[#17392F]">{rule.name}</h3>
                  </div>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => handleToggle(rule.id, rule.name, rule.enabled)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      rule.enabled ? 'bg-[#285B49]' : 'bg-[#C6D1C7]'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        rule.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Trigger description */}
                <div className="p-3 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#747E76] tracking-wider">
                    Stripe Webhook Trigger
                  </span>
                  <p className="font-mono text-[11px] font-semibold text-[#17392F]">
                    {rule.triggerEvent}
                  </p>
                  <p className="text-[11px] text-[#747E76]">{rule.triggerDescription}</p>
                </div>

                {/* Actions list */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-[#747E76] tracking-wider">
                    Automated Action Sequence ({rule.actions.length} Steps)
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-[#202923]">
                    {rule.actions.slice(0, isExpanded ? rule.actions.length : 2).map((act, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4B805D] shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                  {rule.actions.length > 2 && (
                    <button
                      type="button"
                      onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                      className="text-[11px] font-semibold text-[#285B49] hover:underline pt-1 inline-flex items-center gap-1"
                    >
                      {isExpanded ? 'Show Less' : `+${rule.actions.length - 2} More Steps`}
                      <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-[#E3E8E1] flex items-center justify-between text-[11px] text-[#747E76]">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  Last run: {rule.lastExecuted}
                </span>
                <span className="font-bold text-[#202923] font-tabular">
                  {rule.executionCount.toLocaleString()} Executions
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

