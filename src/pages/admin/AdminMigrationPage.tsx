import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import { Link } from 'react-router-dom';
import {
  ArrowRightLeft,
  Upload,
  CheckCircle2,
  FileSpreadsheet,
  AlertTriangle,
  Mail,
  ShieldCheck,
  ExternalLink,
  Download,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';

export const AdminMigrationPage: React.FC = () => {
  const { migrationRecords, addActivity } = useDemoStore();
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [emailsDispatched, setEmailsDispatched] = useState(false);

  const totalRecords = migrationRecords.length;
  const claimedCount = migrationRecords.filter((r) => r.status === 'claimed').length;
  const pendingCount = migrationRecords.filter((r) => r.status === 'ready').length;

  const handleCopyLink = (url: string, token: string) => {
    navigator.clipboard.writeText(`${window.location.origin}${url}`);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleDispatchEmails = () => {
    setEmailsDispatched(true);
    addActivity({
      category: 'migration',
      title: 'VIP Migration Invitations Dispatched',
      description: `Amazon SES sent personal 1-click claim tokens to ${pendingCount} Instagram VIP members.`,
      result: 'success',
      referenceId: 'batch_ses_migration_01'
    });
  };

  const downloadSampleTemplate = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Email,InstagramHandle,StripeCustomerId,Plan,LifetimeFlag\n' +
      'jordan.vip@gmail.com,@jordan_tips,cus_InstaPunt99,monthly,FALSE\n' +
      'lachlan.racing@outlook.com,@lachlan_punts,cus_InstaPunt98,weekly,FALSE\n' +
      'vance.founder@yahoo.com,@vance_tipper,cus_InstaPunt97,lifetime,TRUE\n';

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'punt_ai_instagram_migration_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-xs text-[#202923]">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#285B49] bg-[#E0E9E0] px-2.5 py-0.5 rounded-full">
              INSTAGRAM-TO-DISCORD MIGRATION
            </span>
            <span className="text-xs text-[#747E76]">• Zero Double Billing</span>
          </div>
          <h2 className="text-xl font-bold text-[#17392F] mt-1">
            Existing Member Migration Engine
          </h2>
          <p className="text-xs text-[#747E76] mt-0.5">
            Safely transition private Instagram close-friends subscribers into Discord with verified claim tokens.
          </p>
        </div>

        <button
          onClick={downloadSampleTemplate}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-[#E3E8E1] bg-white hover:bg-[#F5F6F2] text-[#202923] flex items-center gap-2 transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          Download CSV Template
        </button>
      </div>

      {/* Migration Progress Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#747E76] uppercase">Imported Instagram VIPs</span>
          <p className="text-2xl font-bold text-[#17392F] font-tabular">{totalRecords}</p>
          <p className="text-[10px] text-[#747E76]">Verified from spreadsheet</p>
        </div>

        <div className="p-4.5 rounded-2xl bg-[#17392F] text-white shadow-md space-y-1">
          <span className="text-[10px] font-bold text-emerald-300 uppercase">Successfully Claimed</span>
          <p className="text-2xl font-bold text-white font-tabular">{claimedCount}</p>
          <p className="text-[10px] text-[#A1B5A3]">Role granted on Discord</p>
        </div>

        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#B68B4D] uppercase">Pending Claims</span>
          <p className="text-2xl font-bold text-[#B68B4D] font-tabular">{pendingCount}</p>
          <p className="text-[10px] text-[#747E76]">Awaiting Discord connection</p>
        </div>

        <div className="p-4.5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#747E76] uppercase">New Payment Charged</span>
          <p className="text-2xl font-bold text-[#4B805D] font-tabular">$0.00</p>
          <p className="text-[10px] text-[#4B805D] font-semibold">100% Free Transfer</p>
        </div>
      </div>

      {/* 5-Step Interactive Wizard Bar */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8E1]">
          <h3 className="text-base font-bold text-[#17392F]">5-Step Migration Workflow</h3>
          <span className="text-[11px] font-semibold text-[#285B49]">
            Step {activeStep} of 5
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {[
            { step: 1, label: 'Upload CSV' },
            { step: 2, label: 'Validate Data' },
            { step: 3, label: 'Generate Tokens' },
            { step: 4, label: 'Send Invitations' },
            { step: 5, label: 'Audit Results' }
          ].map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStep(s.step as any)}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                activeStep === s.step
                  ? 'bg-[#17392F] text-white border-[#17392F] shadow-xs font-bold'
                  : 'bg-[#F5F6F2] hover:bg-[#EBEFE9] text-[#747E76] border-[#E3E8E1]'
              }`}
            >
              <span className="block text-[10px] font-mono opacity-80">0{s.step}</span>
              <span className="text-[11px]">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Step Body */}
        {activeStep === 1 && (
          <div className="p-8 border-2 border-dashed border-[#A1B5A3]/50 rounded-2xl bg-[#F5F6F2] text-center space-y-3">
            <Upload className="w-8 h-8 text-[#285B49] mx-auto" />
            <h4 className="font-bold text-sm text-[#17392F]">Upload Existing Members CSV</h4>
            <p className="text-xs text-[#747E76] max-w-sm mx-auto">
              Export existing paying members from your current Instagram records or Stripe dashboard.
            </p>
            <button
              onClick={() => setActiveStep(2)}
              className="py-2 px-4 rounded-xl text-xs font-bold bg-[#17392F] text-white hover:bg-[#285B49]"
            >
              Load Sample 5-Record Dataset →
            </button>
          </div>
        )}

        {activeStep === 2 && (
          <div className="p-5 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] space-y-3">
            <div className="flex items-center gap-2 text-[#4B805D] font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Validation Complete: 5 of 5 Records Verified</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="p-2 bg-white rounded border border-[#E3E8E1]">✓ 0 Missing Emails</div>
              <div className="p-2 bg-white rounded border border-[#E3E8E1]">✓ 0 Duplicate Customers</div>
              <div className="p-2 bg-white rounded border border-[#E3E8E1]">✓ 1 Lifetime VIP Protected</div>
              <div className="p-2 bg-white rounded border border-[#E3E8E1]">✓ 4 Recurring Subscriptions</div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveStep(3)}
                className="py-2 px-4 rounded-xl text-xs font-bold bg-[#17392F] text-white hover:bg-[#285B49]"
              >
                Proceed to Generate Claim Tokens →
              </button>
            </div>
          </div>
        )}

        {(activeStep === 3 || activeStep === 4 || activeStep === 5) && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#747E76]">
                Each existing subscriber receives a unique single-use URL to claim their Discord role without paying again.
              </p>
              {!emailsDispatched ? (
                <button
                  onClick={handleDispatchEmails}
                  className="py-2 px-3.5 rounded-xl text-xs font-bold bg-[#285B49] text-white hover:bg-[#17392F] transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Dispatch Migration Emails via Amazon SES
                </button>
              ) : (
                <span className="text-[11px] font-bold text-[#4B805D] bg-[#E0E9E0] px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Migration Emails Sent via Amazon SES
                </span>
              )}
            </div>

            {/* Claim Links Table */}
            <div className="overflow-x-auto border border-[#E3E8E1] rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F6F2] text-[#747E76] uppercase text-[10px] tracking-wider border-b border-[#E3E8E1]">
                  <tr>
                    <th className="py-2.5 px-3">Instagram Handle</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Plan</th>
                    <th className="py-2.5 px-3">Personal Claim Token</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3E8E1]">
                  {migrationRecords.map((rec) => (
                    <tr key={rec.id} className="hover:bg-[#F5F6F2] transition-colors">
                      <td className="py-3 px-3 font-bold text-[#17392F]">{rec.instagramHandle}</td>
                      <td className="py-3 px-3 text-[#747E76] font-mono text-[11px]">{rec.email}</td>
                      <td className="py-3 px-3 capitalize font-semibold text-[#202923]">
                        {rec.plan} {rec.lifetime ? '(Lifetime)' : ''}
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] font-bold text-[#285B49]">
                        {rec.claimToken}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          rec.status === 'claimed'
                            ? 'bg-[#E0E9E0] text-[#285B49]'
                            : 'bg-[#FDF3E3] text-[#B68B4D]'
                        }`}>
                          {rec.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleCopyLink(rec.claimUrl, rec.claimToken)}
                            className="text-[#747E76] hover:text-[#285B49] p-1"
                            title="Copy claim link"
                          >
                            {copiedToken === rec.claimToken ? (
                              <Check className="w-3.5 h-3.5 text-[#4B805D]" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <Link
                            to={rec.claimUrl}
                            className="text-[#285B49] hover:underline font-semibold text-[11px] inline-flex items-center gap-1"
                          >
                            Open Claim Portal <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Safeguards Card */}
      <div className="p-5 rounded-2xl bg-[#EBEFE9] border border-[#E3E8E1] space-y-2">
        <h4 className="font-bold text-xs text-[#17392F] flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#285B49]" />
          Migration Safeguards & Business Continuity
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px] text-[#747E76]">
          <p>• <strong>One-time claim tokens:</strong> Tokens expire immediately upon first verified Discord link.</p>
          <p>• <strong>Zero double charges:</strong> Transfers exist independently of new Stripe payment links.</p>
          <p>• <strong>Lifetime preservation:</strong> Lifetime members maintain immutable permanent access.</p>
        </div>
      </div>
    </div>
  );
};

