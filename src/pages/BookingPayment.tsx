import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCreditCard, FiShield } from 'react-icons/fi';
import { checkoutBatch, getDepositPreview } from '../services/appointmentService';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { parseApiError } from '../services/api';
import { BookingPaymentState, DepositPreview, PaymentMode } from '../types';
import { formatSlotLabel, isDiaristaType } from '../constants/professionalSpecs';

function formatDisplayDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function BookingPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();
  const state = location.state as BookingPaymentState | null;

  const [preview, setPreview] = useState<DepositPreview | null>(null);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('deposit');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const slotCount = state?.slots.length ?? 0;
  const isDiarista = isDiaristaType(state?.professionalType);
  const slotLabel = isDiarista ? 'turno' : 'horário';
  const slotLabelPlural = isDiarista ? 'turnos' : 'horários';

  const amountDue = useMemo(() => {
    if (!preview) return 0;
    return paymentMode === 'full' ? preview.total_amount : preview.deposit_amount;
  }, [paymentMode, preview]);

  useEffect(() => {
    if (!state?.professionalId || slotCount === 0) return;

    getDepositPreview(state.professionalId, slotCount)
      .then(setPreview)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [state?.professionalId, slotCount]);

  if (!isAuthenticated || user?.role !== 'client') {
    return <Navigate to="/login" replace />;
  }

  if (!state?.professionalId || !state.slots?.length) {
    return <Navigate to="/buscar" replace />;
  }

  async function handleConfirm() {
    setSubmitting(true);
    try {
      const result = await checkoutBatch({
        professional_id: state.professionalId,
        slots: state.slots,
        notes: state.notes,
        payment_mode: paymentMode,
      });

      if (result.payments_required && result.checkout_url) {
        toast('Redirecionando para pagamento...');
        window.location.href = result.checkout_url;
        return;
      }

      toast('Agendamento confirmado!');
      navigate('/dashboard/cliente', { replace: true });
    } catch (error) {
      toast(parseApiError(error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="container-page py-5 sm:py-10">
      <Link
        to={`/profissional/${state.professionalId}`}
        className="inline-flex min-h-touch items-center gap-2 text-sm font-semibold text-brand-600"
      >
        <FiArrowLeft /> Voltar ao perfil
      </Link>

      <header className="page-header mt-4">
        <h1 className="heading-page">Pagamento do agendamento</h1>
        <p className="text-sm text-muted sm:text-base">
          Profissional: <strong className="text-ink dark:text-white">{state.professionalName}</strong>
        </p>
      </header>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_380px] lg:gap-8">
        <div className="section-card">
          <h2 className="section-card-title">{isDiarista ? 'Turnos reservados' : 'Horários reservados'}</h2>
          <p className="section-card-subtitle">
            {slotCount} {slotCount > 1 ? slotLabelPlural : slotLabel} selecionado{slotCount > 1 ? 's' : ''}
          </p>

          <div className="mt-4 space-y-2">
            {state.slots.map((slot) => (
              <div key={`${slot.appointment_date}-${slot.time_slot}`} className="list-row">
                <strong className="text-sm sm:text-base">{formatDisplayDate(slot.appointment_date)}</strong>
                <p className="text-sm text-muted">
                  {isDiarista ? formatSlotLabel(slot.time_slot, 'diarista') : `às ${formatSlotLabel(slot.time_slot)}`}
                </p>
              </div>
            ))}
          </div>

          {state.notes && (
            <div className="mt-4 rounded-xl bg-cream-100 p-4 text-sm dark:bg-brand-900/30">
              <strong className="text-ink dark:text-white">Observações:</strong>{' '}
              <span className="text-muted">{state.notes}</span>
            </div>
          )}
        </div>

        <aside className="section-card lg:sticky lg:top-24 lg:h-max">
          <h2 className="section-card-title flex items-center gap-2">
            <FiCreditCard className="text-brand-600" />
            Como deseja pagar?
          </h2>

          {loading && <p className="mt-4 text-sm text-muted">Calculando valores...</p>}

          {!loading && preview && (
            <div className="mt-4 space-y-3">
              <label className="flex cursor-pointer gap-3 rounded-xl border-2 border-brand-200/80 bg-brand-50/60 p-4 transition-colors has-[:checked]:border-brand-500 dark:border-brand-800 dark:bg-brand-900/20">
                <input
                  type="radio"
                  name="payment_mode"
                  checked={paymentMode === 'deposit'}
                  onChange={() => setPaymentMode('deposit')}
                  className="mt-1 h-5 w-5 shrink-0 accent-brand-600"
                />
                <span>
                  <strong className="block text-sm sm:text-base">Pagar apenas o sinal</strong>
                  <span className="text-sm text-muted">
                    {preview.deposit_percent}% ({formatCurrency(preview.deposit_amount)})
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer gap-3 rounded-xl border-2 border-brand-200/80 bg-brand-50/50 p-4 transition-colors has-[:checked]:border-brand-500 dark:border-brand-800 dark:bg-brand-900/20">
                <input
                  type="radio"
                  name="payment_mode"
                  checked={paymentMode === 'full'}
                  onChange={() => setPaymentMode('full')}
                  className="mt-1 h-5 w-5 shrink-0 accent-brand-600"
                />
                <span>
                  <strong className="block text-sm sm:text-base">Pagar valor total agora</strong>
                  <span className="text-sm text-muted">{formatCurrency(preview.total_amount)}</span>
                </span>
              </label>

              <div className="rounded-xl border border-accent-200/80 bg-accent-50/70 p-4 dark:border-accent-700/30 dark:bg-accent-900/15">
                <p className="text-sm font-bold text-ink dark:text-white">Total a pagar agora</p>
                <p className="mt-1 font-display text-2xl font-black text-brand-700 dark:text-white">
                  {formatCurrency(amountDue)}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-xs leading-relaxed text-muted">
                  <FiShield className="shrink-0 text-brand-600" />
                  {preview.payments_enabled
                    ? 'O horário só fica bloqueado após a confirmação do pagamento.'
                    : 'Modo teste: agendamento confirmado sem cobrança.'}
                </p>
              </div>

              <button
                type="button"
                className="btn-accent w-full shadow-warm"
                disabled={submitting}
                onClick={handleConfirm}
              >
                {submitting
                  ? 'Processando...'
                  : preview.payments_enabled
                    ? `Confirmar e pagar ${formatCurrency(amountDue)}`
                    : 'Confirmar agendamento'}
              </button>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}
