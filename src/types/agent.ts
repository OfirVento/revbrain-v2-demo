export interface AgentMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
}

export interface AgentResponse {
  content: string;
  evidenceRefs?: string[];
}

export type LayerKey = 'executive' | 'sales' | 'salesforce' | 'migration' | 'implementation';

export const LAYER_LABELS: Record<LayerKey, string> = {
  executive: 'Executive',
  sales: 'Sales',
  salesforce: 'Salesforce',
  migration: 'Migration',
  implementation: 'Implementation',
};

export const LAYER_ROUTES: Record<LayerKey, string> = {
  executive: '/assessment/executive',
  sales: '/assessment/sales',
  salesforce: '/assessment/salesforce',
  migration: '/assessment/migration',
  implementation: '/assessment/implementation',
};
