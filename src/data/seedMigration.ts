import { MigrationClaimRecord } from '../types';

export const INITIAL_MIGRATION_RECORDS: MigrationClaimRecord[] = [
  {
    id: 'mig_01',
    email: 'marcus.punt@gmail.com',
    instagramHandle: '@marcus_punts_au',
    stripeCustomerId: 'cus_InstaPunt01',
    plan: 'monthly',
    status: 'ready',
    claimToken: 'DEMO-CLAIM-001',
    claimUrl: '/migration/claim/DEMO-CLAIM-001',
    lifetime: false
  },
  {
    id: 'mig_02',
    email: 'sarah.tipping@outlook.com.au',
    instagramHandle: '@sarah_sports_tips',
    stripeCustomerId: 'cus_InstaPunt02',
    plan: 'weekly',
    status: 'ready',
    claimToken: 'DEMO-CLAIM-002',
    claimUrl: '/migration/claim/DEMO-CLAIM-002',
    lifetime: false
  },
  {
    id: 'mig_03',
    email: 'dave.footy@bigpond.com',
    instagramHandle: '@dave_afl_punter',
    stripeCustomerId: 'cus_InstaPunt03',
    plan: 'lifetime',
    status: 'ready',
    claimToken: 'DEMO-CLAIM-003',
    claimUrl: '/migration/claim/DEMO-CLAIM-003',
    lifetime: true
  },
  {
    id: 'mig_04',
    email: 'trent.racing@yahoo.com.au',
    instagramHandle: '@trent_the_tipster',
    stripeCustomerId: 'cus_InstaPunt04',
    plan: 'monthly',
    status: 'claimed',
    claimToken: 'DEMO-CLAIM-004',
    claimUrl: '/migration/claim/DEMO-CLAIM-004',
    discordUsername: 'trent_racing#2291',
    discordId: '849201948201948201',
    claimedAt: '2026-11-04 11:20',
    lifetime: false
  },
  {
    id: 'mig_05',
    email: 'ash.melbourne@hotmail.com',
    instagramHandle: '@ash_melb_punts',
    stripeCustomerId: 'cus_InstaPunt05',
    plan: 'weekly',
    status: 'ready',
    claimToken: 'DEMO-CLAIM-005',
    claimUrl: '/migration/claim/DEMO-CLAIM-005',
    lifetime: false
  }
];

