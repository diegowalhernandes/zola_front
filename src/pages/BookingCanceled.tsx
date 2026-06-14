import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import { cancelAwaitingBatch, cancelAwaitingPayment } from '../services/appointmentService';

export default function BookingCanceled() {
  const [params] = useSearchParams();
  const batchId = params.get('batch_id');
  const appointmentId = params.get('appointment_id');

  useEffect(() => {
    if (batchId) {
      cancelAwaitingBatch(batchId).catch(() => {});
      return;
    }
    if (appointmentId) {
      cancelAwaitingPayment(Number(appointmentId)).catch(() => {});
    }
  }, [batchId, appointmentId]);

  return (
    <section className="container-page py-12 sm:py-20">
      <div className="card mx-auto max-w-lg p-6 text-center sm:p-8">
        <FiAlertCircle className="mx-auto text-5xl text-accent-500" />
        <h1 className="heading-page mt-4">Pagamento não concluído</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Os horários não foram reservados. Você pode escolher outros horários e tentar novamente.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/buscar" className="btn-primary w-full sm:w-auto">
            Voltar à busca
          </Link>
          <Link to="/" className="btn-secondary w-full sm:w-auto">
            Ir para início
          </Link>
        </div>
      </div>
    </section>
  );
}
