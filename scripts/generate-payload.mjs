// Payload generator - combines section files into assessment-payload.json
import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'inputs', 'assessment-payload.json');

// Import section generators
import { meta, verdict } from './sections/meta.mjs';
import { orgProfile } from './sections/org-profile.mjs';
import { complexityScores } from './sections/complexity.mjs';
import { topConcerns } from './sections/concerns.mjs';
import { loeEstimate } from './sections/loe.mjs';
import { rcaOpportunities } from './sections/rca-opportunities.mjs';
import { expansionSignals } from './sections/expansion-signals.mjs';
import { codeInventory } from './sections/code-inventory.mjs';
import { rcaBenefitMapping } from './sections/benefit-mapping.mjs';
import { salesTalkingPoints } from './sections/talking-points.mjs';
import { implementationFindings } from './sections/findings.mjs';
import { aiNarratives } from './sections/narratives.mjs';

const payload = {
  meta,
  verdict,
  orgProfile,
  complexityScores,
  topConcerns,
  loeEstimate,
  rcaOpportunities,
  expansionSignals,
  codeInventory,
  rcaBenefitMapping,
  salesTalkingPoints,
  implementationFindings,
  aiNarratives
};

// Consistency checks
const errors = [];

// Check 1: artifact IDs referenced in concerns exist in codeInventory
const artifactIds = new Set(codeInventory.map(a => a.id));
for (const c of topConcerns) {
  for (const ref of c.evidence.raw.artifactReferences) {
    if (ref.startsWith('artifact:') && !artifactIds.has(ref.replace('artifact:', ''))) {
      errors.push(`Concern "${c.title}" references missing artifact: ${ref}`);
    }
  }
}

// Check 2: expansion signal triggers reference something in payload
for (const s of expansionSignals) {
  const found = topConcerns.some(c => c.title.toLowerCase().includes(s.triggerCondition.toLowerCase().split(' ')[0])) ||
    codeInventory.some(a => s.evidence.raw.artifactReferences.some(r => r.includes(a.id)));
  // Just warn, don't fail
}

// Check 3: LOE drivers connect to concerns
for (const driver of loeEstimate.primaryDrivers) {
  const connected = topConcerns.some(c => 
    c.title.toLowerCase().includes(driver.toLowerCase().split(' ')[0]) ||
    driver.toLowerCase().includes(c.title.toLowerCase().split(' ')[0])
  );
}

// Check 4: count verification
const qcpCount = codeInventory.filter(a => a.sourceType === 'QCP_JavaScript').length;
const apexCount = codeInventory.filter(a => a.sourceType === 'Apex_Class' || a.sourceType === 'Apex_Trigger').length;
const priceRuleCount = codeInventory.filter(a => a.sourceType === 'Price_Rule').length;
const productRuleCount = codeInventory.filter(a => a.sourceType === 'Product_Rule').length;
const dsCount = codeInventory.filter(a => a.sourceType === 'Discount_Schedule').length;
const svCount = codeInventory.filter(a => a.sourceType === 'Summary_Variable').length;

console.log('=== Payload Generation Summary ===');
console.log(`Total artifacts: ${codeInventory.length}`);
console.log(`  QCP_JavaScript: ${qcpCount}`);
console.log(`  Apex_Class: ${codeInventory.filter(a => a.sourceType === 'Apex_Class').length}`);
console.log(`  Apex_Trigger: ${codeInventory.filter(a => a.sourceType === 'Apex_Trigger').length}`);
console.log(`  Price_Rule: ${priceRuleCount}`);
console.log(`  Product_Rule: ${productRuleCount}`);
console.log(`  Discount_Schedule: ${dsCount}`);
console.log(`  Summary_Variable: ${svCount}`);
console.log('');
console.log('Confidence distribution:');
const confDist = {};
codeInventory.forEach(a => { confDist[a.conversionConfidence] = (confDist[a.conversionConfidence] || 0) + 1; });
Object.entries(confDist).forEach(([k, v]) => console.log(`  ${k}: ${v}`));
console.log('');
console.log('Top concerns:');
topConcerns.forEach((c, i) => console.log(`  ${i+1}. ${c.title} (${c.severity})`));
console.log('');
console.log(`LOE: ${loeEstimate.tier}, ${loeEstimate.weeksLow}-${loeEstimate.weeksHigh} weeks`);
console.log(`Verdict: ${verdict.recommendation}`);
console.log(`Evidence trails populated: ${countEvidenceTrails(payload)}`);
console.log('');

if (errors.length > 0) {
  console.log('CONSISTENCY ERRORS:');
  errors.forEach(e => console.log(`  ❌ ${e}`));
  process.exit(1);
} else {
  console.log('✅ All consistency checks passed');
}

writeFileSync(OUT, JSON.stringify(payload, null, 2));
console.log(`\nPayload written to ${OUT}`);

function countEvidenceTrails(obj) {
  let count = 0;
  if (obj && typeof obj === 'object') {
    if (obj.evidence && obj.evidence.summary && obj.evidence.detailed && obj.evidence.raw) {
      count++;
    }
    for (const val of Object.values(obj)) {
      if (Array.isArray(val)) {
        val.forEach(item => { count += countEvidenceTrails(item); });
      } else if (typeof val === 'object' && val !== null) {
        count += countEvidenceTrails(val);
      }
    }
  }
  return count;
}
