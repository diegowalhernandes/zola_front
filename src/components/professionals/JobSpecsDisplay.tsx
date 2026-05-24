import { JobSpecs, ProfessionalType } from '../../types';
import { PROFESSIONAL_TYPE_LABELS, SPEC_FIELD_LABELS, formatSpecValue } from '../../constants/professionalSpecs';

type Props = {
  type?: ProfessionalType;
  specs?: JobSpecs;
};

export function JobSpecsDisplay({ type, specs }: Props) {
  if (!type || !specs || Object.keys(specs).length === 0) {
    return (
      <p className="text-sm text-slate-500">
        Especificações da vaga ainda não informadas pelo profissional.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-700 dark:bg-brand-900/30 dark:text-brand-100">
        {PROFESSIONAL_TYPE_LABELS[type]}
      </span>
      <dl className="grid gap-3 sm:grid-cols-2">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {SPEC_FIELD_LABELS[key] ?? key}
            </dt>
            <dd className="mt-1 font-semibold text-slate-800 dark:text-slate-100">
              {formatSpecValue(key, value)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
