import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertOctagon,
  RefreshCw,
  Shield,
  Ban,
  ChevronDown,
  ArrowRight
} from 'lucide-react';

export const LifecycleSection: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(0);

  const scenarios = [
    {
      id: 1,
      title: 'Successful Payment',
      badge: 'Premium Activated',
      badgeClass: 'bg-[#E0E9E0] text-[#285B49]',
      icon: CheckCircle2,
      summary: 'Verified checkout or invoice payment triggers instant @Premium role assignment in Discord.',
      stripeEvent: 'checkout.session.completed / invoice.paid',
      engineAction: 'Resolve Price ID, associate Discord OAuth ID, store 18+ audit record.',
      discordAction: 'Punt AI Bot calls guilds.members.addRole(@Premium). Welcome ping sent.',
      result: 'Member gets immediate access to #premium-tipping channels.'
    },
    {
      id: 2,
      title: 'Subscription Renewal',
      badge: 'Period Extended',
      badgeClass: 'bg-[#E0E9E0] text-[#285B49]',
      icon: RefreshCw,
      summary: 'Recurring weekly or monthly invoice extends paid period with zero disruption.',
      stripeEvent: 'invoice.paid (recurring)',
      engineAction: 'Update currentPeriodEnd +1 cycle in database. Transaction recorded in AUD.',
      discordAction: 'Discord @Premium role verified as active.',
      result: 'Continuous uninterrupted community access for the subscriber.'
    },
    {
      id: 3,
      title: 'Subscription Cancellation',
      badge: 'Access Until Period Ends',
      badgeClass: 'bg-[#FDF3E3] text-[#B68B4D]',
      icon: Clock,
      summary: 'Cancellation is recorded immediately, but the Premium role remains until the paid period expires.',
      stripeEvent: 'customer.subscription.updated (cancel_at_period_end)',
      engineAction: 'Set status=cancellation_scheduled. DO NOT revoke role prematurely.',
      discordAction: 'Role remains ACTIVE. Member keeps full access through paid days.',
      result: 'No early revocation. Fair treatment builds member goodwill.'
    },
    {
      id: 4,
      title: 'Paid Period Expired',
      badge: 'Access Revoked',
      badgeClass: 'bg-[#F9ECEB] text-[#B75F58]',
      icon: Ban,
      summary: 'When the paid-through date passes without renewal, the Discord role is automatically revoked.',
      stripeEvent: 'customer.subscription.deleted',
      engineAction: 'Verify member is not lifetime protected. Mark status=expired.',
      discordAction: 'Punt AI Bot calls guilds.members.removeRole(@Premium).',
      result: 'Member gracefully returned to free community chat channels.'
    },
    {
      id: 5,
      title: 'Refund or Chargeback',
      badge: 'Immediate Revocation',
      badgeClass: 'bg-[#F9ECEB] text-[#B75F58]',
      icon: AlertOctagon,
      summary: 'Confirmed full refund or bank chargeback triggers immediate Premium role removal.',
      stripeEvent: 'charge.refunded / charge.dispute.created',
      engineAction: 'Immediate revocation policy enforced. Account flagged for admin review.',
      discordAction: 'Punt AI Bot removes @Premium role within seconds.',
      result: 'Zero unauthorized lingering access for disputed accounts.'
    },
    {
      id: 6,
      title: 'Lifetime Membership',
      badge: 'Protected Permanent',
      badgeClass: 'bg-[#EAE2D6] text-[#785929]',
      icon: Shield,
      summary: 'Lifetime members retain permanent Premium access and are excluded from recurring expiration workers.',
      stripeEvent: 'checkout.session.completed (A$1,499 Price ID)',
      engineAction: 'Flag account lifetime=true. Hardcoded bypass in expiration scheduler.',
      discordAction: 'Permanent @Premium role locked on Discord member.',
      result: 'Guaranteed lifetime access protection with zero risk of accidental lockout.'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-[#E3E8E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#285B49] tracking-wider uppercase bg-[#E0E9E0] px-3 py-1 rounded-full border border-[#A1B5A3]/40">
            LIFECYCLE INTELLIGENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17392F] tracking-tight">
            Every membership event handled correctly.
          </h2>
          <p className="text-sm text-[#747E76]">
            Click any scenario to see how Stripe webhooks, the membership engine, and Discord interact.
          </p>
        </div>

        {/* 6 Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((sc, idx) => {
            const Icon = sc.icon;
            const isExpanded = expandedCard === idx;
            return (
              <div
                key={sc.id}
                onClick={() => setExpandedCard(isExpanded ? null : idx)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isExpanded
                    ? 'bg-[#F5F6F2] border-[#285B49] shadow-md ring-1 ring-[#285B49]'
                    : 'bg-white hover:bg-[#F5F6F2] border-[#E3E8E1] shadow-xs'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${sc.badgeClass}`}>
                      {sc.badge}
                    </span>
                    <Icon className="w-5 h-5 text-[#285B49]" />
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-[#17392F]">{sc.title}</h3>
                    <p className="text-xs text-[#747E76] mt-1 leading-relaxed">
                      {sc.summary}
                    </p>
                  </div>

                  {/* Expanded Timeline View */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-[#E3E8E1] space-y-2.5 text-xs animate-in fade-in duration-150">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#747E76]">1. Stripe Webhook</span>
                        <p className="font-mono text-[11px] text-[#202923] bg-white px-2 py-1 rounded border border-[#E3E8E1] mt-0.5">
                          {sc.stripeEvent}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#747E76]">2. Membership Engine</span>
                        <p className="text-[#202923] text-[11px] mt-0.5">{sc.engineAction}</p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#747E76]">3. Discord Bot Action</span>
                        <p className="text-[#285B49] font-semibold text-[11px] mt-0.5">{sc.discordAction}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between text-[11px] font-semibold text-[#285B49]">
                  <span>{isExpanded ? 'Hide Details' : 'View Event Flow'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

