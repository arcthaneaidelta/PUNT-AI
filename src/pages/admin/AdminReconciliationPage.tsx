import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import {
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
  History,
  Check,
  Clock
} from 'lucide-react';

export const AdminReconciliationPage: React.FC = () => {
  const {
    reconciliationIssues,
    members,
    runReconciliationSimulation,
    fixReconciliationIssue,
    fixAllSafeReconciliationIssues,
    isReconciling,
    lastReconciledAt
  } = useDemoStore();

  const [fixSuccessMsg, setFixSuccessMsg] = useState<string | null>(null);

  const unresolvedCount = reconciliationIssues.filter((i) => !i.resolved).length;
  const safeUnresolvedCount = reconciliationIssues.filter((i) => i.isSafeToAutoFix && !i.resolved).length;

  const handleFixSingle = (id: string, name: string) => {
    fixReconciliationIssue(id);
    setFixSuccessMsg(`Corrected mismatch for ${name} and updated live Discord role.`);
    setTimeout(() => setFixSuccessMsg(null), 3500);
  };

  const handleFixAll = () => {
    fixAllSafeReconciliationIssues();
    setFixSuccessMsg(`Successfully resolved ${safeUnresolvedCount} safe discrepancies across Discord and Stripe.`);
    setTimeout(() => setFixSuccessMsg(null), 3500);
  };

  return (
    <div className="space-y-6 text-xs text-[#202923]">
      {/* Top Hero Section */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#285B49] bg-[#E0E9E0] px-2.5 py-0.5 rounded-full">
              DATA INTEGRITY ENGINE
            </span>
            <span className="text-xs text-[#747E76]">• Daily Automated Audit</span>
          </div>
          <h2 className="text-xl font-bold text-[#17392F] mt-1">
            Daily Stripe-to-Discord Reconciliation
          </h2>
          <p className="text-xs text-[#747E76] mt-0.5">
            Stripe says who paid. Discord reflects who has access. Guaranteed 100% synchronization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {safeUnresolvedCount > 0 && (
            <button
              onClick={handleFixAll}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#285B49] hover:bg-[#17392F] text-white flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
            >
              <Check className="w-3.5 h-3.5" />
              Fix All Safe Issues ({safeUnresolvedCount})
            </button>
          )}

          <button
            onClick={runReconciliationSimulation}
            disabled={isReconciling}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#17392F] hover:bg-[#285B49] text-white flex items-center gap-2 shadow-xs transition-colors shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReconciling ? 'animate-spin' : ''}`} />
            {isReconciling ? 'Auditing Live Roles...' : 'Run Daily Reconciliation'}
          </button>
        </div>
      </div>

      {fixSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-[#E0E9E0] border border-[#A1B5A3]/50 text-xs text-[#17392F] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#4B805D]" />
          <span>{fixSuccessMsg}</span>
        </div>
      )}

      {/* Reconciliation Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#747E76] uppercase">Active Stripe Payers</span>
          <p className="text-2xl font-bold text-[#17392F] font-tabular">486</p>
          <p className="text-[10px] text-[#747E76]">Paid subscribers</p>
        </div>

        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#747E76] uppercase">Discord @Premium Roles</span>
          <p className="text-2xl font-bold text-[#17392F] font-tabular">484</p>
          <p className="text-[10px] text-[#747E76]">Active guild roles</p>
        </div>

        <div className="p-4.5 rounded-2xl bg-[#17392F] text-white shadow-md space-y-1">
          <span className="text-[10px] font-bold text-emerald-300 uppercase">Correctly Synchronised</span>
          <p className="text-2xl font-bold text-white font-tabular">479</p>
          <p className="text-[10px] text-[#A1B5A3]">98.6% match rate</p>
        </div>

        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#B68B4D] uppercase">Pending Discrepancies</span>
          <p className="text-2xl font-bold text-[#B68B4D] font-tabular">{unresolvedCount}</p>
          <p className="text-[10px] text-[#747E76]">Detected in audit</p>
        </div>

        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#747E76] uppercase">Last Reconciliation Run</span>
          <p className="text-xs font-mono font-bold text-[#202923] pt-1">{lastReconciledAt}</p>
          <p className="text-[10px] text-[#4B805D] flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3 h-3" /> Scheduled daily @ 04:00
          </p>
        </div>
      </div>

      {/* Discrepancies Inspection Table */}
      <div className="rounded-2xl bg-white border border-[#E3E8E1] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E3E8E1] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#17392F]">Detected Discrepancies & Recommended Actions</h3>
            <p className="text-xs text-[#747E76]">
              All safe actions are idempotent and can be resolved with one click.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-[#747E76]">
            {unresolvedCount} Active Flagged Issues
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F6F2] text-[#747E76] uppercase text-[10px] tracking-wider border-b border-[#E3E8E1]">
              <tr>
                <th className="py-3 px-4">Member Name & Discord</th>
                <th className="py-3 px-4">Stripe Record</th>
                <th className="py-3 px-4">Discord State</th>
                <th className="py-3 px-4">Expected State</th>
                <th className="py-3 px-4">Recommended Automated Action</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4 text-right">Fix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E1]">
              {reconciliationIssues.map((issue) => (
                <tr
                  key={issue.id}
                  className={`transition-colors ${
                    issue.resolved ? 'bg-[#F9FAF8] opacity-60' : 'hover:bg-[#F5F6F2]'
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#17392F]">{issue.memberName}</p>
                    <p className="text-[11px] text-[#747E76] font-mono">{issue.discordUsername}</p>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#202923]">
                    {issue.stripeStatus}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      issue.discordStatus.includes('Missing')
                        ? 'bg-[#FDF3E3] text-[#B68B4D]'
                        : issue.discordStatus.includes('Still Assigned')
                        ? 'bg-[#F9ECEB] text-[#B75F58]'
                        : 'bg-[#EBEFE9] text-[#747E76]'
                    }`}>
                      {issue.discordStatus}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-[#285B49]">
                    {issue.expectedStatus}
                  </td>

                  <td className="py-3.5 px-4 text-[#747E76] max-w-xs">
                    {issue.recommendedAction}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      issue.severity === 'high'
                        ? 'bg-[#F9ECEB] text-[#B75F58]'
                        : issue.severity === 'medium'
                        ? 'bg-[#FDF3E3] text-[#B68B4D]'
                        : 'bg-[#E0E9E0] text-[#285B49]'
                    }`}>
                      {issue.severity.toUpperCase()}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {issue.resolved ? (
                      <span className="inline-flex items-center gap-1 text-[#4B805D] font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                      </span>
                    ) : issue.isSafeToAutoFix ? (
                      <button
                        onClick={() => handleFixSingle(issue.id, issue.memberName)}
                        className="py-1 px-3 rounded-lg bg-[#17392F] hover:bg-[#285B49] text-white font-semibold text-[11px] transition-colors shadow-xs"
                      >
                        Fix Issue
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Sent email linking reminder to ${issue.memberEmail}`)}
                        className="py-1 px-2.5 rounded-lg border border-[#E3E8E1] hover:bg-[#EBEFE9] text-[#202923] font-semibold text-[11px]"
                      >
                        Send Link Reminder
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Reconciliation Run Log */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E1]">
          <h3 className="font-bold text-sm text-[#17392F] flex items-center gap-2">
            <History className="w-4 h-4 text-[#285B49]" />
            Recent Automated Audit Execution Log
          </h3>
          <span className="text-[11px] text-[#747E76]">Idempotent Background Jobs</span>
        </div>

        <div className="space-y-2 font-mono text-[11px]">
          <div className="p-3 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#17392F]">2026-11-06 04:00 AEST</span>
              <span className="text-[#747E76]">Checked 486 members</span>
              <span className="text-[#4B805D] font-bold">479 matched</span>
              <span className="text-[#B68B4D]">7 discrepancies</span>
            </div>
            <span className="text-[#4B805D] font-bold">Completed in 1.2s</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#17392F]">2026-11-05 04:00 AEST</span>
              <span className="text-[#747E76]">Checked 482 members</span>
              <span className="text-[#4B805D] font-bold">480 matched</span>
              <span className="text-[#B68B4D]">2 discrepancies</span>
            </div>
            <span className="text-[#4B805D] font-bold">Completed in 1.1s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

