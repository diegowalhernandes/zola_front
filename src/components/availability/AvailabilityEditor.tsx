import { WeeklyAvailability } from '../../types';
import {
  DIARISTA_TURN_OPTIONS,
  ProfessionalType,
  TIME_SLOT_OPTIONS,
  WEEKDAYS,
  isDiaristaType,
  sortAvailabilitySlots,
} from '../../constants/professionalSpecs';

type Props = {
  professionalType?: ProfessionalType;
  value: WeeklyAvailability;
  onChange: (value: WeeklyAvailability) => void;
};

export function AvailabilityEditor({ professionalType, value, onChange }: Props) {
  const isDiarista = isDiaristaType(professionalType);
  const slotOptions = isDiarista
    ? DIARISTA_TURN_OPTIONS.map((option) => ({ value: option.value, label: option.label }))
    : TIME_SLOT_OPTIONS.map((slot) => ({ value: slot, label: slot }));

  function toggleSlot(dayKey: string, slot: string) {
    const current = value[dayKey] ?? [];
    const next = current.includes(slot)
      ? current.filter((item) => item !== slot)
      : sortAvailabilitySlots([...current, slot], professionalType);
    onChange({ ...value, [dayKey]: next });
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        {isDiarista
          ? 'Marque os turnos em que você atende. Cada reserva ocupa um turno (manhã, tarde ou dia inteiro).'
          : 'Marque os horários disponíveis para atendimento por hora.'}
      </p>
      {WEEKDAYS.map((day) => (
        <div key={day.key} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          <p className="mb-2 text-sm font-bold">{day.label}</p>
          <div className="flex flex-wrap gap-2">
            {slotOptions.map((slot) => {
              const active = (value[day.key] ?? []).includes(slot.value);
              return (
                <button
                  key={slot.value}
                  type="button"
                  onClick={() => toggleSlot(day.key, slot.value)}
                  className={
                    active
                      ? 'rounded-xl bg-brand-600 px-3 py-1 text-xs font-bold text-white'
                      : 'rounded-xl border border-slate-200 px-3 py-1 text-xs font-semibold dark:border-slate-700'
                  }
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
