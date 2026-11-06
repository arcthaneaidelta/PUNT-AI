import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactName) return;
    setSubmitted(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 4000);
  };

  return (
    <footer className="bg-[#17392F] text-white pt-16 pb-12 border-t border-[#112C25]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-[#17392F] font-bold text-base flex items-center justify-center">
                P
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                PUNT<span className="text-[#A1B5A3]">·AI</span>
              </span>
            </div>
            <p className="text-sm text-[#A1B5A3] leading-relaxed max-w-sm">
              Custom-built automated membership infrastructure connecting Stripe checkout to Discord Premium roles. Built specifically for the Punt AI sports tipping community.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E0E9E0]/80">
              <ShieldCheck className="w-4 h-4 text-[#A1B5A3]" />
              <span>Direct Stripe + Discord API • No Whop • No revenue-split</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A1B5A3]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#E0E9E0]/90">
              <li><Link to="/#platform" className="hover:text-white transition-colors">Platform</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/migration/claim" className="hover:text-white transition-colors">Instagram Migration</Link></li>
              <li><Link to="/admin/overview" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Customer Portal Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A1B5A3]">
              Members
            </h4>
            <ul className="space-y-2 text-sm text-[#E0E9E0]/90">
              <li><Link to="/member/dashboard" className="hover:text-white transition-colors">Member Dashboard</Link></li>
              <li><Link to="/member/billing" className="hover:text-white transition-colors">Stripe Billing Portal</Link></li>
              <li><Link to="/connect-discord" className="hover:text-white transition-colors">Link Discord Account</Link></li>
              <li><Link to="/membership/manage" className="hover:text-white transition-colors">Manage Subscription</Link></li>
              <li><Link to="/member/support" className="hover:text-white transition-colors">Community Support</Link></li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#A1B5A3]">
              Have questions about membership automation?
            </h4>
            {submitted ? (
              <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#A1B5A3] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Inquiry received (Simulated)</p>
                  <p className="text-xs text-[#A1B5A3] mt-1">
                    Thank you! In production, this dispatches directly to the Punt AI management team via Amazon SES.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white/10 border border-white/15 placeholder:text-[#A1B5A3]/60 text-white focus:outline-none focus:border-[#A1B5A3]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white/10 border border-white/15 placeholder:text-[#A1B5A3]/60 text-white focus:outline-none focus:border-[#A1B5A3]"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Questions about Stripe setup or Discord roles?"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/10 border border-white/15 placeholder:text-[#A1B5A3]/60 text-white focus:outline-none focus:border-[#A1B5A3]"
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg bg-[#285B49] hover:bg-[#34755e] text-white transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Question (Simulated)
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A1B5A3] gap-4">
          <p>© {new Date().getFullYear()} Punt AI. All rights reserved. Australian Sports Tipping Community.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span className="text-[#E0E9E0] font-medium bg-white/10 px-2 py-0.5 rounded">
              Interactive demonstration • Stripe & Discord connections are simulated
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

