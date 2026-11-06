import { ActivityEvent } from '../types';

export const INITIAL_ACTIVITIES: ActivityEvent[] = [
  {
    id: 'act_01',
    timestamp: '2026-11-06 14:22',
    category: 'membership',
    memberId: 'mem_01',
    memberName: 'Jordan Mitchell',
    title: 'Subscription Renewed',
    description: 'Monthly Premium invoice in_1Pk892 paid A$99.00 AUD. Discord @Premium role confirmed.',
    result: 'success',
    referenceId: 'in_1Pk892'
  },
  {
    id: 'act_02',
    timestamp: '2026-11-06 12:15',
    category: 'discord',
    memberId: 'mem_02',
    memberName: 'Lachlan Davies',
    title: 'Discord Role Synchronised',
    description: 'Punt AI Bot verified active weekly role status for discordId 719284019284910294.',
    result: 'success',
    referenceId: 'bot_sync_991'
  },
  {
    id: 'act_03',
    timestamp: '2026-11-05 16:45',
    category: 'membership',
    memberId: 'mem_04',
    memberName: 'Lucas Graham',
    title: 'Cancellation Scheduled',
    description: 'Cancellation requested. Paid-through date recorded as 2026-11-20. Role remains active until period ends.',
    result: 'info',
    referenceId: 'sub_1Oqm890128912'
  },
  {
    id: 'act_04',
    timestamp: '2026-11-05 03:10',
    category: 'payment',
    memberId: 'mem_06',
    memberName: 'Emma Walsh',
    title: 'Invoice Payment Failed (Grace Period)',
    description: 'Card charge failed on renewal. 3-day grace period initiated. Role retained until 2026-11-08.',
    result: 'warning',
    referenceId: 'pi_3MtwLz2eZvKYlo2C04D9873'
  },
  {
    id: 'act_05',
    timestamp: '2026-11-04 15:20',
    category: 'payment',
    memberId: 'mem_09',
    memberName: 'Nathan Campbell',
    title: 'Payment Succeeded (Awaiting Discord Link)',
    description: 'Stripe checkout completed for Monthly Premium. Awaiting user Discord OAuth2 connection.',
    result: 'warning',
    referenceId: 'cus_Punt449102H'
  },
  {
    id: 'act_06',
    timestamp: '2026-11-04 04:00',
    category: 'reconciliation',
    title: 'Daily Reconciliation Executed',
    description: 'Evaluated 486 Stripe subscriptions against Discord roles. 479 matched, 4 missing roles, 2 unexpected, 1 unlinked.',
    result: 'warning',
    referenceId: 'rec_job_20261104'
  },
  {
    id: 'act_07',
    timestamp: '2026-10-14 11:20',
    category: 'membership',
    memberId: 'mem_07',
    memberName: 'Ben Hayes',
    title: 'Full Refund Issued — Access Revoked',
    description: 'Refund of A$99.00 processed. Immediate role removal triggered via Discord Bot API.',
    result: 'error',
    referenceId: 're_1Op892x019'
  },
  {
    id: 'act_08',
    timestamp: '2026-10-02 18:41',
    category: 'membership',
    memberId: 'mem_08',
    memberName: 'Daniel Scott',
    title: 'Chargeback Dispute — Access Revoked',
    description: 'Dispute dp_1Pq992 detected. Immediate @Premium role revocation. Account flagged for admin review.',
    result: 'error',
    referenceId: 'dp_1Pq992'
  },
  {
    id: 'act_09',
    timestamp: '2026-09-02 13:41',
    category: 'membership',
    memberId: 'mem_16',
    memberName: 'Marcus Cooper',
    title: 'Lifetime Membership Activated',
    description: 'One-time payment A$1,499.00 AUD verified. Lifetime protection flag enabled.',
    result: 'success',
    referenceId: 'sub_lifetime_003'
  }
];

