import { PaymentLink } from '../types';

export const INITIAL_PAYMENT_LINKS: PaymentLink[] = [
  {
    id: 'plink_weekly',
    name: 'Premium Weekly',
    stripePaymentLinkId: 'plink_1N982xWeeklyPunt37',
    stripeProductId: 'prod_PuntWeeklyA37',
    stripePriceId: 'price_1N982xWeekly37AUD',
    url: 'https://buy.stripe.com/test_weekly_37aud_punt_ai',
    membershipType: 'weekly',
    amount: 37,
    currency: 'AUD',
    billingInterval: 'week',
    active: true,
    accessBehavior: 'Assign Premium role on invoice.paid. Keep role active through paid-through period. Revoke on final failed payment.',
    updatedAt: '2026-10-15 09:30'
  },
  {
    id: 'plink_monthly',
    name: 'Premium Monthly',
    stripePaymentLinkId: 'plink_1N983xMonthlyPunt99',
    stripeProductId: 'prod_PuntMonthlyA99',
    stripePriceId: 'price_1N983xMonthly99AUD',
    url: 'https://buy.stripe.com/test_monthly_99aud_punt_ai',
    membershipType: 'monthly',
    amount: 99,
    currency: 'AUD',
    billingInterval: 'month',
    active: true,
    accessBehavior: 'Assign Premium on successful checkout. Preserve access until paid-through date if cancellation scheduled. Revoke on refund or chargeback.',
    updatedAt: '2026-10-10 14:15'
  },
  {
    id: 'plink_lifetime',
    name: 'Lifetime Premium',
    stripePaymentLinkId: 'plink_1N984xLifetimePunt1499',
    stripeProductId: 'prod_PuntLifetimeA1499',
    stripePriceId: 'price_1N984xLifetime1499AUD',
    url: 'https://buy.stripe.com/test_lifetime_1499aud_punt_ai',
    membershipType: 'lifetime',
    amount: 1499,
    currency: 'AUD',
    billingInterval: 'one_time',
    active: true,
    accessBehavior: 'Permanent Premium access. Flagged as lifetime. Protected from recurring subscription cancellation and expiration webhooks.',
    updatedAt: '2026-09-01 11:00'
  }
];

