'use client';

// ─────────────────────────────────────────────────────────────────────────────
// Yami Demo — State Store & Context
//
// Provides the centralized React Context for the entire demo application.
// Handles localStorage persistence and cross-tab synchronization.
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import type { DemoState, DemoFlags, DemoResult } from './types';
import { DEMO_SEED_STATE } from './seed';
import * as useCases from './use-cases';

const STORAGE_KEY = 'yami-demo-v1';

// ── Actions ──────────────────────────────────────────────────────────────────

export type DemoAction =
  | { type: 'HYDRATE'; payload: DemoState }
  | { type: 'RESET' }
  | { type: 'SET_FLAG'; flag: keyof DemoFlags; value: boolean }
  | { type: 'START_APPLICATION' }
  | { type: 'RUN_UNDERWRITING' }
  | { type: 'ACCEPT_OFFER' }
  | { type: 'FUND_FINANCING' }
  | { type: 'PROCESS_DISBURSEMENT' }
  | { type: 'DELIVER_WEBHOOK'; webhookId: number }
  | { type: 'RETRY_WEBHOOK'; webhookId: number }
  | { type: 'PROCESS_REPAYMENT'; month: number }
  | { type: 'COMPLETE_FINANCING' }
  | { type: 'CANCEL_FINANCING' }
  | { type: 'DEFAULT_FINANCING' }
  | { type: 'SWITCH_ACTOR'; accountId: string }
  | { type: 'MARK_OVERDUE'; month: number }
  | { type: 'START_COLLECTIONS' }
  | { type: 'SUBMIT_CLAIM' }
  | { type: 'PROCESS_CLAIM'; outcome: 'APPROVED' | 'DENIED' }
  | { type: 'FILE_COMPLAINT'; actorId: string; category: string; description: string; financingId?: string }
  | { type: 'RESOLVE_COMPLAINT'; complaintId: string; resolution: string };

// ── Reducer ──────────────────────────────────────────────────────────────────

function demoReducer(state: DemoState, action: DemoAction): DemoState {
  let result: DemoResult<DemoState> | DemoState;

  switch (action.type) {
    case 'HYDRATE':
      return action.payload;
    case 'RESET':
      return useCases.resetDemo();
    case 'SET_FLAG':
      return useCases.setDemoFlag(state, action.flag, action.value);

    // Use cases
    case 'START_APPLICATION':
      result = useCases.startFinancingApplication(state);
      break;
    case 'RUN_UNDERWRITING':
      result = useCases.runUnderwriting(state);
      break;
    case 'ACCEPT_OFFER':
      result = useCases.acceptFinancingOffer(state);
      break;
    case 'FUND_FINANCING':
      result = useCases.fundFinancing(state);
      break;
    case 'PROCESS_DISBURSEMENT':
      result = useCases.processDisbursement(state);
      break;
    case 'DELIVER_WEBHOOK':
      result = useCases.deliverWebhook(state, action.webhookId);
      break;
    case 'RETRY_WEBHOOK':
      result = useCases.retryWebhook(state, action.webhookId);
      break;
    case 'PROCESS_REPAYMENT':
      result = useCases.processRepayment(state, action.month);
      break;
    case 'COMPLETE_FINANCING':
      result = useCases.completeFinancing(state);
      break;
    case 'CANCEL_FINANCING':
      result = useCases.cancelFinancing(state);
      break;
    case 'DEFAULT_FINANCING':
      result = useCases.defaultFinancing(state);
      break;
    case 'MARK_OVERDUE':
      result = useCases.markRepaymentOverdue(state, action.month);
      break;
    case 'START_COLLECTIONS':
      result = useCases.startCollections(state);
      break;
    case 'SUBMIT_CLAIM':
      result = useCases.submitInsuranceClaim(state);
      break;
    case 'PROCESS_CLAIM':
      result = useCases.processInsuranceClaim(state, action.outcome);
      break;
    case 'SWITCH_ACTOR':
      return { ...state, activeAccountId: action.accountId };
    case 'FILE_COMPLAINT':
      result = useCases.fileComplaint(state, action.actorId, action.category, action.description, action.financingId);
      break;
    case 'RESOLVE_COMPLAINT':
      result = useCases.resolveComplaint(state, action.complaintId, action.resolution);
      break;
    default:
      return state;
  }

  // Check if result is a DemoResult vs direct state (from SET_FLAG/RESET)
  if ('ok' in result) {
    if (result.ok) {
      return result.value;
    } else {
      console.warn(`Demo Use Case Error [${result.error.code}]:`, result.error.message);
      if (typeof window !== 'undefined') {
        alert(`Action Failed:\n${result.error.message}`);
      }
      return state; // No-op on error
    }
  }

  return result;
}

// ── Context ──────────────────────────────────────────────────────────────────

interface DemoContextValue {
  state: DemoState;
  dispatch: React.Dispatch<DemoAction>;
  isHydrated: boolean;
}

const DemoContext = createContext<DemoContextValue | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(demoReducer, DEMO_SEED_STATE);
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as DemoState;
        if (parsed.version === DEMO_SEED_STATE.version) {
          dispatch({ type: 'HYDRATE', payload: parsed });
        }
      }
    } catch (e) {
      console.error('Failed to parse demo state from localStorage', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage when state changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isHydrated]);

  // Handle cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue) as DemoState;
          if (parsed.version === DEMO_SEED_STATE.version) {
            dispatch({ type: 'HYDRATE', payload: parsed });
          }
        } catch (err) {
          console.error('Cross-tab sync parse error', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Automatic Background Processes
  useEffect(() => {
    if (!isHydrated || !state.financing) return;

    // 1. Auto-Disbursement: FUNDED -> DISBURSING -> ACTIVE
    if (state.financing.status === 'FUNDED') {
      const timer = setTimeout(() => {
        dispatch({ type: 'PROCESS_DISBURSEMENT' });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.financing?.status, isHydrated, dispatch, state.financing]);

  useEffect(() => {
    if (!isHydrated) return;

    // 2. Auto-Deliver Webhooks: QUEUED -> DELIVERED
    const queuedWebhooks = state.webhooks.filter(w => w.status === 'QUEUED');
    
    queuedWebhooks.forEach(webhook => {
      // Small timeout to simulate network delay
      setTimeout(() => {
        dispatch({ type: 'DELIVER_WEBHOOK', webhookId: webhook.id });
      }, 1500);
    });
    
  }, [state.webhooks, isHydrated, dispatch]);

  return (
    <DemoContext.Provider value={{ state, dispatch, isHydrated }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
