export type MembershipPlanType = 'weekly' | 'monthly' | 'lifetime';

export type MembershipStatus =
  | 'active'
  | 'cancellation_scheduled'
  | 'expired'
  | 'past_due'
  | 'refunded'
  | 'chargeback'
  | 'unlinked';

export type RoleStatus = 'active' | 'removed' | 'missing' | 'unexpected';

export interface TimelineEvent {
  id: string;
  timestamp: string;
  event: string;
  details: string;
  source: 'stripe' | 'discord' | 'system' | 'admin';
}

export interface Member {
  id: string;
  name: string;
  email: string;
  discordId: string;
  discordUsername: string;
  stripeCustomerId: string;
  subscriptionId: string;
  membershipType: MembershipPlanType;
  membershipStatus: MembershipStatus;
  roleStatus: RoleStatus;
  amount: number;
  currency: 'AUD';
  billingInterval: 'week' | 'month' | 'lifetime';
  joinedAt: string;
  currentPeriodEnd: string;
  lifetime: boolean;
  linked: boolean;
  ageConfirmed: boolean;
  ageConfirmedAt?: string;
  avatarUrl?: string;
  notes?: string;
  timeline: TimelineEvent[];
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  amount: number;
  currency: 'AUD';
  status: 'succeeded' | 'failed' | 'refunded' | 'disputed' | 'partial_refund';
  paymentMethod: string;
  stripePaymentIntentId: string;
  createdAt: string;
  planName: string;
  refundReason?: string;
}

export interface PaymentLink {
  id: string;
  name: string;
  stripePaymentLinkId: string;
  stripeProductId: string;
  stripePriceId: string;
  url: string;
  membershipType: MembershipPlanType;
  amount: number;
  currency: 'AUD';
  billingInterval: 'week' | 'month' | 'one_time';
  active: boolean;
  accessBehavior: string;
  updatedAt: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  category: 'payment' | 'membership' | 'discord' | 'reconciliation' | 'migration' | 'admin';
  memberId?: string;
  memberName?: string;
  title: string;
  description: string;
  result: 'success' | 'warning' | 'error' | 'info';
  referenceId: string;
  adminUser?: string;
}

export interface ReconciliationIssue {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  discordUsername: string;
  stripeStatus: string;
  discordStatus: string;
  expectedStatus: string;
  recommendedAction: string;
  severity: 'high' | 'medium' | 'low';
  type:
    | 'missing_role'
    | 'unexpected_role'
    | 'refunded_has_role'
    | 'lifetime_missing_role'
    | 'unlinked_member'
    | 'cancellation_period_active';
  isSafeToAutoFix: boolean;
  resolved: boolean;
}

export interface AutomationRule {
  id: string;
  name: string;
  triggerEvent: string;
  triggerDescription: string;
  actions: string[];
  enabled: boolean;
  lastExecuted: string;
  executionCount: number;
  status: 'operational' | 'paused';
}

export interface EmailTemplate {
  id: string;
  name: string;
  type:
    | 'welcome'
    | 'keep_this_email'
    | 'discord_link'
    | 'cancellation_scheduled'
    | 'membership_expired'
    | 'migration_claim'
    | 'billing_portal';
  subject: string;
  previewText: string;
  body: string;
  lastUpdated: string;
}

export interface EmailDeliveryLog {
  id: string;
  recipientEmail: string;
  recipientName: string;
  type: string;
  subject: string;
  sentAt: string;
  status: 'delivered' | 'bounced' | 'complaint' | 'pending';
  referenceId: string;
}

export interface MigrationClaimRecord {
  id: string;
  email: string;
  instagramHandle: string;
  stripeCustomerId: string;
  plan: MembershipPlanType;
  status: 'ready' | 'claimed' | 'flagged' | 'expired';
  claimToken: string;
  claimUrl: string;
  discordUsername?: string;
  discordId?: string;
  claimedAt?: string;
  lifetime: boolean;
}

export interface SimulationStep {
  step: number;
  title: string;
  description: string;
  status: 'pending' | 'running' | 'completed';
  system: 'stripe' | 'membership_engine' | 'discord' | 'email';
}

