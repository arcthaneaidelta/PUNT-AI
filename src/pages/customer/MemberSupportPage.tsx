import React from 'react';
import { ArrowLeft, ShieldCheck, Mail, MessageSquare, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MemberSupportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F6F2] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#E3E8E1]">
          <Link
            to="/member/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17392F] hover:text-[#285B49]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <span className="text-xs text-[#747E76]">Community Support</span>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-[#E3E8E1] shadow-xs space-y-6 text-xs text-[#202923]">
          <div>
            <h2 className="text-2xl font-bold text-[#17392F]">Member Support & FAQs</h2>
            <p className="text-xs text-[#747E76] mt-1">
              Common questions regarding Stripe billing, Discord roles, and tipping access.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] space-y-1">
              <h4 className="font-bold text-sm text-[#17392F]">How long does it take for my Discord role to appear?</h4>
              <p className="text-xs text-[#747E76] leading-relaxed">
                As soon as you connect your Discord account via OAuth2 and confirm you are 18+, the Punt AI Bot assigns the @Premium role within 2 to 5 seconds.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] space-y-1">
              <h4 className="font-bold text-sm text-[#17392F]">What happens if I cancel my subscription?</h4>
              <p className="text-xs text-[#747E76] leading-relaxed">
                You retain full @Premium Discord access until the very end of your current paid billing period. The role is only removed after the paid-through date has passed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] space-y-1">
              <h4 className="font-bold text-sm text-[#17392F]">How do I update my payment card?</h4>
              <p className="text-xs text-[#747E76] leading-relaxed">
                Click "Manage Stripe Billing" from your member dashboard or use the #manage-membership channel in Discord to open the official Stripe Customer Portal.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] space-y-1">
              <h4 className="font-bold text-sm text-[#17392F]">I was an Instagram VIP member. How do I claim my Discord access?</h4>
              <p className="text-xs text-[#747E76] leading-relaxed">
                Visit the VIP Migration Portal with your personal claim token. Your existing subscription will be transferred without any new payment.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#EBEFE9] border border-[#E3E8E1] flex items-center justify-between">
            <div>
              <p className="font-bold text-xs text-[#17392F]">Still need help?</p>
              <p className="text-[11px] text-[#747E76]">Reach out directly in the Discord #membership-support channel.</p>
            </div>
            <a
              href="mailto:support@punt-ai.com.au"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#17392F] text-white hover:bg-[#285B49] transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

