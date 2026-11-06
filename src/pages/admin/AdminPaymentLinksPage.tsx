import React, { useState } from 'react';
import { useDemoStore } from '../../store/demoStore';
import { PaymentLinkModal } from '../../components/admin/PaymentLinkModal';
import { PaymentLink } from '../../types';
import {
  Link2,
  Plus,
  Edit,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Info
} from 'lucide-react';

export const AdminPaymentLinksPage: React.FC = () => {
  const { paymentLinks, updatePaymentLink } = useDemoStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<PaymentLink | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleActive = (link: PaymentLink) => {
    updatePaymentLink(link.id, { active: !link.active });
  };

  return (
    <div className="space-y-6 text-xs text-[#202923]">
      {/* Top Header Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#285B49] bg-[#E0E9E0] px-2.5 py-0.5 rounded-full">
              STRIPE INTEGRATION
            </span>
            <span className="text-xs text-[#747E76]">• Zero Code Deployments</span>
          </div>
          <h2 className="text-xl font-bold text-[#17392F] mt-1">Stripe Payment Link Registry</h2>
          <p className="text-xs text-[#747E76] mt-0.5">
            Add or replace Stripe Payment Links and Price IDs dynamically without modifying backend code.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingLink(null);
            setModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#17392F] hover:bg-[#285B49] text-white flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Stripe Payment Link
        </button>
      </div>

      {/* Critical Architecture Callout Banner from PRD */}
      <div className="p-5 rounded-2xl bg-[#EBEFE9] border border-[#A1B5A3]/40 space-y-2">
        <h4 className="font-bold text-xs text-[#17392F] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#285B49]" />
          Production Architectural Principle: Price-ID Entitlement Decoupling
        </h4>
        <p className="text-xs text-[#747E76] leading-relaxed">
          Membership access is never coupled to brittle payment-link URLs. Instead, verified Stripe webhooks identify the actual <strong>Stripe Price ID</strong> purchased. Any newly created payment link reusing an existing configured Price works instantly without code changes!
        </p>
      </div>

      {/* Payment Links Table */}
      <div className="rounded-2xl bg-white border border-[#E3E8E1] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F6F2] text-[#747E76] uppercase text-[10px] tracking-wider border-b border-[#E3E8E1]">
              <tr>
                <th className="py-3 px-4">Plan Name</th>
                <th className="py-3 px-4">Stripe Price ID</th>
                <th className="py-3 px-4">Price (AUD)</th>
                <th className="py-3 px-4">Billing Cycle</th>
                <th className="py-3 px-4">Access Behaviour</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E3E8E1]">
              {paymentLinks.map((link) => (
                <tr key={link.id} className="hover:bg-[#F5F6F2] transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-[#17392F]">{link.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[10px] text-[#747E76] font-mono truncate max-w-xs">
                        {link.url}
                      </span>
                      <button
                        onClick={() => handleCopy(link.url, link.id)}
                        className="text-[#747E76] hover:text-[#285B49] p-0.5"
                        title="Copy Stripe payment link URL"
                      >
                        {copiedId === link.id ? (
                          <Check className="w-3 h-3 text-[#4B805D]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-medium text-[#202923]">
                    {link.stripePriceId}
                  </td>

                  <td className="py-3.5 px-4 font-bold font-tabular text-[#17392F]">
                    A${link.amount}.00 AUD
                  </td>

                  <td className="py-3.5 px-4 capitalize font-medium text-[#747E76]">
                    {link.billingInterval}
                  </td>

                  <td className="py-3.5 px-4 text-[#747E76] max-w-xs">
                    <p className="line-clamp-2 text-[11px] leading-tight">
                      {link.accessBehavior}
                    </p>
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleActive(link)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                        link.active
                          ? 'bg-[#E0E9E0] text-[#285B49] hover:bg-[#d0dfd0]'
                          : 'bg-[#F9ECEB] text-[#B75F58] hover:bg-[#ebd5d3]'
                      }`}
                    >
                      {link.active ? 'ACTIVE' : 'PAUSED'}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingLink(link);
                          setModalOpen(true);
                        }}
                        className="py-1 px-2.5 rounded-lg border border-[#E3E8E1] bg-white hover:bg-[#F5F6F2] font-semibold text-[#202923] flex items-center gap-1 transition-colors"
                      >
                        <Edit className="w-3 h-3" /> Edit Mapping
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding or editing links */}
      <PaymentLinkModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        existingLink={editingLink}
      />
    </div>
  );
};

