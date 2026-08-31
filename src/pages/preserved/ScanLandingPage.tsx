import { useNavigate } from 'react-router-dom';

export function ScanLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-xl bg-[hsl(var(--accent))] flex items-center justify-center shadow-lg shadow-[hsl(var(--accent))]/20">
            <span className="text-white font-bold text-lg">Q</span>
          </div>
          <span className="text-xl font-semibold text-[hsl(var(--foreground))]">RevBrain</span>
        </div>

        {/* Hero copy */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[hsl(var(--foreground))] mb-3 leading-tight">
          Map your CPQ in minutes.<br />Migrate with confidence.
        </h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed mb-8 max-w-md mx-auto">
          RevBrain scans your org, identifies migration complexity, and generates phased deployment plans for AI Revenue Management.
        </p>

        {/* CTA */}
        <button
          className="bg-[hsl(var(--accent))] text-white px-8 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity shadow-md shadow-[hsl(var(--accent))]/20"
          onClick={() => navigate('/scan/running')}
        >
          Scan Org
        </button>

        {/* Footer */}
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-8 italic">
          Vector Systems · Production org · OAuth-authenticated
        </p>
      </div>
    </div>
  );
}
