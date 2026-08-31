import { qcpArtifacts } from './code-inventory-qcp.mjs';
import { apexArtifacts } from './code-inventory-apex.mjs';
import { priceRuleArtifacts } from './code-inventory-rules.mjs';
import { productRuleArtifacts, discountScheduleArtifacts, summaryVariableArtifacts } from './code-inventory-other.mjs';

export const codeInventory = [
  ...qcpArtifacts,
  ...apexArtifacts,
  ...priceRuleArtifacts,
  ...productRuleArtifacts,
  ...discountScheduleArtifacts,
  ...summaryVariableArtifacts
];
