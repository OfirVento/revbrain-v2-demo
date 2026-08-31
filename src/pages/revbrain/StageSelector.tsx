import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { STAGES } from './revbrain-data';

export function StageSelector() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-[hsl(var(--border))]">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[hsl(var(--accent))]" />
          <span className="text-lg font-semibold text-[hsl(var(--foreground))]">
            RevBrain
          </span>
        </div>
        <Link
          to="/"
          className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
        >
          ← Back to app
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        {/* Quick demo CTA */}
        <button
          onClick={() => navigate('/revbrain/migration/si-architect')}
          className="mb-10 group flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-[hsl(var(--accent))]/30 hover:border-[hsl(var(--accent))]/60 transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
              Continue demo as SI Architect
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Vector Systems · Implementation · Enterprise Discount Approval
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-[hsl(var(--accent))] opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
        </button>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[hsl(var(--foreground))] mb-3">
            Choose Your Stage
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] max-w-lg mx-auto">
            RevBrain adapts to where you are in your revenue lifecycle.
            Select a stage to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {STAGES.map((stage) => {
            const Icon = stage.icon;
            return (
              <button
                key={stage.id}
                onClick={() => navigate(stage.path)}
                className="group relative bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[hsl(var(--accent)/.08)] hover:border-[hsl(var(--accent)/.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
              >
                {/* Gradient icon area */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${stage.color} mb-4`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <h2 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2 flex items-center gap-2">
                  {stage.label}
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 transition-all group-hover:opacity-60 group-hover:translate-x-0 text-[hsl(var(--muted-foreground))]" />
                </h2>

                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {stage.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Footer label */}
        <p className="mt-16 text-xs text-[hsl(var(--muted-foreground))] tracking-wide uppercase">
          RevBrain v2 · Preview
        </p>
      </main>
    </div>
  );
}
