// ─────────────────────────────────────────────────────────────────────────────
// Yami Demo — Canonical Seed State
//
// This is the starting snapshot of the demo before any actions occur.
// It establishes the core actors (University, Tunde, Cynthia) and the initial
// invoice. The ResetDemo use case restores the DemoState to this exact object.
// ─────────────────────────────────────────────────────────────────────────────

import type { DemoState, DemoFlags } from './types';

const INITIAL_FLAGS: DemoFlags = {
  forceUnderwritingDecline: false,
  forceFundingFailure: false,
  forceDisbursementFailure: false,
  forceWebhookFailure: false,
  forceRepaymentFailure: false,
};

export const DEMO_SEED_STATE: DemoState = {
  version: 3,
  nextId: 1000, // IDs start at 1000

  activeAccountId: 'GUA-20491',
  accounts: {
    'GUA-20491': {
      id: 'GUA-20491',
      role: 'BORROWER',
      email: 'babatunde.a@example.com',
      name: 'Babatunde Adebayo',
      verificationStatus: 'VERIFIED',
    },
    'SPON-CYNTHIA-01': {
      id: 'SPON-CYNTHIA-01',
      role: 'SPONSOR',
      email: 'cynthia.invests@example.com',
      name: 'Cynthia Okonkwo',
      verificationStatus: 'VERIFIED',
    },
    'INST-DEMO': {
      id: 'INST-DEMO',
      role: 'INSTITUTION',
      email: 'finance@university.edu.ng',
      name: 'Demo University',
      verificationStatus: 'VERIFIED',
    },
    'ADMIN-YAMI': {
      id: 'ADMIN-YAMI',
      role: 'ADMIN',
      email: 'ops@yami.com',
      name: 'Yami Operations',
      verificationStatus: 'VERIFIED',
    }
  },

  institution: {
    id: 'INST-DEMO',
    name: 'Demo University',
    shortName: 'University',
    location: 'Ilishan-Remo, Ogun State',
    accountNumber: '0123456789',
    bankName: 'Guaranty Trust Bank',
    webhookUrl: 'https://api.university.edu.ng/webhooks/yami',
    apiKey: 'sk_live_univ_demo_8f92j',
  },

  student: {
    id: 'STU-20491',
    firstName: 'Tunde',
    lastName: 'Adebayo',
    matricNumber: 'BU/23/CSC/0491',
    institutionId: 'INST-DEMO',
    programme: 'B.Sc. Computer Science',
    level: '400 Level',
    guardianId: 'GUA-20491',
  },

  guardian: {
    id: 'GUA-20491',
    firstName: 'Babatunde',
    lastName: 'Adebayo',
    relationship: 'Father',
    email: 'babatunde.a@example.com',
    phone: '+2348012345678',
    bvn: '223****8901', // Masked for display
    monthlyIncome: 2_500_000, // ₦2.5m/mo income easily affords ₦600k/mo installment
    trustScore: 740, // Starts at 740 (Reliable)
  },

  sponsor: {
    id: 'SPON-CYNTHIA-01',
    firstName: 'Cynthia',
    lastName: 'Okonkwo',
    type: 'individual',
    email: 'cynthia.invests@example.com',
    phone: '+2349098765432',
    trustScore: 850,
    walletBalance: 5_000_000, // Cynthia starts with ₦5m
  },

  invoice: {
    id: 'BAB-82931',
    institutionId: 'INST-DEMO',
    studentId: 'STU-20491',
    description: 'First Semester Tuition, 2026/2027 Session',
    amount: 2_000_000, // ₦2,000,000
    semester: '1st Semester',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    issuedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
  },

  // Financing starts null
  financing: null,

  // Empty append-only records
  ledger: [],
  webhooks: [],
  events: [],
  complaints: [],

  // Operator flags
  flags: { ...INITIAL_FLAGS },
};
