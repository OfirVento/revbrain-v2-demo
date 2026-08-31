import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import type { AssessmentPayload } from '@/types/assessment';

// Static imports — JSON imported directly by Vite (resolveJsonModule via moduleResolution: bundler)
// Paths are relative to this file: src/lib/assessment/loader.ts → ../../inputs/
import schema from '../../../inputs/assessment-schema.json';
import payload from '../../../inputs/assessment-payload.json';

export interface LoadResult {
  data: AssessmentPayload | null;
  errors: string[] | null;
}

let _cached: LoadResult | null = null;

export function loadAssessmentPayload(): LoadResult {
  if (_cached) return _cached;

  try {
    const ajv = new Ajv2020({ allErrors: true, strict: false });
    addFormats(ajv);
    const validate = ajv.compile(schema);
    const valid = validate(payload);

    if (!valid && validate.errors) {
      const errors = validate.errors.map(
        (e) => `${e.instancePath || '(root)'} ${e.message}`
      );
      _cached = { data: null, errors };
      return _cached;
    }

    _cached = { data: payload as AssessmentPayload, errors: null };
    return _cached;
  } catch (e) {
    _cached = { data: null, errors: [`Failed to load payload: ${String(e)}`] };
    return _cached;
  }
}
