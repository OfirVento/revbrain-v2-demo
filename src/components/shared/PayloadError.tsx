import { AlertTriangle } from 'lucide-react';

export function PayloadError({ errors }: { errors: string[] }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[hsl(var(--background))]">
      <div className="max-w-xl w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-red-700">Payload Validation Failed</h1>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              assessment-payload.json does not conform to assessment-schema.json
            </p>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-2 font-mono text-sm">
          {errors.map((e, i) => (
            <div key={i} className="text-red-700">
              <span className="text-red-400 mr-2">{i + 1}.</span>
              {e}
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-[hsl(var(--muted-foreground))]">
          Fix the payload and reload. See{' '}
          <code className="font-mono bg-[hsl(var(--muted))] px-1 rounded">
            scripts/generate-payload.mjs
          </code>{' '}
          to regenerate.
        </p>
      </div>
    </div>
  );
}
