import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Edit, Send, Copy, Check, Eye } from 'lucide-react';
import { EmailPreviewModal } from '../../components/customer/EmailPreviewModal';

interface TemplateItem {
  id: string;
  name: string;
  subject: string;
  description: string;
  trigger: string;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: 'tpl_welcome',
    name: 'Keep This Email & Access Instructions',
    subject: 'Your Punt AI Premium Membership — Keep This Email',
    description: 'Dispatched immediately upon successful Stripe checkout with one-time Discord linking URL and permanent portal link.',
    trigger: 'checkout.session.completed'
  },
  {
    id: 'tpl_activated',
    name: 'Premium Role Activated',
    subject: 'Welcome to Punt AI Premium — Discord Access Live',
    description: 'Sent when the Discord bot assigns the @Premium role after age confirmation.',
    trigger: 'discord.role.granted'
  },
  {
    id: 'tpl_cancel',
    name: 'Cancellation Scheduled at Period End',
    subject: 'Punt AI Subscription Cancellation Scheduled',
    description: 'Confirms that access remains active until the end of the paid billing period.',
    trigger: 'customer.subscription.updated (cancel_at_period_end)'
  },
  {
    id: 'tpl_expired',
    name: 'Membership Expired (Win-Back)',
    subject: 'Your Punt AI Premium Membership Has Ended',
    description: 'Delivered after currentPeriodEnd has expired without renewal.',
    trigger: 'customer.subscription.deleted'
  },
  {
    id: 'tpl_mig',
    name: 'Instagram VIP Migration Invitation',
    subject: 'Your Punt AI Premium Membership Is Moving to Discord',
    description: 'Sent to existing Instagram subscribers with personal 1-click claim token.',
    trigger: 'admin.migration.dispatch'
  }
];

const DELIVERY_LOGS = [
  { id: 'log_01', to: 'jordan.mitchell@sydneyfooty.com.au', type: 'Keep This Email', status: 'delivered', time: '2026-11-06 14:22', sesMsgId: 'ses_0100018f-a9b2' },
  { id: 'log_02', to: 'lachlan.d@melbournesport.com', type: 'Weekly Renewal Receipt', status: 'delivered', time: '2026-11-06 12:15', sesMsgId: 'ses_0100018f-a9b3' },
  { id: 'log_03', to: 'lucas.graham@perthracing.com', type: 'Cancellation Scheduled', status: 'delivered', time: '2026-11-05 16:45', sesMsgId: 'ses_0100018f-a9b4' },
  { id: 'log_04', to: 'marcus.punt@gmail.com', type: 'VIP Migration Claim Link', status: 'delivered', time: '2026-11-04 11:00', sesMsgId: 'ses_0100018f-a9b5' }
];

