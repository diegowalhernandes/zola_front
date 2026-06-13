import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCreditCard, FiShield } from 'react-icons/fi';
import { checkoutBatch, getDepositPreview } from '../services/appointmentService';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { parseApiError } from '../services/api';
import { BookingPaymentState, DepositPreview, PaymentMode } from '../types';

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
    <section className="container-page py-10">
      <Link to={`/profissional/${state.professionalId}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
        <FiArrowLeft /> Voltar ao perfil
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="card p-6">
          <h1 className="heading-page">Pagamento do agendamento</h1>
          <p className="mt-2 text-muted">
            Profissional: <strong>{state.professionalName}</strong>
          </p>

          <div className="mt-6 space-y-3">
            <h2 className="text-lg font-bold">Horários reservados</h2>
            {state.slots.map((slot) => (
              <div key={`${slot.appointment_date}-${slot.time_slot}`} className="list-row">
                <strong>{formatDisplayDate(slot.appointment_date)}</strong>
                <p className="text-sm text-muted">às {slot.time_slot}</p>
              </div>
            ))}
          </div>

          {state.notes && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-800">
              <strong>Observações:</strong> {state.notes}
            </div>
          )}
        </div>

        <aside className="card h-max p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <FiCreditCard className="text-brand-600" />
            Como deseja pagar?
          </h2>

          {loading && <p className="mt-4 text-muted">Calculando valores...</p>}

          {!loading && preview && (
            <div className="mt-4 space-y-3">
              <label className="flex cursor-pointer gap-3 rounded-2xl border border-sage-200 bg-sage-50/60 p-4 dark:border-sage-800 dark:bg-sage-900/20">
                <input
                  type="radio"
                  name="payment_mode"
                  checked={paymentMode === 'deposit'}
                  onChange={() => setPaymentMode('deposit')}
                  className="mt-1"
                />
                <span>
                  <strong className="block">Pagar apenas o sinal</strong>
                  <span className="text-sm text-muted">
                    {preview.deposit_percent}% do valor ({formatCurrency(preview.deposit_amount)})
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer gap-3 rounded-2xl border border-brand-200 bg-brand-50/60 p-4 dark:border-brand-800 dark:bg-brand-900/20">
                <input
                  type="radio"
                  name="payment_mode"
                  checked={paymentMode === 'full'}
                  onChange={() => setPaymentMode('full')}
                  className="mt-1"
                />
                <span>
                  <strong className="block">Pagar valor total agora</strong>
                  <span className="text-sm text-muted">{formatCurrency(preview.total_amount)}</span>
                </span>
              </label>

              <div className="rounded-2xl border border-accent-200 bg-accent-50/80 p-4 dark:border-accent-700/40 dark:bg-accent-900/20">
                <p className="text-sm font-bold">Total a pagar agora</p>
                <p className="mt-1 text-2xl font-black text-brand-700 dark:text-white">{formatCurrency(amountDue)}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-muted">
                  <FiShield />
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
