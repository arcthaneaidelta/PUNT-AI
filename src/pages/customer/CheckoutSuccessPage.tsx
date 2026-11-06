import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import { EmailPreviewModal } from '../../components/customer/EmailPreviewModal';
import { CheckCircle2, ArrowRight, Mail, ShieldCheck, MessageSquare, Copy, Check } from 'lucide-react';

export const CheckoutSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planParam = searchParams.get('plan') || 'monthly';
  const emailParam = searchParams.get('email') || 'jordan.mitchell@sydneyfooty.com.au';
  const amountParam = searchParams.get('amount') || (planParam === 'weekly' ? '37' : planParam === 'monthly' ? '99' : '1499');
  const memberIdParam = searchParams.get('memberId') || 'mem_01';

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const planName = planParam === 'weekly' ? 'Premium Weekly' : planParam === 'monthly' ? 'Premium Monthly' : 'Lifetime Premium';
  const connectUrl = `${window.location.origin}/connect-discord?memberId=${memberIdParam}`;

  const copyLink = () => {
    navigator.clipboard.writeText(connectUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F6F2] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-[#E3E8E1] overflow-hidden">
        {/* Top Forest Brand Accent Banner */}
        <div className="bg-[#17392F] px-8 py-6 text-white text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#285B49] text-white flex items-center justify-center mx-auto shadow-md ring-4 ring-[#17392F]">
            <CheckCircle2 className="w-7 h-7 text-emerald-300" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Payment Successful</h2>
          <p className="text-xs text-[#A1B5A3]">
            Welcome to Punt AI Premium • Verified Stripe Checkout (AUD)
          </p>
        </div>

        <div className="p-8 space-y-6 text-xs text-[#202923]">
          {/* Order Details Card */}
          <div className="p-4 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3E8E1]">
              <span className="font-bold text-[#17392F] text-sm">{planName}</span>
              <span className="font-bold text-base text-[#17392F] font-tabular">
                A${amountParam}.00 AUD
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-[#747E76]">Stripe Customer Email:</span>
                <p className="font-semibold text-[#202923]">{emailParam}</p>
              </div>
              <div>
                <span className="text-[#747E76]">Payment Status:</span>
                <p className="font-semibold text-[#4B805D] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Succeeded
                </p>
              </div>
              <div>
                <span className="text-[#747E76]">Discord Connection:</span>
                <p className="font-bold text-[#B68B4D]">Pending Account Link</p>
              </div>
              <div>
                <span className="text-[#747E76]">Stripe Reference:</span>
                <p className="font-mono text-[#747E76]">cus_verified_aud</p>
              </div>
            </div>
          </div>

          {/* Critical Explanation Callout from PRD */}
          <div className="p-4 rounded-xl bg-[#EBEFE9] border border-[#E3E8E1] space-y-2">
            <h4 className="font-bold text-[#17392F] text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#285B49]" />
              Next Step: Connect Your Discord Account
            </h4>
            <p className="text-xs text-[#747E76] leading-relaxed">
              Your payment has been received, but your <strong>@Premium role is not yet active</strong>.
              Connect your Discord account below to verify your 18+ age confirmation and instantly unlock all premium sports tipping channels.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => navigate(`/connect-discord?memberId=${memberIdParam}`)}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-[#17392F] hover:bg-[#285B49] text-white flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <MessageSquare className="w-4 h-4" />
              Connect Discord Account
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setEmailModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-white border border-[#E3E8E1] hover:bg-[#F5F6F2] text-[#202923] flex items-center justify-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#285B49]" />
              Preview "Keep This Email" Transactional Receipt
            </button>

            <button
              onClick={copyLink}
              className="w-full py-2 text-center text-[11px] text-[#747E76] hover:text-[#202923] flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#4B805D]" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedLink ? 'Copied personal linking link!' : 'Copy Discord Linking Link'}
            </button>
          </div>

          <div className="pt-2 text-center text-[11px] text-[#747E76]">
            Keep your membership email safe. You'll use it whenever you need to manage your billing.
          </div>
        </div>
      </div>

      {/* Transactional Email Preview Modal */}
      <EmailPreviewModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        email={emailParam}
        planName={planName}
        amount={Number(amountParam)}
        token={memberIdParam}
      />
    </div>
  );
};

