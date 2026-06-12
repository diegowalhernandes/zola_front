import { Link } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

export default function BookingSuccess() {
  return (
    <section className="container-page py-20">
      <div className="card mx-auto max-w-lg p-8 text-center">
        <FiCheckCircle className="mx-auto text-5xl text-sage-500" />
        <h1 className="heading-page mt-4">Agendamento confirmado!</h1>
        <p className="mt-3 text-muted">
          Seu sinal foi recebido e o horário está reservado na agenda do profissional.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/dashboard/cliente" className="btn-primary">
            Ver meus agendamentos
          </Link>
          <Link to="/buscar" className="btn-secondary">
            Buscar profissionais
          </Link>
        </div>
      </div>
    </section>
  );
}