export const AdminEmailPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem>(TEMPLATES[0]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(TEMPLATES[0].subject);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 text-xs text-[#202923]">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#285B49] bg-[#E0E9E0] px-2.5 py-0.5 rounded-full">
              TRANSACTIONAL EMAIL
            </span>
            <span className="text-xs text-[#747E76]">• Amazon SES Proposed Architecture</span>
          </div>
          <h2 className="text-xl font-bold text-[#17392F] mt-1">Amazon SES Email Automation</h2>
          <p className="text-xs text-[#747E76] mt-0.5">
            Low-cost, high-deliverability transactional messaging. Resend explicitly avoided to minimize operating overhead.
          </p>
        </div>

        <button
          onClick={() => setPreviewOpen(true)}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#17392F] hover:bg-[#285B49] text-white flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Eye className="w-3.5 h-3.5 text-emerald-300" />
          Preview Live Customer Email
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-[#E0E9E0] border border-[#A1B5A3]/50 text-xs text-[#17392F] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#4B805D]" />
          <span>Template changes saved. Amazon SES template registry updated.</span>
        </div>
      )}

      {/* Two Column Section: Templates & Editor */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Templates Sidebar */}
        <div className="md:col-span-5 p-5 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-[#17392F] pb-2 border-b border-[#E3E8E1]">
            Automated Email Templates
          </h3>
          <div className="space-y-2">
            {TEMPLATES.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => {
                  setSelectedTemplate(tpl);
                  setEditingSubject(tpl.subject);
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all ${
                  selectedTemplate.id === tpl.id
                    ? 'bg-[#17392F] text-white border-[#17392F] shadow-xs'
                    : 'bg-[#F5F6F2] hover:bg-[#EBEFE9] text-[#202923] border-[#E3E8E1]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{tpl.name}</span>
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                    selectedTemplate.id === tpl.id ? 'bg-[#285B49] text-emerald-200' : 'bg-white text-[#747E76]'
                  }`}>
                    {tpl.trigger.split(' ')[0]}
                  </span>
                </div>
                <p className={`text-[11px] mt-1 line-clamp-2 ${
                  selectedTemplate.id === tpl.id ? 'text-[#A1B5A3]' : 'text-[#747E76]'
                }`}>
                  {tpl.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Editor Form */}
        <div className="md:col-span-7 p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E3E8E1]">
            <div>
              <h3 className="font-bold text-sm text-[#17392F]">Edit Template: {selectedTemplate.name}</h3>
              <p className="text-[11px] text-[#747E76]">Trigger: <code>{selectedTemplate.trigger}</code></p>
            </div>
            <span className="text-[10px] text-[#4B805D] font-bold bg-[#E0E9E0] px-2 py-0.5 rounded">
              SES Verified Domain
            </span>
          </div>

          <form onSubmit={handleSaveTemplate} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Email Subject Line
              </label>
              <input
                type="text"
                required
                value={editingSubject}
                onChange={(e) => setEditingSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#202923] mb-1">
                Body Variables & Access Link Parameters
              </label>
              <div className="p-3 rounded-lg bg-[#F5F6F2] border border-[#E3E8E1] space-y-1 font-mono text-[11px] text-[#747E76]">
                <p>• <code>{'{{customer_name}}'}</code> — Full customer name</p>
                <p>• <code>{'{{plan_name}}'}</code> — Weekly / Monthly / Lifetime</p>
                <p>• <code>{'{{amount_aud}}'}</code> — A$37 / A$99 / A$1,499</p>
                <p>• <code>{'{{discord_oauth_url}}'}</code> — 1-time single-use nonce</p>
                <p>• <code>{'{{stripe_portal_url}}'}</code> — Permanent customer login portal</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="py-2 px-3 rounded-lg border border-[#E3E8E1] text-[#202923] hover:bg-[#F5F6F2]"
              >
                Inspect Modal Preview
              </button>
              <button
                type="submit"
                className="py-2 px-4 rounded-lg bg-[#17392F] text-white hover:bg-[#285B49] font-bold"
              >
                Save Template
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Delivery Logs Table */}
      <div className="rounded-2xl bg-white border border-[#E3E8E1] shadow-xs overflow-hidden">
        <div className="p-5 border-b border-[#E3E8E1] flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#17392F]">Recent Amazon SES Delivery Telemetry</h3>
          <span className="text-[11px] text-[#747E76]">Bounce Rate: 0.0% • 100% Deliverability</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F6F2] text-[#747E76] uppercase text-[10px] tracking-wider border-b border-[#E3E8E1]">
              <tr>
                <th className="py-2.5 px-4">Recipient</th>
                <th className="py-2.5 px-4">Template Dispatched</th>
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4">SES Message ID</th>
                <th className="py-2.5 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E1]">
              {DELIVERY_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-[#F5F6F2]">
                  <td className="py-3 px-4 font-mono font-bold text-[#17392F]">{log.to}</td>
                  <td className="py-3 px-4 font-semibold text-[#202923]">{log.type}</td>
                  <td className="py-3 px-4 font-mono text-[#747E76] text-[11px]">{log.time}</td>
                  <td className="py-3 px-4 font-mono text-[#747E76] text-[11px]">{log.sesMsgId}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E0E9E0] text-[#285B49]">
                      DELIVERED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EmailPreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        email="jordan.mitchell@sydneyfooty.com.au"
        planName="Premium Monthly"
        amount={99}
      />
    </div>
  );
};

