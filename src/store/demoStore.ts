import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  Member,
  Payment,
  PaymentLink,
  AutomationRule,
  ActivityEvent,
  ReconciliationIssue,
  MigrationClaimRecord,
  SimulationStep
} from '../types';
import { INITIAL_MEMBERS } from '../data/seedMembers';
import { INITIAL_PAYMENTS } from '../data/seedPayments';
import { INITIAL_PAYMENT_LINKS } from '../data/seedPaymentLinks';
import { INITIAL_AUTOMATIONS } from '../data/seedAutomations';
import { INITIAL_ACTIVITIES } from '../data/seedActivities';
import { INITIAL_RECONCILIATION_ISSUES } from '../data/seedReconciliation';
import { INITIAL_MIGRATION_RECORDS } from '../data/seedMigration';

export interface SimulationResult {
  title: string;
  stripeEvent: string;
  member: string;
  plan: string;
  previousStatus: string;
  newStatus: string;
  discordAction: string;
  result: 'success' | 'warning' | 'error';
  steps: SimulationStep[];
}

interface DemoState {
  members: Member[];
  payments: Payment[];
  paymentLinks: PaymentLink[];
  automations: AutomationRule[];
  activities: ActivityEvent[];
  reconciliationIssues: ReconciliationIssue[];
  migrationRecords: MigrationClaimRecord[];
  activeMemberId: string; // Active viewing member for customer portal
  isReconciling: boolean;
  lastReconciledAt: string;

  // Actions
  setActiveMemberId: (id: string) => void;
  addMember: (member: Member) => void;
  updateMember: (id: string, updates: Partial<Member>) => void;
  addPaymentLink: (link: PaymentLink) => void;
  updatePaymentLink: (id: string, updates: Partial<PaymentLink>) => void;
  toggleAutomationRule: (id: string) => void;
  addActivity: (activity: Omit<ActivityEvent, 'id' | 'timestamp'>) => void;
  addPayment: (payment: Payment) => void;
  
