import { create } from 'zustand';
import type { AssessmentPayload, EvidenceTrail } from '@/types/assessment';
import type { LayerKey } from '@/types/agent';
import type { AgentMessage } from '@/types/agent';

// ── Assessment store ─────────────────────────────────────────────
interface AssessmentState {
  payload: AssessmentPayload | null;
  loadErrors: string[] | null;
  isLoaded: boolean;
  setPayload: (p: AssessmentPayload) => void;
  setErrors: (e: string[]) => void;
}

export const useAssessmentStore = create<AssessmentState>((set) => ({
  payload: null,
  loadErrors: null,
  isLoaded: false,
  setPayload: (p) => set({ payload: p, isLoaded: true, loadErrors: null }),
  setErrors: (e) => set({ loadErrors: e, isLoaded: true }),
}));

/**
 * Returns the meta-level truth label from the current payload.
 * Page-header <TruthLabel> components should use this instead of
 * hardcoding 'sample_data' so the badge reflects the actual payload
 * (real_org_data vs sample_data) without any UI code change on data swap.
 */
export function useMetaTruthLabel(): 'real_org_data' | 'sample_data' {
  return useAssessmentStore((s) => s.payload?.meta.truthLabel ?? 'sample_data') as 'real_org_data' | 'sample_data';
}

// ── UI store ─────────────────────────────────────────────────────
interface EvidenceDrawerState {
  isOpen: boolean;
  evidence: EvidenceTrail | null;
  title: string;
}

interface UiState {
  theme: 'light' | 'dark';
  activeLayer: LayerKey;
  agentPanelOpen: boolean;
  evidenceDrawer: EvidenceDrawerState;
  setTheme: (t: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setActiveLayer: (l: LayerKey) => void;
  setAgentPanelOpen: (v: boolean) => void;
  openEvidenceDrawer: (evidence: EvidenceTrail, title: string) => void;
  closeEvidenceDrawer: () => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  theme: 'light',
  activeLayer: 'executive',
  agentPanelOpen: false,
  evidenceDrawer: { isOpen: false, evidence: null, title: '' },

  setTheme: (t) => {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('vento-theme', t);
    set({ theme: t });
  },
  toggleTheme: () => {
    const next = get().theme === 'light' ? 'dark' : 'light';
    get().setTheme(next);
  },
  setActiveLayer: (l) => set({ activeLayer: l }),
  setAgentPanelOpen: (v) => set({ agentPanelOpen: v }),
  openEvidenceDrawer: (evidence, title) =>
    set({ evidenceDrawer: { isOpen: true, evidence, title } }),
  closeEvidenceDrawer: () =>
    set({ evidenceDrawer: { isOpen: false, evidence: null, title: '' } }),
}));

// ── Agent store ──────────────────────────────────────────────────
interface AgentState {
  messages: AgentMessage[];
  isStreaming: boolean;
  pendingInput: string | null;
  addMessage: (m: AgentMessage) => void;
  appendToLastMessage: (chunk: string) => void;
  updateLastAssistant: (content: string) => void;
  setStreaming: (v: boolean) => void;
  clearMessages: () => void;
  setPendingInput: (input: string | null) => void;
  // Removes messages from index `from` onwards — used for per-message re-roll
  truncateMessages: (from: number) => void;
  // Prunes a trailing empty assistant message left by an aborted stream
  dropTrailingEmptyAssistant: () => void;
}

export const useAgentStore = create<AgentState>((set) => ({
  messages: [],
  isStreaming: false,
  pendingInput: null,
  addMessage: (m) => set((s) => ({ messages: [...s.messages, m] })),
  appendToLastMessage: (chunk) =>
    set((s) => {
      const msgs = [...s.messages];
      if (msgs.length === 0) return s;
      const last = { ...msgs[msgs.length - 1] };
      last.content += chunk;
      msgs[msgs.length - 1] = last;
      return { messages: msgs };
    }),
  // Sets the full content of the last assistant message (for streaming accumulation)
  updateLastAssistant: (content) =>
    set((s) => {
      const msgs = [...s.messages];
      if (msgs.length === 0) return s;
      const last = msgs[msgs.length - 1];
      if (last.role !== 'assistant') return s;
      msgs[msgs.length - 1] = { ...last, content };
      return { messages: msgs };
    }),
  setStreaming: (v) => set({ isStreaming: v }),
  clearMessages: () => set({ messages: [] }),
  setPendingInput: (input) => set({ pendingInput: input }),
  truncateMessages: (from) =>
    set((s) => ({ messages: s.messages.slice(0, from) })),
  dropTrailingEmptyAssistant: () =>
    set((s) => {
      const msgs = s.messages;
      if (msgs.length === 0) return s;
      const last = msgs[msgs.length - 1];
      if (last.role === 'assistant' && !last.content.trim()) {
        return { messages: msgs.slice(0, -1) };
      }
      return s;
    }),
}));

// ── Guided workflow store ────────────────────────────────────────
interface GuidedState {
  currentStep: number;
  dismissed: boolean;
  advance: () => void;
  dismiss: () => void;
}

export const useGuidedStore = create<GuidedState>((set) => ({
  currentStep: 0,
  dismissed: localStorage.getItem('vento-guided-dismissed') === 'true',
  advance: () => set((s) => ({ currentStep: s.currentStep + 1 })),
  dismiss: () => {
    localStorage.setItem('vento-guided-dismissed', 'true');
    set({ dismissed: true });
  },
}));
