import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@punt-ai.com.au');
  const [password, setPassword] = useState('••••••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/overview');
  };

  const handleEnterDemo = () => {
    navigate('/admin/overview');
  };

  return (
    <div className="min-h-screen bg-[#F5F6F2] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-[#E3E8E1] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
        {/* Left Side: Brand & Messaging */}
        <div className="md:col-span-5 bg-[#17392F] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#285B49] text-white font-bold flex items-center justify-center text-lg shadow-sm">
                P
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-white">
                  PUNT<span className="text-[#A1B5A3]">·AI</span>
                </span>
                <p className="text-[11px] text-[#A1B5A3]">Operations Platform</p>
              </div>
            </div>

            <div className="space-y-3 pt-6">
              <h2 className="text-2xl font-extrabold tracking-tight leading-snug">
                Your payments decide access.<br />
                Your Discord runs itself.<br />
                You stay in control.
              </h2>
              <p className="text-xs text-[#A1B5A3] leading-relaxed">
                Connect Stripe subscriptions to your 2,000-member Discord server with complete administrative ownership.
              </p>
            </div>
          </div>

          <div className="pt-8 z-10 text-[11px] text-[#A1B5A3] space-y-2 border-t border-white/10">
            <p className="flex items-center gap-1.5 text-white font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Role-Based Access Control
            </p>
            <p>Direct Stripe + Discord API • No middleman platforms</p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:col-span-7 p-8 sm:p-12 flex flex-col justify-between text-xs text-[#202923]">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-bold text-[#285B49] uppercase tracking-wider bg-[#E0E9E0] px-2.5 py-0.5 rounded-full">
                ADMIN CONSOLE
              </span>
              <h3 className="text-2xl font-bold text-[#17392F] tracking-tight mt-1">
                Sign in to Punt AI
              </h3>
              <p className="text-xs text-[#747E76] mt-0.5">
                Manage memberships, Stripe payment links and Discord bot automation.
              </p>
            </div>

            {/* Instant Demo Access Button (Prominently Highlighted as per PRD) */}
            <div className="p-4 rounded-xl bg-[#EBEFE9] border border-[#A1B5A3]/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#17392F] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#285B49] fill-current" />
                  Interactive Demonstration Workspace
                </span>
                <span className="text-[10px] font-bold text-[#285B49] bg-white px-1.5 py-0.5 rounded border border-[#E3E8E1]">
                  NO LOGIN NEEDED
                </span>
              </div>
              <p className="text-[11px] text-[#747E76]">
                Explore the complete administration suite with pre-seeded members, financial analytics, and real event simulation.
              </p>
              <button
                type="button"
                onClick={handleEnterDemo}
                className="w-full py-2.5 px-4 rounded-lg text-xs font-bold bg-[#17392F] hover:bg-[#285B49] text-white flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                Enter Demo Workspace
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-3.5 pt-2 border-t border-[#E3E8E1]">
              <div>
                <label className="block text-xs font-semibold text-[#202923] mb-1">
                  Administrator Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202923] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-1.5 text-[11px] text-[#747E76] cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-[#285B49]" />
                  <span>Remember me for 30 days</span>
                </label>
                <span className="text-[11px] text-[#285B49] hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-white border border-[#E3E8E1] hover:bg-[#F5F6F2] text-[#202923] transition-colors"
              >
                Sign In with Credentials
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-[#E3E8E1] flex items-center justify-between text-[11px] text-[#747E76]">
            <Link to="/" className="hover:text-[#17392F] hover:underline">
              ← Return to Public Website
            </Link>
            <span>Timezone: Australia/Sydney (AEST)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