  // High-fidelity workflows
  manualRoleOverride: (memberId: string, grant: boolean, reason: string, adminUser?: string) => void;
  scheduleCancellation: (memberId: string) => void;
  connectDiscord: (memberId: string, discordUsername: string, discordId: string, ageConfirmed: boolean) => void;
  runReconciliationSimulation: () => Promise<void>;
  fixReconciliationIssue: (issueId: string) => void;
  fixAllSafeReconciliationIssues: () => void;
  claimMigration: (token: string, discordUsername: string, discordId: string) => boolean;
  simulateEvent: (memberId: string, eventType: string) => Promise<SimulationResult>;
  resetDemoData: () => void;
}

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      members: INITIAL_MEMBERS,
      payments: INITIAL_PAYMENTS,
      paymentLinks: INITIAL_PAYMENT_LINKS,
      automations: INITIAL_AUTOMATIONS,
      activities: INITIAL_ACTIVITIES,
      reconciliationIssues: INITIAL_RECONCILIATION_ISSUES,
      migrationRecords: INITIAL_MIGRATION_RECORDS,
      activeMemberId: 'mem_01',
      isReconciling: false,
      lastReconciledAt: '2026-11-04 04:00',

      setActiveMemberId: (id) => set({ activeMemberId: id }),

      addMember: (newMember) =>
        set((state) => ({ members: [newMember, ...state.members] })),

      updateMember: (id, updates) =>
        set((state) => ({
          members: state.members.map((m) => (m.id === id ? { ...m, ...updates } : m))
        })),

      addPaymentLink: (link) =>
        set((state) => ({
          paymentLinks: [link, ...state.paymentLinks]
        })),

      updatePaymentLink: (id, updates) =>
        set((state) => ({
          paymentLinks: state.paymentLinks.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          )
        })),

      toggleAutomationRule: (id) =>
        set((state) => ({
          automations: state.automations.map((a) =>
            a.id === id
              ? {
                  ...a,
                  enabled: !a.enabled,
                  status: !a.enabled ? 'operational' : 'paused'
                }
              : a
          )
        })),

      addActivity: (activity) =>
        set((state) => ({
          activities: [
            {
              ...activity,
              id: `act_${Date.now()}`,
              timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
            },
            ...state.activities
          ]
        })),

      addPayment: (payment) =>
        set((state) => ({
          payments: [payment, ...state.payments]
        })),

      manualRoleOverride: (memberId, grant, reason, adminUser = 'Jack (Admin)') => {
        const member = get().members.find((m) => m.id === memberId);
        if (!member) return;

        const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
        const newRoleStatus = grant ? 'active' : 'removed';

        const updatedTimeline = [
          {
            id: `tl_${Date.now()}`,
            timestamp: now,
            event: grant ? 'Manual Role Grant Override' : 'Manual Role Revocation Override',
            details: `Admin ${adminUser} manually ${grant ? 'granted' : 'revoked'} Discord @Premium role. Reason: ${reason}. Stripe subscription unaffected.`,
            source: 'admin' as const
          },
          ...member.timeline
        ];

        set((state) => ({
          members: state.members.map((m) =>
            m.id === memberId ? { ...m, roleStatus: newRoleStatus, timeline: updatedTimeline } : m
          ),
          activities: [
            {
              id: `act_${Date.now()}`,
              timestamp: now,
              category: 'admin',
              memberId,
              memberName: member.name,
              title: grant ? 'Manual Role Granted' : 'Manual Role Revoked',
              description: `Admin override by ${adminUser}: ${reason}`,
              result: 'warning',
              referenceId: `admin_override_${Date.now()}`,
              adminUser
            },
            ...state.activities
          ]
        }));
      },

      scheduleCancellation: (memberId) => {
        const member = get().members.find((m) => m.id === memberId);
        if (!member) return;

        const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
        const updatedTimeline = [
          {
            id: `tl_${Date.now()}`,
            timestamp: now,
            event: 'Cancellation Scheduled',
            details: `Customer requested cancellation. Role remains active until current paid period ends on ${member.currentPeriodEnd.substring(0, 10)}.`,
            source: 'system' as const
          },
          ...member.timeline
        ];

        set((state) => ({
          members: state.members.map((m) =>
            m.id === memberId
              ? {
                  ...m,
                  membershipStatus: 'cancellation_scheduled',
                  timeline: updatedTimeline
                }
              : m
          ),
          activities: [
            {
              id: `act_${Date.now()}`,
              timestamp: now,
              category: 'membership',
              memberId,
              memberName: member.name,
              title: 'Cancellation Scheduled',
              description: `Access maintained until paid-through date ${member.currentPeriodEnd.substring(0, 10)}.`,
              result: 'info',
              referenceId: member.subscriptionId
            },
            ...state.activities
          ]
        }));
      },

      connectDiscord: (memberId, discordUsername, discordId, ageConfirmed) => {
        const member = get().members.find((m) => m.id === memberId);
        if (!member) return;

        const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
        const updatedTimeline = [
          {
            id: `tl_${Date.now()}_1`,
            timestamp: now,
            event: 'Discord OAuth Connected',
            details: `Linked Discord identity: ${discordUsername} (${discordId}) via OAuth2`,
            source: 'discord' as const
          },
          {
            id: `tl_${Date.now()}_2`,
            timestamp: now,
            event: '18+ Verified & Role Assigned',
            details: `Age confirmation verified. Discord bot assigned @Premium role.`,
            source: 'system' as const
          },
          ...member.timeline
        ];

        set((state) => ({
          members: state.members.map((m) =>
            m.id === memberId
              ? {
                  ...m,
                  discordUsername,
                  discordId,
                  linked: true,
                  ageConfirmed,
                  ageConfirmedAt: new Date().toISOString(),
                  membershipStatus: m.membershipStatus === 'unlinked' ? 'active' : m.membershipStatus,
                  roleStatus: 'active',
                  timeline: updatedTimeline
                }
              : m
          ),
          // Resolve any unlinked reconciliation issue if present
          reconciliationIssues: state.reconciliationIssues.map((issue) =>
            issue.memberId === memberId ? { ...issue, resolved: true } : issue
          ),
          activities: [
            {
              id: `act_${Date.now()}`,
              timestamp: now,
              category: 'discord',
              memberId,
              memberName: member.name,
              title: 'Discord Account Linked & Role Assigned',
              description: `Linked ${discordUsername} to Stripe ${member.stripeCustomerId}. @Premium assigned.`,
              result: 'success',
              referenceId: discordId
            },
            ...state.activities
          ]
        }));
      },

      runReconciliationSimulation: async () => {
        set({ isReconciling: true });
        // Simulate step progression
        await new Promise((resolve) => setTimeout(resolve, 800));

        const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
        set((state) => ({
          isReconciling: false,
          lastReconciledAt: now,
          activities: [
            {
              id: `act_${Date.now()}`,
              timestamp: now,
              category: 'reconciliation',
              title: 'Reconciliation Run Completed',
              description: `Evaluated ${state.members.length} member records against live Discord roles. Found discrepancies ready for safe resolution.`,
              result: 'warning',
              referenceId: `rec_run_${Date.now()}`
            },
            ...state.activities
          ]
        }));
      },

      fixReconciliationIssue: (issueId) => {
        const issue = get().reconciliationIssues.find((i) => i.id === issueId);
        if (!issue) return;

        const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

        // Update member role status according to issue type
        set((state) => {
          let updatedMembers = state.members;
          if (issue.type === 'missing_role') {
            updatedMembers = state.members.map((m) =>
              m.id === issue.memberId
                ? {
                    ...m,
                    roleStatus: 'active',
                    timeline: [
                      {
                        id: `tl_${Date.now()}`,
                        timestamp: now,
                        event: 'Reconciliation: Role Assigned',
                        details: 'Reconciliation worker detected active Stripe subscription and restored @Premium role',
                        source: 'discord'
                      },
                      ...m.timeline
                    ]
                  }
                : m
            );
          } else if (issue.type === 'unexpected_role') {
            updatedMembers = state.members.map((m) =>
              m.id === issue.memberId
                ? {
                    ...m,
                    roleStatus: 'removed',
                    timeline: [
                      {
                        id: `tl_${Date.now()}`,
                        timestamp: now,
                        event: 'Reconciliation: Role Revoked',
                        details: 'Reconciliation worker detected expired subscription and removed lingering @Premium role',
                        source: 'discord'
                      },
                      ...m.timeline
                    ]
                  }
                : m
            );
          }

          return {
            members: updatedMembers,
            reconciliationIssues: state.reconciliationIssues.map((i) =>
              i.id === issueId ? { ...i, resolved: true } : i
            ),
            activities: [
              {
                id: `act_${Date.now()}`,
                timestamp: now,
                category: 'reconciliation',
                memberId: issue.memberId,
                memberName: issue.memberName,
                title: 'Reconciliation Correction Applied',
                description: `Fixed ${issue.type} for ${issue.memberName}. Corrected live Discord state.`,
                result: 'success',
                referenceId: issue.id
              },
              ...state.activities
            ]
          };
        });
      },

      fixAllSafeReconciliationIssues: () => {
        const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
        set((state) => {
          const safeIssueIds = new Set(
            state.reconciliationIssues.filter((i) => i.isSafeToAutoFix && !i.resolved).map((i) => i.id)
          );

          const updatedMembers = state.members.map((m) => {
            const relatedIssue = state.reconciliationIssues.find(
              (i) => i.memberId === m.id && safeIssueIds.has(i.id)
            );
            if (!relatedIssue) return m;

            if (relatedIssue.type === 'missing_role') {
              return {
                ...m,
                roleStatus: 'active' as const,
                timeline: [
                  {
                    id: `tl_${Date.now()}_${m.id}`,
                    timestamp: now,
                    event: 'Reconciliation: Role Restored',
                    details: 'Automated batch reconciliation restored missing @Premium role in Discord.',
                    source: 'discord' as const
                  },
                  ...m.timeline
                ]
              };
            } else if (relatedIssue.type === 'unexpected_role') {
              return {
                ...m,
                roleStatus: 'removed' as const,
                timeline: [
                  {
                    id: `tl_${Date.now()}_${m.id}`,
                    timestamp: now,
                    event: 'Reconciliation: Lingering Role Removed',
                    details: 'Automated batch reconciliation removed stale @Premium role for expired subscription.',
                    source: 'discord' as const
                  },
                  ...m.timeline
                ]
              };
            }
            return m;
          });

          return {
            members: updatedMembers,
            reconciliationIssues: state.reconciliationIssues.map((i) =>
              i.isSafeToAutoFix ? { ...i, resolved: true } : i
            ),
            activities: [
              {
                id: `act_${Date.now()}`,
                timestamp: now,
                category: 'reconciliation',
                title: 'All Safe Mismatches Corrected',
                description: `Applied ${safeIssueIds.size} automated safe role corrections across Discord and Stripe.`,
                result: 'success',
                referenceId: `batch_fix_${Date.now()}`
              },
              ...state.activities
            ]
          };
        });
      },

      claimMigration: (token, discordUsername, discordId) => {
        const record = get().migrationRecords.find((r) => r.claimToken === token);
        if (!record || record.status === 'claimed') return false;

        const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

        // Create new member or link existing
        const newMember: Member = {
          id: `mem_mig_${Date.now()}`,
          name: record.instagramHandle.replace('@', '').replace(/_/g, ' '),
          email: record.email,
          discordId,
          discordUsername,
          stripeCustomerId: record.stripeCustomerId,
          subscriptionId: `sub_mig_${Date.now()}`,
          membershipType: record.plan,
          membershipStatus: 'active',
          roleStatus: 'active',
          amount: record.plan === 'weekly' ? 37 : record.plan === 'monthly' ? 99 : 1499,
          currency: 'AUD',
          billingInterval: record.plan === 'weekly' ? 'week' : record.plan === 'monthly' ? 'month' : 'lifetime',
          joinedAt: now,
          currentPeriodEnd: record.lifetime ? '2099-12-31' : '2026-12-01',
          lifetime: record.lifetime,
          linked: true,
          ageConfirmed: true,
          ageConfirmedAt: now,
          notes: `Migrated from Instagram Premium (${record.instagramHandle}). No double charge.`,
          timeline: [
            {
              id: `tl_mig_${Date.now()}`,
              timestamp: now,
              event: 'Instagram VIP Migrated',
              details: `Claimed via personal token ${token}. Linked Discord ${discordUsername} (${discordId}).`,
              source: 'system'
            },
            {
              id: `tl_mig_role_${Date.now()}`,
              timestamp: now,
              event: 'Premium Role Granted',
              details: 'Discord Bot granted @Premium role without requiring payment.',
              source: 'discord'
            }
          ]
        };

        set((state) => ({
          members: [newMember, ...state.members],
          migrationRecords: state.migrationRecords.map((r) =>
            r.claimToken === token
              ? {
                  ...r,
                  status: 'claimed',
                  discordUsername,
                  discordId,
                  claimedAt: now
                }
              : r
          ),
          activities: [
            {
              id: `act_${Date.now()}`,
              timestamp: now,
              category: 'migration',
              memberId: newMember.id,
              memberName: newMember.name,
              title: 'Instagram Member Claimed Discord Access',
              description: `${record.instagramHandle} claimed token ${token}. Existing ${record.plan} access activated.`,
              result: 'success',
              referenceId: token
            },
            ...state.activities
          ]
        }));

        return true;
      },

      simulateEvent: async (memberId, eventType) => {
        const member = get().members.find((m) => m.id === memberId);
        if (!member) {
          throw new Error('Member not found');
        }

        const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
        let title = '';
        let stripeEvent = '';
        let previousStatus = member.membershipStatus;
        let newStatus: Member['membershipStatus'] = member.membershipStatus;
        let discordAction = '';
        let newRoleStatus: Member['roleStatus'] = member.roleStatus;
        let newAmount = member.amount;
        let newPlan = member.membershipType;
        let resultType: 'success' | 'warning' | 'error' = 'success';
        const steps: SimulationStep[] = [];

        switch (eventType) {
          case 'weekly_payment':
            title = 'Successful Weekly Payment Verified';
            stripeEvent = 'checkout.session.completed';
            newStatus = 'active';
            newRoleStatus = 'active';
            newPlan = 'weekly';
            newAmount = 37;
            discordAction = 'Assign or verify @Premium role in Discord';
            steps.push(
              { step: 1, title: 'Stripe Webhook Received', description: 'checkout.session.completed verified with HMAC signature', status: 'completed', system: 'stripe' },
              { step: 2, title: 'Price ID Resolved', description: 'Mapped price_1N982xWeekly37AUD to Premium Weekly ($37/wk)', status: 'completed', system: 'membership_engine' },
              { step: 3, title: 'Discord Identity Verified', description: `Resolved linked user ID ${member.discordId || 'OAuth2'}`, status: 'completed', system: 'membership_engine' },
              { step: 4, title: 'Role Granted', description: 'Discord bot assigned @Premium role successfully', status: 'completed', system: 'discord' }
            );
            break;

          case 'monthly_payment':
            title = 'Successful Monthly Payment Verified';
            stripeEvent = 'checkout.session.completed';
            newStatus = 'active';
            newRoleStatus = 'active';
            newPlan = 'monthly';
            newAmount = 99;
            discordAction = 'Assign or verify @Premium role in Discord';
            steps.push(
              { step: 1, title: 'Stripe Webhook Received', description: 'checkout.session.completed verified with HMAC signature', status: 'completed', system: 'stripe' },
              { step: 2, title: 'Price ID Resolved', description: 'Mapped price_1N983xMonthly99AUD to Premium Monthly ($99/mo)', status: 'completed', system: 'membership_engine' },
              { step: 3, title: 'Discord Identity Verified', description: `Resolved linked user ID ${member.discordId || 'OAuth2'}`, status: 'completed', system: 'membership_engine' },
              { step: 4, title: 'Role Granted', description: 'Discord bot assigned @Premium role successfully', status: 'completed', system: 'discord' }
            );
            break;

          case 'lifetime_purchase':
            title = 'Lifetime Membership Purchase';
            stripeEvent = 'checkout.session.completed';
            newStatus = 'active';
            newRoleStatus = 'active';
            newPlan = 'lifetime';
            newAmount = 1499;
            discordAction = 'Permanent @Premium role locked. Lifetime protection flag active.';
            steps.push(
              { step: 1, title: 'Stripe Webhook Received', description: 'One-time payment of A$1,499.00 AUD verified', status: 'completed', system: 'stripe' },
              { step: 2, title: 'Lifetime Protection Flagged', description: 'Set lifetime=true. Bypasses all recurring expiration cron jobs.', status: 'completed', system: 'membership_engine' },
              { step: 3, title: 'Permanent Role Granted', description: 'Discord bot confirmed permanent @Premium status', status: 'completed', system: 'discord' },
              { step: 4, title: 'Welcome Package Sent', description: 'Amazon SES dispatched VIP founding member email', status: 'completed', system: 'email' }
            );
            break;

          case 'subscription_renewal':
            title = 'Subscription Renewed Successfully';
            stripeEvent = 'invoice.paid';
            newStatus = 'active';
            newRoleStatus = 'active';
            discordAction = 'Discord @Premium role verified and extended';
            steps.push(
              { step: 1, title: 'Recurring Invoice Paid', description: `invoice.paid for A$${member.amount}.00 AUD received`, status: 'completed', system: 'stripe' },
              { step: 2, title: 'Billing Period Extended', description: 'currentPeriodEnd moved +1 cycle in database', status: 'completed', system: 'membership_engine' },
              { step: 3, title: 'Discord Role Confirmed', description: '@Premium role verified as active on Discord guild', status: 'completed', system: 'discord' }
            );
            break;

          case 'cancellation_requested':
            title = 'Cancellation Scheduled (Access Retained)';
            stripeEvent = 'customer.subscription.updated (cancel_at_period_end=true)';
            newStatus = 'cancellation_scheduled';
            newRoleStatus = 'active'; // Critical PRD rule: DO NOT remove role immediately!
            discordAction = 'Role remains ACTIVE until paid period expires';
            resultType = 'warning';
            steps.push(
              { step: 1, title: 'Stripe Webhook Received', description: 'customer.subscription.updated with cancel_at_period_end: true', status: 'completed', system: 'stripe' },
              { step: 2, title: 'Grace Period Enforced', description: `Paid-through date ${member.currentPeriodEnd.substring(0, 10)} preserved. NO IMMEDIATE ROLE REMOVAL.`, status: 'completed', system: 'membership_engine' },
              { step: 3, title: 'Discord Role Untouched', description: 'Member keeps full Premium Discord channel access until billing period ends', status: 'completed', system: 'discord' },
              { step: 4, title: 'Customer Notified', description: 'Email sent confirming cancellation date and remaining access', status: 'completed', system: 'email' }
            );
            break;

          case 'subscription_expired':
            title = 'Paid Period Expired — Role Revoked';
            stripeEvent = 'customer.subscription.deleted';
            newStatus = 'expired';
            newRoleStatus = 'removed';
            discordAction = 'Punt AI Bot revoked @Premium role from Discord member';
            resultType = 'error';
            steps.push(
              { step: 1, title: 'Period End Reached', description: 'Subscription period expired without renewal payment', status: 'completed', system: 'stripe' },
              { step: 2, title: 'Lifetime Check', description: member.lifetime ? 'PROTECTED: Lifetime member cannot be expired!' : 'Verified not lifetime. Eligible for revocation.', status: 'completed', system: 'membership_engine' },
              { step: 3, title: 'Discord Role Removed', description: member.lifetime ? 'Role preserved' : 'Discord bot API call: guilds.members.removeRole(@Premium)', status: 'completed', system: 'discord' }
            );
            if (member.lifetime) {
              newStatus = 'active';
              newRoleStatus = 'active';
              resultType = 'success';
              discordAction = 'PROTECTED: Lifetime membership cannot expire!';
            }
            break;

          case 'full_refund':
            title = 'Full Refund Processed — Immediate Access Revocation';
            stripeEvent = 'charge.refunded';
            newStatus = 'refunded';
            newRoleStatus = 'removed';
            discordAction = 'Immediate @Premium role revocation in Discord';
            resultType = 'error';
            steps.push(
              { step: 1, title: 'Refund Webhook Received', description: `charge.refunded: Full refund of A$${member.amount}.00 AUD processed`, status: 'completed', system: 'stripe' },
              { step: 2, title: 'Policy Engine Triggered', description: 'Full refund rule requires immediate access termination', status: 'completed', system: 'membership_engine' },
              { step: 3, title: 'Immediate Discord Revocation', description: 'Discord bot API: @Premium role removed with reason "Refunded"', status: 'completed', system: 'discord' }
            );
            break;

          case 'partial_refund':
            title = 'Partial Refund Issued — Role Retained (Flagged)';
            stripeEvent = 'charge.refunded (amount < total)';
            newStatus = member.membershipStatus;
            newRoleStatus = member.roleStatus;
            discordAction = 'Role RETAINED. Event flagged for administrator review.';
            resultType = 'warning';
            steps.push(
              { step: 1, title: 'Partial Refund Detected', description: 'Goodwill partial adjustment processed on Stripe charge', status: 'completed', system: 'stripe' },
              { step: 2, title: 'Protection Rule Evaluated', description: 'Partial refund policy: DO NOT revoke role automatically. Flag for review.', status: 'completed', system: 'membership_engine' },
              { step: 3, title: 'Discord Role Intact', description: '@Premium role remains untouched in Discord', status: 'completed', system: 'discord' }
            );
            break;

          case 'chargeback':
            title = 'Dispute / Chargeback Detected — Immediate Revocation';
            stripeEvent = 'charge.dispute.created';
            newStatus = 'chargeback';
            newRoleStatus = 'removed';
            discordAction = 'Immediate @Premium role revocation. Security alert flagged.';
            resultType = 'error';
            steps.push(
              { step: 1, title: 'Bank Dispute Received', description: 'charge.dispute.created incoming from acquiring bank', status: 'completed', system: 'stripe' },
              { step: 2, title: 'Immediate Access Revocation', description: 'Chargeback policy: revoke access immediately and flag account for investigation', status: 'completed', system: 'membership_engine' },
              { step: 3, title: 'Discord Bot Revokes Role', description: '@Premium role removed from user on Discord server', status: 'completed', system: 'discord' },
              { step: 4, title: 'Admin Alert Dispatched', description: 'Security notification delivered to admin team', status: 'completed', system: 'email' }
            );
            break;

          case 'temp_payment_failure':
            title = 'Temporary Payment Failure — 3-Day Grace Period';
            stripeEvent = 'invoice.payment_failed (attempt 1)';
            newStatus = 'past_due';
            newRoleStatus = 'active'; // Grace period: keeps role!
            discordAction = 'Role RETAINED during 3-day grace period. Smart Retries scheduled.';
            resultType = 'warning';
            steps.push(
              { step: 1, title: 'Invoice Charge Failed', description: 'Stripe returned card_declined on subscription renewal attempt', status: 'completed', system: 'stripe' },
              { step: 2, title: 'Grace Period Enforced', description: 'Configured 3-day grace period applied. Customer kept active.', status: 'completed', system: 'membership_engine' },
              { step: 3, title: 'Discord Role Kept', description: 'Member continues accessing Discord tipping channels uninterrupted', status: 'completed', system: 'discord' },
              { step: 4, title: 'Payment Update Email', description: 'Dispatched automated Stripe Customer Portal link to update card', status: 'completed', system: 'email' }
            );
            break;

          case 'final_payment_failure':
            title = 'Final Payment Failure — Grace Period Expired';
            stripeEvent = 'invoice.payment_failed (retries exhausted)';
            newStatus = 'past_due';
            newRoleStatus = 'removed';
            discordAction = 'Punt AI Bot revoked @Premium role after exhausted retries';
            resultType = 'error';
            steps.push(
              { step: 1, title: 'Final Retries Failed', description: 'All 4 Stripe Smart Retries and 3-day grace period expired', status: 'completed', system: 'stripe' },
              { step: 2, title: 'Membership Inactive', description: 'Updated membership status to Suspended', status: 'completed', system: 'membership_engine' },
              { step: 3, title: 'Role Revoked', description: 'Discord bot removed @Premium role from user', status: 'completed', system: 'discord' }
            );
            break;

          default:
            title = 'Membership Event Processed';
            stripeEvent = 'custom.event';
            break;
        }

        // Apply state updates
        const updatedTimeline = [
          {
            id: `tl_${Date.now()}`,
            timestamp: now,
            event: title,
            details: `Stripe: ${stripeEvent} → Discord: ${discordAction}`,
            source: 'system' as const
          },
          ...member.timeline
        ];

        set((state) => ({
          members: state.members.map((m) =>
            m.id === memberId
              ? {
                  ...m,
                  membershipStatus: newStatus,
                  roleStatus: newRoleStatus,
                  membershipType: newPlan,
                  amount: newAmount,
                  lifetime: newPlan === 'lifetime' ? true : m.lifetime,
                  timeline: updatedTimeline
                }
              : m
          ),
          activities: [
            {
              id: `act_${Date.now()}`,
              timestamp: now,
              category: 'membership',
              memberId,
              memberName: member.name,
              title,
              description: `Event: ${stripeEvent} | Discord: ${discordAction}`,
              result: resultType,
              referenceId: stripeEvent
            },
            ...state.activities
          ]
        }));

        // Return structured simulation outcome
        return {
          title,
          stripeEvent,
          member: member.name,
          plan: newPlan === 'weekly' ? 'Weekly (A$37)' : newPlan === 'monthly' ? 'Monthly (A$99)' : 'Lifetime (A$1,499)',
          previousStatus,
          newStatus,
          discordAction,
          result: resultType,
          steps
        };
      },

      resetDemoData: () => {
        set({
          members: INITIAL_MEMBERS,
          payments: INITIAL_PAYMENTS,
          paymentLinks: INITIAL_PAYMENT_LINKS,
          automations: INITIAL_AUTOMATIONS,
          activities: INITIAL_ACTIVITIES,
          reconciliationIssues: INITIAL_RECONCILIATION_ISSUES,
          migrationRecords: INITIAL_MIGRATION_RECORDS,
          activeMemberId: 'mem_01',
          isReconciling: false,
          lastReconciledAt: '2026-11-04 04:00'
        });
      }
    }),
    {
      name: 'punt_ai_demo_state_v1'
    }
  )
);

