import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import confetti from 'canvas-confetti';
import { InstagramIcon } from '../../components/common/InstagramIcon';
import {
  ArrowRightLeft,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

export const MigrationClaimPage: React.FC = () => {
  const { token: urlToken } = useParams<{ token?: string }>();
  const navigate = useNavigate();
  const { migrationRecords, claimMigration } = useDemoStore();

  const [inputToken, setInputToken] = useState(urlToken || 'DEMO-CLAIM-001');
  const [discordUsername, setDiscordUsername] = useState('marcus_vip_au');
  const [discordId, setDiscordId] = useState('849201948201948209');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [claimedSuccess, setClaimedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentRecord = migrationRecords.find(
    (r) => r.claimToken.toUpperCase() === inputToken.trim().toUpperCase()
  );

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRecord) {
      setErrorMsg('Invalid claim token. Please check your personal migration email.');
      return;
    }
    if (currentRecord.status === 'claimed') {
      setErrorMsg('This migration token has already been claimed.');
      return;
    }
    if (!ageConfirmed) {
      setErrorMsg('You must verify that you are 18 or older to proceed.');
      return;
    }

    setClaiming(true);
    await new Promise((r) => setTimeout(r, 800));

    const success = claimMigration(currentRecord.claimToken, discordUsername, discordId);
    setClaiming(false);

    if (success) {
      setClaimedSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    } else {
      setErrorMsg('Failed to process migration claim.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F2] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-[#E3E8E1] overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#17392F] px-8 py-6 text-white space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs uppercase tracking-wider">
            <InstagramIcon className="w-4 h-4" />
            <span>VIP Migration Portal</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            Move to Discord Without Paying Again
          </h2>
          <p className="text-xs text-[#A1B5A3]">
            Punt AI is moving its private Instagram group into our official Discord community.
          </p>
        </div>

        <div className="p-8 space-y-6 text-xs text-[#202923]">
          {/* Token Selector / Sample Tokens Helper */}
          <div className="p-3.5 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] space-y-2">
            <span className="text-[11px] font-semibold text-[#747E76]">
              Choose a test migration claim token:
            </span>
            <div className="flex flex-wrap gap-2">
              {migrationRecords.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => {
                    setInputToken(r.claimToken);
                    setErrorMsg('');
                    setClaimedSuccess(false);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold transition-all ${
                    inputToken === r.claimToken
                      ? 'bg-[#17392F] text-white shadow-xs'
                      : 'bg-white text-[#202923] border border-[#E3E8E1] hover:bg-[#EBEFE9]'
                  }`}
                >
                  {r.claimToken} ({r.instagramHandle})
                </button>
              ))}
            </div>
          </div>

          {claimedSuccess ? (
            <div className="space-y-6 text-center py-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-[#E0E9E0] text-[#285B49] flex items-center justify-center mx-auto ring-4 ring-[#E0E9E0]/50 shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-[#17392F]">
                  VIP Migration Completed!
                </h3>
                <p className="text-xs text-[#747E76] max-w-sm mx-auto">
                  Your existing <strong>{currentRecord?.plan.toUpperCase()}</strong> membership has been transferred into Discord without any new charge.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] text-left space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#E3E8E1]">
                  <span className="text-[#747E76]">Instagram Account:</span>
                  <span className="font-semibold text-[#202923]">{currentRecord?.instagramHandle}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E3E8E1]">
                  <span className="text-[#747E76]">Linked Discord:</span>
                  <span className="font-mono font-semibold text-[#285B49]">{discordUsername}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#747E76]">Role Status:</span>
                  <span className="font-bold text-[#4B805D] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> @Premium Active in Server
                  </span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  to="/member/dashboard"
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-[#17392F] hover:bg-[#285B49] text-white flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  Go to Member Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/admin/migration"
                  className="block text-center text-xs font-semibold text-[#285B49] hover:underline pt-1"
                >
                  View Migration Audit Log in Admin Console →
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleClaim} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-[#F9ECEB] border border-[#B75F58]/30 text-[#B75F58] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Token Input */}
              <div>
                <label className="block text-xs font-semibold text-[#202923] mb-1">
                  Personal Migration Claim Token
                </label>
                <input
                  type="text"
                  required
                  value={inputToken}
                  onChange={(e) => {
                    setInputToken(e.target.value);
                    setErrorMsg('');
                  }}
                  className="w-full px-3 py-2 text-xs font-mono font-bold rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
                />
              </div>

              {/* Detected Existing Account Info */}
              {currentRecord && (
                <div className="p-4 rounded-xl bg-[#EBEFE9] border border-[#E3E8E1] space-y-2">
                  <span className="text-[10px] font-bold text-[#747E76] uppercase tracking-wider">
                    Existing Record Found
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-[#747E76]">Instagram VIP:</span>
                      <p className="font-bold text-[#17392F]">{currentRecord.instagramHandle}</p>
                    </div>
                    <div>
                      <span className="text-[#747E76]">Existing Plan:</span>
                      <p className="font-bold text-[#285B49] capitalize">
                        {currentRecord.plan} {currentRecord.lifetime ? '(Lifetime Protected)' : ''}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#747E76]">Stripe Customer:</span>
                      <p className="font-mono text-[#202923]">{currentRecord.stripeCustomerId}</p>
                    </div>
                    <div>
                      <span className="text-[#747E76]">New Payment Required:</span>
                      <p className="font-bold text-[#4B805D]">$0.00 AUD (Transferred)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Discord Link details */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Your Discord Username
                  </label>
                  <input
                    type="text"
                    required
                    value={discordUsername}
                    onChange={(e) => setDiscordUsername(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#202923] mb-1">
                    Your Numerical Discord User ID
                  </label>
                  <input
                    type="text"
                    required
                    value={discordId}
                    onChange={(e) => setDiscordId(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-[#E3E8E1] focus:outline-none focus:border-[#285B49]"
                  />
                </div>

                {/* 18+ Checkbox */}
                <div className="p-3 rounded-lg border border-[#E3E8E1] bg-[#F5F6F2]">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ageConfirmed}
                      onChange={(e) => setAgeConfirmed(e.target.checked)}
                      className="mt-0.5 w-4 h-4 text-[#285B49] focus:ring-[#285B49] rounded cursor-pointer"
                    />
                    <span className="text-[11px] text-[#202923] font-medium leading-tight">
                      I confirm that I am 18 years of age or older and agree to Punt AI community rules.
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={claiming || !ageConfirmed}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#17392F] hover:bg-[#285B49] text-white flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-40"
              >
                {claiming ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Validating Claim & Assigning Role...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                    Claim Discord Premium Access (No Charge)
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#747E76] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4B805D]" />
                <span>One-time claim tokens prevent duplicate accounts or double charges.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
