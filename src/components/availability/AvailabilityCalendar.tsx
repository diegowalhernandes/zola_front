import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiClock, FiX } from 'react-icons/fi';
import {
  getProfessionalAvailability,
  parseSlotKey,
  slotKey,
} from '../../services/appointmentService';
import { DayAvailability } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  ProfessionalType,
  formatSlotLabel,
  isDiaristaType,
} from '../../constants/professionalSpecs';

type Props = {
  professionalId: number;
  professionalName: string;
  professionalType?: ProfessionalType;
};

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatDisplayDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
}

function formatSlotSummary(date: string, slot: string, professionalType?: ProfessionalType) {
  const label = formatSlotLabel(slot, professionalType);
  if (isDiaristaType(professionalType)) {
    return `${formatDisplayDate(date)} · ${label}`;
  }
  return `${formatDisplayDate(date)} às ${label}`;
}

export function AvailabilityCalendar({ professionalId, professionalName, professionalType }: Props) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const [days, setDays] = useState<DayAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState('');
  const isDiarista = isDiaristaType(professionalType);

  const range = useMemo(() => {
    const from = new Date();
    const to = new Date();
    to.setDate(to.getDate() + 27);
    return { from: toIsoDate(from), to: toIsoDate(to) };
  }, []);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const availability = await getProfessionalAvailability(professionalId, range.from, range.to);
        setDays(availability);
        if (availability.length > 0) {
          setSelectedDate(availability[0].date);
        }
      } catch (error) {
        console.error(error);
        setDays([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [professionalId, range.from, range.to]);

  const slotsForSelectedDay = days.find((day) => day.date === selectedDate)?.slots ?? [];

  function toggleSlot(date: string, time: string) {
    const key = slotKey(date, time);
    setSelectedSlots((current) => {
      const next = new Set(current);
      if (next.has(key)) {
        next.delete(key);
        return next;
      }

      if (isDiarista) {
        for (const existingKey of next) {
          const { appointment_date } = parseSlotKey(existingKey);
          if (appointment_date === date) {
            next.delete(existingKey);
          }
        }
      }

      next.add(key);
      return next;
    });
  }

  function removeSlot(key: string) {
    setSelectedSlots((current) => {
      const next = new Set(current);
      next.delete(key);
      return next;
    });
  }

  function handleContinue() {
    if (selectedSlots.size === 0) {
      return toast(isDiarista ? 'Selecione ao menos um turno.' : 'Selecione ao menos um horário.');
    }

    if (!isAuthenticated || user?.role !== 'client') {
      return toast('Faça login como cliente para agendar.');
    }

    const slots = Array.from(selectedSlots).map(parseSlotKey);
    navigate('/agendamento/pagamento', {
      state: {
        professionalId,
        professionalName,
        professionalType,
        slots,
        notes: notes.trim() || undefined,
      },
    });
  }

  if (loading) {
    return <div className="h-48 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800" />;
  }

  if (days.length === 0) {
    return (
      <p className="rounded-2xl bg-amber-50 p-4 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-100">
        Este profissional ainda não configurou {isDiarista ? 'turnos' : 'horários'} na agenda. Entre em contato para combinar.
      </p>
    );
  }

  const slotNoun = isDiarista ? 'turno' : 'horário';
  const slotNounPlural = isDiarista ? 'turnos' : 'horários';

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted">
        {isDiarista
          ? 'Selecione um turno por dia (manhã, tarde ou dia inteiro). Você pode reservar vários dias.'
          : 'Selecione horários em quantos dias quiser. Você pode trocar de dia sem perder os horários já escolhidos.'}
      </p>

      <div>
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <FiCalendar className="text-brand-600" />
          Dias disponíveis
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              key={day.date}
              type="button"
              onClick={() => setSelectedDate(day.date)}
              className={
                selectedDate === day.date ? 'day-tab day-tab-active' : 'day-tab day-tab-inactive'
              }
            >
              {formatDisplayDate(day.date)}
              <span className="ml-2 text-xs opacity-80">({day.slots.length})</span>
            </button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div>
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <FiClock className="text-brand-600" />
            {isDiarista ? 'Turnos' : 'Horários'} em {formatDisplayDate(selectedDate)}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {slotsForSelectedDay.map((slot) => {
              const key = slotKey(selectedDate, slot);
              const active = selectedSlots.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleSlot(selectedDate, slot)}
                  className={active ? 'slot-btn slot-btn-selected' : 'slot-btn slot-btn-available'}
                >
                  {formatSlotLabel(slot, professionalType)}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selectedSlots.size > 0 && (
        <div className="rounded-2xl border border-brand-200/80 bg-brand-50/50 p-4 dark:border-brand-800 dark:bg-brand-900/20 sm:p-5">
          <h4 className="text-sm font-bold text-brand-800 dark:text-brand-100">
            {slotNounPlural.charAt(0).toUpperCase() + slotNounPlural.slice(1)} selecionados ({selectedSlots.size})
          </h4>
          <ul className="mt-3 space-y-2">
            {Array.from(selectedSlots).map((key) => {
              const { appointment_date, time_slot } = parseSlotKey(key);
              return (
                <li
                  key={key}
                  className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2 text-sm dark:bg-brand-950/40"
                >
                  <span>{formatSlotSummary(appointment_date, time_slot, professionalType)}</span>
                  <button
                    type="button"
                    onClick={() => removeSlot(key)}
                    className="text-muted hover:text-red-600"
                    aria-label={`Remover ${slotNoun}`}
                  >
                    <FiX />
                  </button>
                </li>
              );
            })}
          </ul>

          <textarea
            className="input mt-3 h-20"
            placeholder="Observações para o profissional (opcional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <button type="button" className="btn-primary mt-3 w-full" onClick={handleContinue}>
            Continuar para pagamento ({selectedSlots.size} {selectedSlots.size > 1 ? slotNounPlural : slotNoun})
          </button>
        </div>
      )}
    </div>
  );
}
