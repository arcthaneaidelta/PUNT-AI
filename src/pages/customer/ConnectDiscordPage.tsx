import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useDemoStore } from '../../store/demoStore';
import confetti from 'canvas-confetti';
import {
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  User,
  AlertCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const ConnectDiscordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { members, connectDiscord } = useDemoStore();

  const memberIdParam = searchParams.get('memberId') || 'mem_01';
  const targetMember = members.find((m) => m.id === memberIdParam) || members[0];

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [discordUsername, setDiscordUsername] = useState(
    targetMember.discordUsername || 'jordanmitch_au'
  );
  const [discordId, setDiscordId] = useState(
    targetMember.discordId || '849204918204918201'
  );
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [isLinking, setIsLinking] = useState(false);

  const handleAuthorizeOAuth = () => {
    setCurrentStep(3); // Go to 18+ verification step
  };

  const handleAgeConfirmNext = () => {
    if (!ageConfirmed) return;
    setCurrentStep(4); // Review
  };

  const handleFinalActivation = async () => {
    setIsLinking(true);
    await new Promise((r) => setTimeout(r, 900));

    // Connect Discord and trigger role assignment in store!
    connectDiscord(targetMember.id, discordUsername, discordId, true);

    setIsLinking(false);
    setCurrentStep(5);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F2] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-[#E3E8E1] overflow-hidden">
        {/* Top Header */}
        <div className="bg-[#17392F] px-8 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#285B49] flex items-center justify-center text-white">
              <MessageSquare className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Discord Account Linking</h2>
              <p className="text-[11px] text-[#A1B5A3]">Step {currentStep} of 5 • Punt AI Premium Community</p>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-[#E0E9E0]">
            OAuth2 Verified
          </span>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="w-full bg-[#E0E9E0] h-1.5">
          <div
            className="h-full bg-[#285B49] transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>

        <div className="p-8 text-xs text-[#202923]">
          {/* STEP 1: Introduction */}
          {currentStep === 1 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-3xl bg-[#5865F2]/10 text-[#5865F2] flex items-center justify-center mx-auto">
                <MessageSquare className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#17392F]">Connect Your Discord Account</h3>
                <p className="text-xs text-[#747E76] max-w-md mx-auto leading-relaxed">
                  Link your Discord identity to your verified Stripe customer record (
                  <code>{targetMember.email}</code>) to automatically receive your @Premium role.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] text-left space-y-2">
                <p className="font-semibold text-[#17392F] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#285B49]" />
                  What happens next:
                </p>
                <ul className="space-y-1.5 text-[#747E76] text-[11px]">
                  <li>• We securely identify your numerical Discord user ID via OAuth2</li>
                  <li>• You confirm you are 18+ for compliance standards</li>
                  <li>• Punt AI Bot assigns the @Premium role on the server immediately</li>
                </ul>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-[#5865F2] hover:bg-[#4752c4] text-white flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                Continue with Discord
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Simulated Discord OAuth Authorization Screen */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-[#313338] text-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-[#17392F] flex items-center justify-center text-white font-bold text-xs">
                      P
                    </div>
                    <span className="font-bold text-sm">Punt AI Bot Authorization</span>
                  </div>
                  <span className="text-[10px] text-gray-400">Discord OAuth2</span>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="text-gray-300">
                    <strong>Punt AI Membership</strong> would like to access your Discord account:
                  </p>
                  <div className="p-2.5 rounded bg-[#2b2d31] space-y-1 text-[11px] text-gray-300">
                    <p>✓ Access your username, avatar, and banner</p>
                    <p>✓ Access your permanent numerical Discord User ID</p>
                    <p>✓ Know what servers you're in</p>
                  </div>
                </div>

                {/* Account Selection */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <label className="block text-[11px] font-semibold text-gray-300">
                    Select Your Discord Identity
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={discordUsername}
                      onChange={(e) => setDiscordUsername(e.target.value)}
                      placeholder="Username (e.g. jordanmitch_au)"
                      className="px-3 py-1.5 rounded bg-[#1e1f22] border border-[#3f4147] text-white text-xs font-mono focus:outline-none focus:border-[#5865F2]"
                    />
                    <input
                      type="text"
                      value={discordId}
                      onChange={(e) => setDiscordId(e.target.value)}
                      placeholder="User ID (e.g. 8492049182...)"
                      className="px-3 py-1.5 rounded bg-[#1e1f22] border border-[#3f4147] text-white text-xs font-mono focus:outline-none focus:border-[#5865F2]"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400">
                    In production, this is captured automatically via Discord OAuth2 token exchange.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-xs text-[#747E76] hover:bg-[#F5F6F2] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAuthorizeOAuth}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#5865F2] hover:bg-[#4752c4] text-white transition-colors"
                >
                  Authorize Identity →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Mandatory 18+ Age Verification */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#E0E9E0] text-[#285B49] flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#17392F]">18+ Age Confirmation</h3>
                <p className="text-xs text-[#747E76] max-w-md mx-auto">
                  In accordance with Australian sports tipping and wagering compliance standards, you must confirm you are of legal age.
                </p>
              </div>

              <div className="p-4 rounded-xl border-2 border-[#A1B5A3]/50 bg-[#F5F6F2] space-y-3">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={ageConfirmed}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#285B49] focus:ring-[#285B49] border-[#E3E8E1] cursor-pointer"
                  />
                  <div>
                    <span className="font-bold text-xs text-[#17392F]">
                      I confirm that I am 18 years of age or older.
                    </span>
                    <p className="text-[11px] text-[#747E76] mt-0.5 leading-snug">
                      I understand that Punt AI provides sports tipping analytics and information, and I verify that all registration details are accurate.
                    </p>
                  </div>
                </label>
              </div>

              <div className="p-3 rounded-lg bg-[#EBEFE9] text-[11px] text-[#747E76]">
                🔒 <em>Audit record: Confirmation timestamp and account reference will be recorded in compliance logs.</em>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-3 py-2 text-xs text-[#747E76] hover:bg-[#F5F6F2] rounded-lg"
                >
                  Back
                </button>
                <button
                  onClick={handleAgeConfirmNext}
                  disabled={!ageConfirmed}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#17392F] hover:bg-[#285B49] text-white disabled:opacity-40 transition-all shadow-xs"
                >
                  Confirm & Review Summary →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review Membership Summary */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#17392F]">Review Membership Association</h3>
                <p className="text-xs text-[#747E76]">
                  Confirm the link between your Stripe purchase and Discord identity.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] space-y-3">
                <div className="grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <span className="text-[#747E76]">Stripe Customer Email:</span>
                    <p className="font-semibold text-[#202923]">{targetMember.email}</p>
                  </div>
                  <div>
                    <span className="text-[#747E76]">Purchased Plan:</span>
                    <p className="font-semibold text-[#17392F] capitalize">
                      {targetMember.membershipType} Premium (A${targetMember.amount})
                    </p>
                  </div>
                  <div>
                    <span className="text-[#747E76]">Discord Username:</span>
                    <p className="font-mono font-semibold text-[#202923]">{discordUsername}</p>
                  </div>
                  <div>
                    <span className="text-[#747E76]">Permanent Discord ID:</span>
                    <p className="font-mono text-[#202923]">{discordId}</p>
                  </div>
                  <div>
                    <span className="text-[#747E76]">18+ Status:</span>
                    <p className="font-bold text-[#4B805D] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </p>
                  </div>
                  <div>
                    <span className="text-[#747E76]">Role to Assign:</span>
                    <p className="font-semibold text-[#285B49]">@Premium</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleFinalActivation}
                disabled={isLinking}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-[#17392F] hover:bg-[#285B49] text-white flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
              >
                {isLinking ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Punt AI Bot assigning @Premium role...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    Activate Discord Access Now
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 5: Congratulations / Connected Screen */}
          {currentStep === 5 && (
            <div className="space-y-6 text-center py-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-[#E0E9E0] text-[#285B49] flex items-center justify-center mx-auto ring-4 ring-[#E0E9E0]/50 shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-[#17392F]">Your Accounts Are Connected!</h3>
                <p className="text-xs text-[#747E76] max-w-sm mx-auto">
                  Welcome to Punt AI Premium. The Punt AI Bot has assigned your <strong>@Premium role</strong> on the Discord server.
                </p>
              </div>

              {/* Status pill summary */}
              <div className="p-4 rounded-xl bg-[#F5F6F2] border border-[#E3E8E1] space-y-2 text-left text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#E3E8E1]">
                  <span className="text-[#747E76]">Discord Role:</span>
                  <span className="font-bold text-[#4B805D] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> @Premium Role Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#747E76]">Target Server:</span>
                  <span className="font-semibold text-[#202923]">Punt AI (~2,000 members)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#747E76]">Unlocked Channels:</span>
                  <span className="font-mono text-[#285B49] text-[11px]">#premium-tipping, #premium-picks</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  to="/member/dashboard"
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-[#17392F] hover:bg-[#285B49] text-white flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  Continue to Member Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/admin/discord"
                  className="block text-center text-xs font-semibold text-[#285B49] hover:underline pt-2"
                >
                  View Server Role Status in Admin Console →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

