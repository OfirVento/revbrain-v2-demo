// Generated from assessment-schema.json — manually reviewed and annotated

export type TruthLabel = 'real_org_data' | 'sample_data';
export type ComplexityTier = 'Low' | 'Medium' | 'High' | 'Very High';
export type ConfidenceLevel = 'High' | 'Medium' | 'Low';
export type DraftConfidence = 'High' | 'Medium' | 'Low' | 'Manual_Review_Required';
export type Severity = 'Info' | 'Low' | 'Medium' | 'High' | 'Critical';
export type RcaTargetPattern =
  | 'Pricing_Procedure'
  | 'Price_Adjustment_Method'
  | 'CML_Constraint'
  | 'CML_Relationship'
  | 'Declarative_Configuration'
  | 'Flow_Extension'
  | 'Apex_Invocable_Extension'
  | 'Manual_Design_Required';
export type SourceType =
  | 'QCP_JavaScript'
  | 'Apex_Class'
  | 'Apex_Trigger'
  | 'Price_Rule'
  | 'Product_Rule'
  | 'Discount_Schedule'
  | 'Summary_Variable'
  | 'Lookup_Query';
export type UsageSignal =
  | 'Confirmed_Usage'
  | 'Active_Or_Referenced'
  | 'Unknown'
  | 'Deprecated_Or_Inactive';
export type ExpansionModule =
  | 'DRO'
  | 'Billing'
  | 'Advanced_Approvals'
  | 'Usage_Management'
  | 'Revenue_Recognition'
  | 'CLM'
  | 'Product_Discovery'
  | 'Token_Overage'
  | 'AI Agent';
export type TalkingPointContext =
  | 'discovery_call'
  | 'sow_review'
  | 'executive_meeting'
  | 'salesforce_handoff';
export type CandidateLanguage = 'cml' | 'apex' | 'json' | 'pseudocode';
export type VerdictRecommendation =
  | 'Proceed'
  | 'Proceed_With_Caution'
  | 'Needs_Deeper_Discovery';

export interface EvidenceDetailRow {
  metric: string;
  value: string | number;
  source: string;
}

export interface EvidenceRaw {
  artifactReferences: string[];
  metadataExtracts?: Record<string, unknown>;
}

export interface EvidenceTrail {
  summary: string[]; // 1–5 items
  detailed: EvidenceDetailRow[];
  raw: EvidenceRaw;
}

export interface ScoredDimension {
  score: number;
  tier: ComplexityTier;
  signal: string;
  evidence: EvidenceTrail;
}

export interface Integration {
  name: string;
  type: 'erp' | 'billing' | 'tax' | 'cpq_extension' | 'other';
  direction: 'inbound' | 'outbound' | 'bidirectional';
}

export interface DataVolume {
  products: number;
  activeQuotes: number;
  historicalQuotes: number;
  activeContracts: number;
  activeSubscriptions: number;
}

export interface OrgProfile {
  edition: string;
  cpqVersion: string;
  activeUsers: number;
  dataVolume: DataVolume;
  integrations: Integration[];
}

export interface ComplexityScores {
  overall: ComplexityTier;
  overallNumeric: number;
  dimensions: {
    pricingLogic: ScoredDimension;
    productCatalog: ScoredDimension;
    customCode: ScoredDimension;
    dataMigration: ScoredDimension;
    integrations: ScoredDimension;
    deprecatedConfig: ScoredDimension;
  };
}

export interface AudienceFraming {
  executive: {
    headline: string;
    impact: string;
    nextAction: string;
  };
  sales: {
    headline: string;
    sowCaveat: string;
    talkingPoint: string;
  };
  salesforce: {
    headline: string;
    migrationRisk: string;
  };
}

export interface Concern {
  id: string;
  title: string;
  severity: Severity;
  audienceFraming: AudienceFraming;
  evidence: EvidenceTrail;
}

export interface Phase {
  name: string;
  durationWeeks: { low: number; high: number };
  description: string;
}

export interface LoeEstimate {
  tier: ComplexityTier;
  weeksLow: number;
  weeksHigh: number;
  confidence: ConfidenceLevel;
  confidenceLimitingFactors: string[];
  primaryDrivers: string[];
  suggestedPhases: Phase[];
  sowCaveats: string[];
  changeOrderRisks: string[];
  disclaimer: string;
}

export interface RcaOpportunity {
  id: string;
  cpqFinding: string;
  rcaCapability: string;
  rcaTargetPattern: string;
  businessBenefit: string;
  expansionSignal: string | null;
  confidence: ConfidenceLevel;
  evidence: EvidenceTrail;
}

export interface ExpansionSignal {
  module: ExpansionModule;
  triggerCondition: string;
  consultativeFraming: string;
  confidence: ConfidenceLevel;
  evidence: EvidenceTrail;
}

export interface Dependency {
  type: 'object' | 'field' | 'rule' | 'integration';
  name: string;
  reference: string;
}

export interface MigrationDraft {
  generatedCandidate: string;
  candidateLanguage: CandidateLanguage;
  plainLanguageExplanation: string;
  targetPatternReasoning: string;
  preservedBehavior: string[];
  changedBehavior: string[];
  unknowns: string[];
  requiredTests: string[];
  humanReviewRequired: boolean;
  reviewReasons: string[];
}

export interface CodeArtifact {
  id: string;
  name: string;
  sourceType: SourceType;
  sourceCode: string;
  businessPurpose: string;
  usageSignal: UsageSignal;
  complexityScore: number;
  dependencies: Dependency[];
  recommendedRcaTarget: RcaTargetPattern;
  conversionConfidence: DraftConfidence;
  draft: MigrationDraft;
  evidence: EvidenceTrail;
}

export interface BenefitMappingEntry {
  cpqPainPoint: string;
  rcaCapability: string;
  businessBenefit: string;
  salesforceExpansion: string | null;
  confidence: ConfidenceLevel;
  evidence: EvidenceTrail;
}

export interface TalkingPoint {
  context: TalkingPointContext;
  point: string;
  supportingData: string;
}

export interface ImplementationFinding {
  category: string;
  severity: Severity;
  finding: string;
  technicalDetail: string;
  recommendedAction: string;
  evidence: EvidenceTrail;
}

export interface AiNarratives {
  executive: string;
  sales: string;
  salesforce: string;
}

export interface Verdict {
  recommendation: VerdictRecommendation;
  rationale: string;
}

export interface Meta {
  assessmentId: string;
  generatedAt: string;
  orgName: string;
  orgIdentifier: string;
  truthLabel: TruthLabel;
  schemaVersion: string;
}

export interface AssessmentPayload {
  meta: Meta;
  verdict: Verdict;
  orgProfile: OrgProfile;
  complexityScores: ComplexityScores;
  topConcerns: Concern[];
  loeEstimate: LoeEstimate;
  rcaOpportunities: RcaOpportunity[];
  expansionSignals: ExpansionSignal[];
  codeInventory: CodeArtifact[];
  rcaBenefitMapping: BenefitMappingEntry[];
  salesTalkingPoints: TalkingPoint[];
  implementationFindings: ImplementationFinding[];
  aiNarratives: AiNarratives;
}
