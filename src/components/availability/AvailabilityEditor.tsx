import { WeeklyAvailability } from '../../types';
import { TIME_SLOT_OPTIONS, WEEKDAYS } from '../../constants/professionalSpecs';

type Props = {
  value: WeeklyAvailability;
  onChange: (value: WeeklyAvailability) => void;
};

export function AvailabilityEditor({ value, onChange }: Props) {
  function toggleSlot(dayKey: string, slot: string) {
    const current = value[dayKey] ?? [];
    const next = current.includes(slot)
      ? current.filter((item) => item !== slot)
      : [...current, slot].sort();
    onChange({ ...value, [dayKey]: next });
  }

  return (
    <div className="space-y-4">
      {WEEKDAYS.map((day) => (
        <div key={day.key} className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          <p className="mb-2 text-sm font-bold">{day.label}</p>
          <div className="flex flex-wrap gap-2">
            {TIME_SLOT_OPTIONS.map((slot) => {
              const active = (value[day.key] ?? []).includes(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => toggleSlot(day.key, slot)}
                  className={
                    active
                      ? 'rounded-xl bg-brand-600 px-3 py-1 text-xs font-bold text-white'
                      : 'rounded-xl border border-slate-200 px-3 py-1 text-xs font-semibold dark:border-slate-700'
                  }
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
