import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction, Sparkles } from 'lucide-react';
import {
  STAGES,
  MIGRATION_ROLES,
  ONGOING_ROLES,
  type Role,
} from './revbrain-data';

function findRole(stageId: string, roleSlug: string): Role | undefined {
  const pool =
    stageId === 'migration'
      ? MIGRATION_ROLES
      : stageId === 'ongoing'
        ? ONGOING_ROLES
        : [];
  return pool.find((r) => r.slug === roleSlug);
}

export function CommandCenterPlaceholder() {
  const { stage: stageId, role: roleSlug } = useParams<{
    stage: string;
    role: string;
  }>();
  const navigate = useNavigate();

  const stage = STAGES.find((s) => s.id === stageId);
  const role = stageId && roleSlug ? findRole(stageId, roleSlug) : undefined;

  if (!stage || !role) {
    return (
      <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[hsl(var(--muted-foreground))] mb-4">
            Role not found.
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

  const RoleIcon = role.icon;
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
      <main className="flex-1 px-6 py-10 max-w-3xl mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] mb-8">
          <Link
            to="/revbrain"
            className="hover:text-[hsl(var(--foreground))] transition-colors"
          >
            RevBrain
          </Link>
          <span>/</span>
          <Link
            to={stage.path}
            className="hover:text-[hsl(var(--foreground))] transition-colors"
          >
            {stage.label}
          </Link>
          <span>/</span>
          <span className="text-[hsl(var(--foreground))] font-medium">
            {role.label}
          </span>
        </nav>

        {/* Back button */}
        <button
          onClick={() => navigate(stage.path)}
          className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Stage badge */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${stage.color} text-white`}
          >
            <StageIcon className="h-3 w-3" />
            {stage.label}
          </span>
        </div>

        {/* Role heading */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-[hsl(var(--muted))] flex items-center justify-center">
            <RoleIcon className="h-5 w-5 text-[hsl(var(--foreground))]" />
          </div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">
            {role.label}
          </h1>
        </div>
        <p className="text-[hsl(var(--muted-foreground))] mb-10 ml-[52px]">
          {role.description}
        </p>

        {/* Planned workspaces */}
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-4">
          Planned Workspaces
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {role.workspaces.map((ws) => (
            <div
              key={ws}
              className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-lg p-4 flex items-center justify-between"
            >
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                {ws}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-[hsl(var(--muted-foreground))] bg-[hsl(var(--muted))] px-2 py-0.5 rounded-full">
                <Construction className="h-3 w-3" />
                Coming Soon
              </span>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="bg-[hsl(var(--muted))] border border-[hsl(var(--border))] rounded-lg p-4 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
          This command center is under construction. The workspace structure
          above represents the planned IA.
        </div>
      </main>
    </div>
  );
}
