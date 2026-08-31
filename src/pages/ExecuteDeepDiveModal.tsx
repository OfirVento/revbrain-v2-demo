import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';
import { TYPE_GLYPHS, COMPLEXITY_COLORS } from './scope-phases-data';
import { getItem, SOURCE_SNIPPETS, DRAFT_SNIPPETS, OUTPUT_TYPES, BUSINESS_LOGIC, MIGRATION_NOTES, TEST_DESCRIPTIONS, DEPENDENCIES, AGENT_THREADS, type AgentMessage } from './execute-phase-data';

function TabBar({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex gap-1 border-b border-[hsl(var(--border))] mb-4">
      {tabs.map((t) => (
        <button key={t} onClick={() => onChange(t)} className={clsx(
          'px-3 py-2 text-xs font-medium transition-colors border-b-2 -mb-px',
          active === t ? 'border-[hsl(var(--accent))] text-[hsl(var(--foreground))]' : 'border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
        )}>{t}</button>
      ))}
    </div>
  );
}

function AgentThread({ messages }: { messages: AgentMessage[] }) {
  return (
    <div className="space-y-3 mt-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))]">AGENT INTERACTION</p>
      {messages.map((m, i) => (
        <div key={i} className={clsx('flex gap-2', m.role === 'architect' ? 'justify-end' : 'justify-start')}>
          {m.role === 'agent' && (
            <div className="w-6 h-6 rounded-full bg-[hsl(var(--accent))] flex items-center justify-center shrink-0 mt-1">
              <span className="text-white text-[9px] font-bold">V</span>
            </div>
          )}
          <div className={clsx('max-w-[75%] rounded-lg px-3 py-2.5 text-sm leading-relaxed whitespace-pre-line',
            m.role === 'architect' ? 'bg-[hsl(var(--accent))]/10 text-[hsl(var(--foreground))]' : 'bg-[hsl(var(--card))] border border-[hsl(var(--border))]'
          )}>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1">{m.role === 'architect' ? 'ARCHITECT' : 'REVBRAIN AGENT'}</p>
            {m.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ExecuteDeepDiveModal({ artifactId, phase, onClose }: { artifactId: string; phase: string; onClose: () => void }) {
  const item = getItem(artifactId);
  const [tab, setTab] = useState('Source');

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  if (!item) return null;

  const glyph = TYPE_GLYPHS[item.type] ?? '•';
  const outputType = OUTPUT_TYPES[artifactId] ?? item.type;
  const isStub = item.stub === true;
  const stubSrc = item.type.includes('Apex')
    ? `// ${item.name} — current CPQ logic\npublic class ${item.name.replace(/\s+/g,'')} {\n  public void execute() {\n    // Core logic for ${item.name}\n    // Detailed analysis pending architect review\n    System.debug('${item.name} executing');\n  }\n}`
    : item.type === 'Flow'
    ? `// Flow: ${item.name.replace(/\s+/g,'_')}\n// ${item.description}\n// Flow logic pending architect review\nIF (condition) {\n  executeAction();\n}`
    : `// CustomMetadata: ${item.name.replace(/\s+/g,'_')}__mdt\n// ${item.description}\n// Configuration pending architect review\nmetadataRecords = getAll();`;
  const src = SOURCE_SNIPPETS[artifactId] ?? item.source ?? stubSrc;
  const draft = DRAFT_SNIPPETS[artifactId] ?? item.migrationDraft ?? `Target output: ${outputType}. Migration approach pending architect review.`;
  const biz = BUSINESS_LOGIC[artifactId] ?? item.businessLogic ?? `${item.name} is a ${item.type} artifact in Vector Systems' CPQ org. ${item.description} Detailed analysis pending architect review.`;
  const migNote = MIGRATION_NOTES[artifactId] ?? item.migrationDraft ?? `Target output: ${outputType}. Standard migration path. Architect review required before final implementation.`;
  const tests = TEST_DESCRIPTIONS[artifactId] ?? item.testScenarios ?? ['Standard operation validation', 'Edge case handling'];
  const deps = DEPENDENCIES[artifactId] ?? item.dependencies ?? ['Dependencies to be validated during architect review'];
  const stubThread: AgentMessage[] = [
    { role: 'architect', text: 'Has this been deeply analyzed yet?' },
    { role: 'agent', text: `Initial classification complete. Full migration analysis scheduled for next architect review session. ${item.name} is on the queue based on phase priority.` },
  ];
  const thread = AGENT_THREADS[artifactId] ?? (isStub ? stubThread : AGENT_THREADS['_default']!);
  const tabs = ['Source', 'Business Logic', 'Migration Draft', 'Test Scenarios', 'Dependencies'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 animate-[fadeIn_150ms_ease]" />
      <div className="relative bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto animate-[scaleIn_150ms_ease] p-6" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[hsl(var(--muted-foreground))] mb-1">ARTIFACT DEEP DIVE</p>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-semibold text-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 px-2 py-0.5 rounded">{artifactId}</span>
              <span className={clsx('text-[9px] font-semibold px-1.5 py-0.5 rounded border', COMPLEXITY_COLORS[item.complexity])}>{item.complexity}</span>
              {isStub && <span className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-700 border border-yellow-200">PENDING REVIEW</span>}
            </div>
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <div className="flex items-center gap-3 mt-1 text-xs text-[hsl(var(--muted-foreground))]">
              <span>{glyph} {item.type}</span><span>•</span><span>{phase}</span><span>•</span><span>→ {outputType}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[hsl(var(--muted))] transition-colors"><X className="w-5 h-5" /></button>
        </div>

        <TabBar tabs={tabs} active={tab} onChange={setTab} />

        {tab === 'Source' && <pre className="bg-[hsl(var(--muted))] rounded-md p-4 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">{src}</pre>}
        {tab === 'Business Logic' && <p className="text-sm leading-relaxed">{biz}</p>}
        {tab === 'Migration Draft' && (
          <div className="space-y-3">
            <p className="text-sm leading-relaxed">{migNote}</p>
            <pre className="bg-[hsl(var(--muted))] rounded-md p-4 text-[11px] font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">{draft}</pre>
          </div>
        )}
        {tab === 'Test Scenarios' && <ul className="space-y-2">{tests.map((t) => <li key={t} className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">• {t}</li>)}</ul>}
        {tab === 'Dependencies' && <ul className="space-y-2">{deps.map((d) => <li key={d} className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">• {d}</li>)}</ul>}

        <div className="mt-6 pt-4 border-t border-[hsl(var(--border))]">
          <AgentThread messages={thread} />
        </div>
      </div>
    </div>
  );
}
