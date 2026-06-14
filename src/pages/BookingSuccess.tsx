import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

export default function BookingSuccess() {
  return (
    <section className="container-page py-12 sm:py-20">
      <div className="card mx-auto max-w-lg p-6 text-center sm:p-8">
        <FiCheckCircle className="mx-auto text-5xl text-brand-500" />
        <h1 className="heading-page mt-4">Agendamento confirmado!</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          Seu pagamento foi recebido e os horários estão reservados na agenda do profissional.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/dashboard/cliente" className="btn-primary w-full sm:w-auto">
            Ver meus agendamentos
          </Link>
          <Link to="/buscar" className="btn-secondary w-full sm:w-auto">
            Buscar profissionais
          </Link>
        </div>
      </div>
    </section>
  );
}
