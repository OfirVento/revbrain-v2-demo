import { useParams, useNavigate, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import {
  STAGES,
  MIGRATION_ROLES,
  ONGOING_ROLES,
  type Role,
} from './revbrain-data';

function getRolesForStage(stageId: string): Role[] {
  switch (stageId) {
    case 'migration':
      return MIGRATION_ROLES;
    case 'ongoing':
      return ONGOING_ROLES;
    default:
      return [];
  }
}

export function RoleSelector() {
  const { stage: stageId } = useParams<{ stage: string }>();
  const navigate = useNavigate();

  const stage = STAGES.find((s) => s.id === stageId);

  // Knowledge stage has its own page
  if (stageId === 'knowledge') {
    return <Navigate to="/revbrain/knowledge" replace />;
  }

  if (!stage) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[hsl(var(--muted-foreground))] mb-4">
            Stage not found.
          </p>
          <Link
            to="/revbrain"
            className="text-sm text-[hsl(var(--accent))] hover:underline"
          >
            ← Back to RevBrain
          </Link>
        </div>
      </div>
    );
  }

  const roles = getRolesForStage(stage.id);
  const StageIcon = stage.icon;

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
      <main className="flex-1 px-6 py-10 max-w-4xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] mb-8">
          <Link
            to="/revbrain"
            className="hover:text-[hsl(var(--foreground))] transition-colors"
          >
            RevBrain
          </Link>
          <span>/</span>
          <span className="text-[hsl(var(--foreground))] font-medium">
            {stage.label}
          </span>
        </nav>

        {/* Back button */}
        <button
          onClick={() => navigate('/revbrain')}
          className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Stage header */}
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${stage.color}`}
          >
            <StageIcon className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">
            {stage.label}
          </h1>
        </div>
        <p className="text-[hsl(var(--muted-foreground))] mb-10 ml-[52px]">
          Select your role to access your personalised workspace.
        </p>

        {/* Demo CTA — shown only for migration stage */}
        {stage.id === 'migration' && (
          <button
            onClick={() => navigate('/revbrain/migration/si-architect')}
            className="w-full mb-6 group flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-[hsl(var(--accent))]/30 hover:border-[hsl(var(--accent))]/60 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
                Continue demo as SI Architect
              </p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Vector Systems · Enterprise Discount Approval · 4 screens ready
              </p>
            </div>
          </button>
        )}

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {roles.map((role) => {
            const RoleIcon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => navigate(`/revbrain/${stage.id}/${role.slug}`)}
                className="group bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[hsl(var(--accent)/.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[hsl(var(--muted))] flex items-center justify-center">
                    <RoleIcon className="h-5 w-5 text-[hsl(var(--foreground))]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1 flex items-center gap-2">
                      {role.label}
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-60 group-hover:translate-x-0 text-[hsl(var(--muted-foreground))]" />
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3 leading-relaxed">
                      {role.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {role.workspaces.map((ws) => (
                        <span
                          key={ws}
                          className="inline-block px-2 py-0.5 text-xs rounded-md bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                        >
                          {ws}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
