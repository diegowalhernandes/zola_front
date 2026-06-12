import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import { cancelAwaitingPayment } from '../services/appointmentService';

export default function BookingCanceled() {
  const [params] = useSearchParams();
  const appointmentId = params.get('appointment_id');

  useEffect(() => {
    if (!appointmentId) return;

    cancelAwaitingPayment(Number(appointmentId)).catch(() => {
      // Reserva pode já ter expirado — ok
    });
  }, [appointmentId]);

  return (
    <section className="container-page py-20">
      <div className="card mx-auto max-w-lg p-8 text-center">
        <FiAlertCircle className="mx-auto text-5xl text-accent-500" />
        <h1 className="heading-page mt-4">Pagamento não concluído</h1>
        <p className="mt-3 text-muted">
          O horário não foi reservado. Você pode escolher outro horário e tentar novamente.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/buscar" className="btn-primary">
            Voltar à busca
          </Link>
          <Link to="/" className="btn-secondary">
            Ir para início
          </Link>
        </div>
      </div>
    </section>
  );
}
