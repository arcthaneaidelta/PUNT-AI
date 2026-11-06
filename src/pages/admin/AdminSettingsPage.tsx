import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  CreditCard,
  MessageSquare,
  Server,
  Database,
  Lock,
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [communityName, setCommunityName] = useState('Punt AI');
  const [currency, setCurrency] = useState('AUD');
  const [timezone, setTimezone] = useState('Australia/Sydney');
  const [adminEmail, setAdminEmail] = useState('admin@punt-ai.com.au');
  const [gracePeriodDays, setGracePeriodDays] = useState(3);
  const [partialRefundPolicy, setPartialRefundPolicy] = useState<'retain_and_flag' | 'immediate_revoke'>(
    'retain_and_flag'
  );
  const [saveToast, setSaveToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  return (
    <div className="space-y-6 text-xs text-[#202923]">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#285B49] bg-[#E0E9E0] px-2.5 py-0.5 rounded-full">
              SYSTEM CONFIGURATION
            </span>
            <span className="text-xs text-[#747E76]">• Production Settings</span>
          </div>
          <h2 className="text-xl font-bold text-[#17392F] mt-1">Platform Policies & Infrastructure</h2>
          <p className="text-xs text-[#747E76] mt-0.5">
            Operational rules, Stripe & Discord credentials, and edge case policy handling.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#17392F] hover:bg-[#285B49] text-white flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Save className="w-3.5 h-3.5" />
          Save Policy Changes
        </button>
      </div>

      {saveToast && (
        <div className="p-3.5 rounded-xl bg-[#E0E9E0] border border-[#A1B5A3]/50 text-xs text-[#17392F] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#4B805D]" />
          <span>Platform policies updated successfully. Live webhook workers will use new thresholds.</span>
        </div>
      )}

      {/* Main Form Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Section 1: General & Localization */}
        <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#17392F] flex items-center gap-2 pb-2 border-b border-[#E3E8E1]">
            <Settings className="w-4 h-4 text-[#285B49]" />
            General & Regional Standards
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Community Brand Name
              </label>
              <input
                type="text"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Default Currency
              </label>
              <input
                type="text"
                disabled
                value="AUD — Australian Dollar (Strict Requirement)"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] bg-[#F5F6F2] font-semibold text-[#17392F] cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Default Timezone
              </label>
              <input
                type="text"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Primary Administrative Alerts Email
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Membership Policy Handling (Crucial Edge Cases from PRD) */}
        <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#17392F] flex items-center gap-2 pb-2 border-b border-[#E3E8E1]">
            <ShieldCheck className="w-4 h-4 text-[#285B49]" />
            Membership Lifecycle & Edge Case Policies
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Failed Payment Grace Period (Days)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={14}
                  value={gracePeriodDays}
                  onChange={(e) => setGracePeriodDays(Number(e.target.value))}
                  className="w-24 px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
                />
                <span className="text-[11px] text-[#747E76]">
                  Retain role during temporary invoice retries (Default: 3 days)
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Partial Refund Policy (Proposed Client Default)
              </label>
              <select
                value={partialRefundPolicy}
                onChange={(e) => setPartialRefundPolicy(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] bg-white focus:outline-none focus:border-[#285B49]"
              >
                <option value="retain_and_flag">
                  Retain @Premium Role & Flag for Admin Review (Recommended)
                </option>
                <option value="immediate_revoke">
                  Immediately Revoke Role
                </option>
              </select>
              <p className="text-[10px] text-[#747E76] mt-1">
                Prevents a goodwill partial refund from accidentally revoking an active member.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#E0E9E0] border border-[#A1B5A3]/40 space-y-1 text-[11px] text-[#17392F]">
              <p className="font-bold">Permanent Policy Rules:</p>
              <p>• <strong>Full Refund:</strong> Immediate role revocation in Discord.</p>
              <p>• <strong>Chargeback / Dispute:</strong> Immediate role revocation and lockdown.</p>
              <p>• <strong>Cancellation:</strong> Access retained until paid-through date.</p>
              <p>• <strong>Lifetime VIP:</strong> Immune to recurring subscription expirations.</p>
            </div>
          </div>
        </div>

        {/* Section 3: Proposed Infrastructure & Self-Hosting Architecture */}
        <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#17392F] flex items-center gap-2 pb-2 border-b border-[#E3E8E1]">
            <Server className="w-4 h-4 text-[#285B49]" />
            Proposed Self-Hosted Stack (Low Cost VPS)
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[#F5F6F2] border border-[#E3E8E1] flex items-center justify-between">
              <span className="font-semibold text-[#202923]">Node.js Webhook Service:</span>
              <span className="font-mono text-[11px] text-[#285B49] font-bold">Express / Fastify v20</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#F5F6F2] border border-[#E3E8E1] flex items-center justify-between">
              <span className="font-semibold text-[#202923]">Database Engine:</span>
              <span className="font-mono text-[11px] text-[#285B49] font-bold">PostgreSQL 16 Relational</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#F5F6F2] border border-[#E3E8E1] flex items-center justify-between">
              <span className="font-semibold text-[#202923]">Discord Bot Gateway:</span>
              <span className="font-mono text-[11px] text-[#285B49] font-bold">Discord.js v14 WebSocket</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#F5F6F2] border border-[#E3E8E1] flex items-center justify-between">
              <span className="font-semibold text-[#202923]">Daily Reconciliation Worker:</span>
              <span className="font-mono text-[11px] text-[#285B49] font-bold">Node Cron @ 04:00 AEST</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#F5F6F2] border border-[#E3E8E1] flex items-center justify-between">
              <span className="font-semibold text-[#202923]">Transactional Email:</span>
              <span className="font-mono text-[11px] text-[#285B49] font-bold">Amazon SES (No Resend)</span>
            </div>
          </div>
        </div>

        {/* Section 4: Security Standards */}
        <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#17392F] flex items-center gap-2 pb-2 border-b border-[#E3E8E1]">
            <Lock className="w-4 h-4 text-[#285B49]" />
            Security & Cryptographic Standards
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5 p-2 bg-[#F5F6F2] rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-[#4B805D] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#17392F]">Verified Stripe Webhook HMAC Signatures</p>
                <p className="text-[11px] text-[#747E76]">
                  Every incoming Stripe event payload is verified using the raw body and signing secret.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 bg-[#F5F6F2] rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-[#4B805D] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#17392F]">Discord OAuth2 Nonce Verification</p>
                <p className="text-[11px] text-[#747E76]">
                  Single-use short-lived tokens prevent replay attacks or account hijack attempts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2 bg-[#F5F6F2] rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-[#4B805D] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-[#17392F]">Idempotent Webhook Processing</p>
                <p className="text-[11px] text-[#747E76]">
                  Stripe event IDs are indexed; duplicate deliveries are safely ignored.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

