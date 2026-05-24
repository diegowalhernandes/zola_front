import { useEffect, useMemo, useState } from 'react';
import { FiCalendar, FiClock } from 'react-icons/fi';
import { getProfessionalAvailability, bookAppointment } from '../../services/appointmentService';
import { DayAvailability } from '../../types';
import { useToast } from '../../contexts/ToastContext';
import { useAuth } from '../../contexts/AuthContext';
import { parseApiError } from '../../services/api';

type Props = {
  professionalId: number;
  professionalName: string;
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

export function AvailabilityCalendar({ professionalId, professionalName }: Props) {
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const [days, setDays] = useState<DayAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [booking, setBooking] = useState(false);

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
        const data = await getProfessionalAvailability(professionalId, range.from, range.to);
        setDays(data);
        if (data.length > 0) {
          setSelectedDate(data[0].date);
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

  async function handleBook() {
    if (!selectedDate || !selectedSlot) {
      return toast('Selecione um dia e horário disponível.');
    }

    if (!isAuthenticated || user?.role !== 'client') {
      return toast('Faça login como cliente para agendar um horário.');
    }

    setBooking(true);
    try {
      await bookAppointment({
        professional_id: professionalId,
        appointment_date: selectedDate,
        time_slot: selectedSlot,
        notes: notes.trim() || undefined,
      });
      toast(`Agendamento solicitado com ${professionalName} para ${formatDisplayDate(selectedDate)} às ${selectedSlot}.`);
      setSelectedSlot(null);
      setNotes('');
      const refreshed = await getProfessionalAvailability(professionalId, range.from, range.to);
      setDays(refreshed);
    } catch (error) {
      toast(parseApiError(error).message);
    } finally {
      setBooking(false);
    }
  }

  if (loading) {
    return <div className="h-48 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800" />;
  }

  if (days.length === 0) {
    return (
      <p className="rounded-2xl bg-amber-50 p-4 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-100">
        Este profissional ainda não configurou horários na agenda. Entre em contato para combinar.
      </p>
    );
  }

  return (
    <div className="space-y-5">
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
              onClick={() => {
                setSelectedDate(day.date);
                setSelectedSlot(null);
              }}
              className={
                selectedDate === day.date
                  ? 'rounded-2xl bg-brand-600 px-4 py-2 text-sm font-bold text-white'
                  : 'rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
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
            Horários em {formatDisplayDate(selectedDate)}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {slotsForSelectedDay.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={
                  selectedSlot === slot
                    ? 'rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white'
                    : 'rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'
                }
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedSlot && (
        <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-4 dark:border-brand-800 dark:bg-brand-900/20">
          <p className="text-sm font-semibold text-brand-800 dark:text-brand-100">
            Resumo: {formatDisplayDate(selectedDate!)} às {selectedSlot}
          </p>
          <textarea
            className="input mt-3 h-20"
            placeholder="Observações para o profissional (opcional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <button type="button" className="btn-primary mt-3 w-full" disabled={booking} onClick={handleBook}>
            {booking ? 'Agendando...' : 'Confirmar agendamento'}
          </button>
        </div>
      )}
    </div>
  );
}
