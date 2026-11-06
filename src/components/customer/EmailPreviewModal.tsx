import React, { useState } from 'react';
import { X, Copy, Check, Mail, ExternalLink, ShieldCheck } from 'lucide-react';

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  planName?: string;
  amount?: number;
  token?: string;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  isOpen,
  onClose,
  email = 'jordan.mitchell@sydneyfooty.com.au',
  planName = 'Premium Monthly',
  amount = 99,
  token = 'tok_demo_oauth981'
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPortal, setCopiedPortal] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const connectUrl = `${window.location.origin}/connect-discord?token=${token}`;
  const portalUrl = `${window.location.origin}/membership/manage`;

  const copyToClipboard = (text: string, type: 'link' | 'portal' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else if (type === 'portal') {
      setCopiedPortal(true);
      setTimeout(() => setCopiedPortal(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const emailBodyText = `Subject: Your Punt AI Premium Membership — Keep This Email

Hi there,

Thanks for joining Punt AI Premium.
Your payment of A$${amount}.00 AUD for ${planName} has been received.

To activate your Premium Discord access, connect your Discord account using the secure link below:
${connectUrl}

Keep this email — manage or cancel your membership anytime here:
${portalUrl}

Use the email address associated with your Stripe membership (${email}) to access your billing information securely.

Welcome to Punt AI Premium.
The Punt AI Team`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#E3E8E1] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#17392F] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-emerald-300" />
            <div>
              <h3 className="text-sm font-bold">Transactional Email Preview</h3>
              <p className="text-[11px] text-[#A1B5A3]">
                Dispatched via Amazon SES immediately after Stripe checkout
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#A1B5A3] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Email Client Shell */}
        <div className="p-6 space-y-4 text-xs">
          {/* Metadata Bar */}
          <div className="p-3 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-[#747E76]">From:</span>
              <span className="font-semibold text-[#202923]">Punt AI &lt;members@punt-ai.com.au&gt;</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#747E76]">To:</span>
              <span className="text-[#202923]">{email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#747E76]">Subject:</span>
              <span className="font-semibold text-[#17392F]">
                Your Punt AI Premium Membership — Keep This Email
              </span>
            </div>
          </div>

          {/* Email Body Card */}
          <div className="p-5 rounded-xl border border-[#E3E8E1] bg-white space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3E8E1]">
              <div className="w-6 h-6 rounded bg-[#17392F] text-white flex items-center justify-center font-bold text-xs">
                P
              </div>
              <span className="font-bold text-sm text-[#17392F]">Punt AI Sports Tipping</span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-[#202923]">
              <p>Hi there,</p>
              <p>
                Thanks for joining <strong>Punt AI Premium</strong>. Your payment of{' '}
                <strong className="text-[#17392F]">A${amount}.00 AUD</strong> for{' '}
                <strong>{planName}</strong> has been received.
              </p>
              <p>
                To activate your exclusive Premium Discord access, connect your Discord account
                and confirm you are 18+ using the secure link below:
              </p>

              {/* Connect CTA Button in Email */}
              <div className="py-2">
                <a
                  href={connectUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = connectUrl;
                  }}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#17392F] text-white hover:bg-[#285B49] transition-all"
                >
                  Connect Discord Account →
                </a>
              </div>

              <div className="p-3 rounded-lg bg-[#EBEFE9] border border-[#E3E8E1] space-y-1">
                <p className="font-semibold text-[#17392F]">Keep this email for self-service billing:</p>
                <p className="text-[11px] text-[#747E76]">
                  Manage or cancel your subscription anytime via the permanent Stripe Customer Portal:
                </p>
                <div className="pt-1">
                  <a
                    href={portalUrl}
                    className="text-[#285B49] font-medium underline inline-flex items-center gap-1"
                  >
                    Open Punt AI Membership Portal <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <p className="text-[11px] text-[#747E76]">
                Use the email address associated with your Stripe membership (<code>{email}</code>) whenever accessing billing.
              </p>
              <p>
                Welcome to Punt AI Premium,<br />
                <strong>The Punt AI Team</strong>
              </p>
            </div>
          </div>

          {/* Action Copy Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            <button
              onClick={() => copyToClipboard(connectUrl, 'link')}
              className="py-2 px-3 rounded-lg border border-[#E3E8E1] hover:bg-[#F5F6F2] text-[11px] font-semibold text-[#202923] flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#4B805D]" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedLink ? 'Copied Link!' : 'Copy Discord Link'}
            </button>

            <button
              onClick={() => copyToClipboard(portalUrl, 'portal')}
              className="py-2 px-3 rounded-lg border border-[#E3E8E1] hover:bg-[#F5F6F2] text-[11px] font-semibold text-[#202923] flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedPortal ? <Check className="w-3.5 h-3.5 text-[#4B805D]" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedPortal ? 'Copied Portal!' : 'Copy Portal URL'}
            </button>

            <button
              onClick={() => copyToClipboard(emailBodyText, 'email')}
              className="py-2 px-3 rounded-lg border border-[#E3E8E1] hover:bg-[#F5F6F2] text-[11px] font-semibold text-[#202923] flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#4B805D]" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedEmail ? 'Copied Body!' : 'Copy Entire Email'}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-[#747E76] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4B805D]" />
            <span>Low-cost transactional email architecture via Amazon SES. No Resend.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

