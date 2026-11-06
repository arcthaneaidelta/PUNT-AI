import { AutomationRule } from '../types';

export const INITIAL_AUTOMATIONS: AutomationRule[] = [
  {
    id: 'rule_01',
    name: 'Successful Checkout & Verification',
    triggerEvent: 'checkout.session.completed',
    triggerDescription: 'Verified Stripe checkout and payment confirmation',
    actions: [
      'Verify Stripe payment signature and idempotent webhook id',
      'Resolve purchased Price ID against central mapping registry',
      'Lookup or link Discord account via OAuth2 user ID token',
      'Validate 18+ member age confirmation timestamp',
      'Punt AI Bot assigns @Premium role in Discord server',
      'Trigger Amazon SES transactional Welcome & Access email'
    ],
    enabled: true,
    lastExecuted: '2026-11-06 14:22',
    executionCount: 524,
    status: 'operational'
  },
  {
    id: 'rule_02',
    name: 'Subscription Invoice Renewal',
    triggerEvent: 'invoice.paid',
    triggerDescription: 'Confirmed successful recurring invoice payment',
    actions: [
      'Verify recurring subscription period extension in database',
      'Confirm @Premium role remains active in Discord',
      'Record AUD transaction in financial analytics ledger',
      'Send transactional renewal receipt via Amazon SES'
    ],
    enabled: true,
    lastExecuted: '2026-11-06 11:30',
    executionCount: 1289,
    status: 'operational'
  },
  {
    id: 'rule_03',
    name: 'Cancellation Scheduled at Period End',
    triggerEvent: 'customer.subscription.updated (cancel_at_period_end)',
    triggerDescription: 'Customer or admin requests subscription cancellation',
    actions: [
      'Mark subscription status as Cancellation Scheduled in database',
      'Record paid-through timestamp (DO NOT revoke role immediately)',
      'Maintain active @Premium role until currentPeriodEnd expires',
      'Send graceful exit email explaining access duration'
    ],
    enabled: true,
    lastExecuted: '2026-11-05 16:45',
    executionCount: 43,
    status: 'operational'
  },
  {
    id: 'rule_04',
    name: 'Paid Subscription Expiration',
    triggerEvent: 'customer.subscription.deleted',
    triggerDescription: 'Current paid billing period expires without renewal',
    actions: [
      'Punt AI Bot automatically removes @Premium role from Discord member',
      'Update member status to Expired',
      'Record expiration audit log with timestamp',
      'Send win-back resubscribe invitation email'
    ],
    enabled: true,
    lastExecuted: '2026-11-04 08:01',
    executionCount: 39,
    status: 'operational'
  },
  {
    id: 'rule_05',
    name: 'Immediate Full Refund Revocation',
    triggerEvent: 'charge.refunded',
    triggerDescription: 'Confirmed full refund issued in Stripe',
    actions: [
      'Punt AI Bot revokes @Premium role immediately from Discord',
      'Update member status to Refunded - Access Revoked',
      'Log refund reason and transaction reference in audit trail',
      'Note: Partial refunds DO NOT revoke role; flagged for review'
    ],
    enabled: true,
    lastExecuted: '2026-10-14 11:20',
    executionCount: 14,
    status: 'operational'
  },
  {
    id: 'rule_06',
    name: 'Chargeback & Dispute Lockdown',
    triggerEvent: 'charge.dispute.created',
    triggerDescription: 'Bank chargeback or dispute created by financial institution',
    actions: [
      'Immediately revoke @Premium role from Discord user',
      'Flag account for priority administrative review',
      'Send immediate security alert to Punt AI admin team',
      'Record dispute evidence payload in database'
    ],
    enabled: true,
    lastExecuted: '2026-10-02 18:41',
    executionCount: 3,
    status: 'operational'
  },
  {
    id: 'rule_07',
    name: 'Final Payment Failure Policy',
    triggerEvent: 'invoice.payment_failed (exhausted)',
    triggerDescription: 'Configured final payment failure after Smart Retries & 3-day grace',
    actions: [
      'Check if 3-day grace period has elapsed',
      'Punt AI Bot removes @Premium role if final payment unresolved',
      'Update member status to Past Due / Suspended',
      'Send urgent payment update email with Customer Portal link'
    ],
    enabled: true,
    lastExecuted: '2026-10-20 09:12',
    executionCount: 18,
    status: 'operational'
  },
  {
    id: 'rule_08',
    name: 'Lifetime Membership Protection',
    triggerEvent: 'checkout.session.completed (lifetime_price_id)',
    triggerDescription: 'Verified one-time A$1,499 Lifetime purchase',
    actions: [
      'Assign permanent @Premium role in Discord',
      'Tag account with lifetime_protected flag in database',
      'Explicitly bypass all recurring cancellation & expiration workers',
      'Send VIP Founding Member welcome package email'
    ],
    enabled: true,
    lastExecuted: '2026-09-02 13:41',
    executionCount: 24,
    status: 'operational'
  }
];

