import { JobSpecs, ProfessionalType } from '../../types';
import {
  defaultJobSpecs,
  getSpecFields,
  PROFESSIONAL_TYPE_LABELS,
  PROFESSIONAL_TYPES,
} from '../../constants/professionalSpecs';

export type ProfessionalOnboardingData = {
  professional_type: ProfessionalType;
  city: string;
  state: string;
  title: string;
  description: string;
  price_from: string;
  job_specs: JobSpecs;
};

type Props = {
  value: ProfessionalOnboardingData;
  onChange: (value: ProfessionalOnboardingData) => void;
};

function updateSpec(
  current: JobSpecs,
  key: string,
  value: string | number | boolean | string[]
): JobSpecs {
  return { ...current, [key]: value };
}

export function ProfessionalOnboardingFields({ value, onChange }: Props) {
  const specFields = getSpecFields(value.professional_type);

  return (
    <div className="space-y-4 rounded-3xl border border-brand-200/80 bg-brand-50/40 p-4 dark:border-brand-800/40 dark:bg-brand-900/10">
      <p className="text-sm font-semibold text-brand-700 dark:text-brand-200">
        Dados do perfil profissional
      </p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {PROFESSIONAL_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() =>
              onChange({
                ...value,
                professional_type: type,
                job_specs: defaultJobSpecs(type),
                title: value.title || `${PROFESSIONAL_TYPE_LABELS[type]} experiente`,
              })
            }
            className={
              value.professional_type === type
                ? 'rounded-2xl bg-brand-600 py-2 text-sm font-bold text-white'
                : 'rounded-2xl border border-slate-200 bg-white py-2 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900'
            }
          >
            {PROFESSIONAL_TYPE_LABELS[type]}
          </button>
        ))}
      </div>

      <input
        className="input"
        placeholder="Título do perfil (ex: Diarista residencial)"
        value={value.title}
        onChange={(e) => onChange({ ...value, title: e.target.value })}
        required
      />

      <textarea
        className="input h-24"
        placeholder="Descreva sua experiência e o tipo de serviço que oferece"
        value={value.description}
        onChange={(e) => onChange({ ...value, description: e.target.value })}
        required
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="input"
          placeholder="Cidade"
          value={value.city}
          onChange={(e) => onChange({ ...value, city: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="UF"
          maxLength={2}
          value={value.state}
          onChange={(e) => onChange({ ...value, state: e.target.value.toUpperCase() })}
          required
        />
      </div>

      <input
        className="input"
        type="number"
        min={0}
        placeholder="Preço a partir de (R$)"
        value={value.price_from}
        onChange={(e) => onChange({ ...value, price_from: e.target.value })}
      />

      <div className="border-t border-brand-200 pt-4 dark:border-brand-800">
        <p className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
          Especificações da vaga ({PROFESSIONAL_TYPE_LABELS[value.professional_type]})
        </p>
        <div className="space-y-3">
          {specFields.map((field) => {
            const current = value.job_specs[field.key];

            if (field.type === 'boolean') {
              return (
                <label key={field.key} className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={Boolean(current)}
                    onChange={(e) =>
                      onChange({
                        ...value,
                        job_specs: updateSpec(value.job_specs, field.key, e.target.checked),
                      })
                    }
                  />
                  {field.label}
                </label>
              );
            }

            if (field.type === 'select') {
              return (
                <label key={field.key} className="block text-sm">
                  <span className="mb-1 block font-semibold">{field.label}</span>
                  <select
                    className="input"
                    value={String(current ?? field.options[0])}
                    onChange={(e) =>
                      onChange({
                        ...value,
                        job_specs: updateSpec(value.job_specs, field.key, e.target.value),
                      })
                    }
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }

            if (field.type === 'multiselect') {
              const selected = Array.isArray(current) ? current : [];
              return (
                <div key={field.key}>
                  <span className="mb-2 block text-sm font-semibold">{field.label}</span>
                  <div className="flex flex-wrap gap-2">
                    {field.options.map((option) => {
                      const active = selected.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            const next = active
                              ? selected.filter((item) => item !== option)
                              : [...selected, option];
                            onChange({
                              ...value,
                              job_specs: updateSpec(value.job_specs, field.key, next),
                            });
                          }}
                          className={
                            active
                              ? 'rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white'
                              : 'rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold dark:border-slate-700'
                          }
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <label key={field.key} className="block text-sm">
                <span className="mb-1 block font-semibold">{field.label}</span>
                <input
                  className="input"
                  type="number"
                  min={0}
                  value={current === undefined ? '' : String(current)}
                  onChange={(e) =>
                    onChange({
                      ...value,
                      job_specs: updateSpec(
                        value.job_specs,
                        field.key,
                        e.target.value ? Number(e.target.value) : 0
                      ),
                    })
                  }
                />
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const emptyProfessionalOnboarding = (): ProfessionalOnboardingData => ({
  professional_type: 'diarista',
  city: '',
  state: 'SP',
  title: '',
  description: '',
  price_from: '',
  job_specs: defaultJobSpecs('diarista'),
});
