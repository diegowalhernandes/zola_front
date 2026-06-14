import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-12 text-center sm:min-h-[70vh]">
      <div className="card max-w-md p-8">
        <p className="font-display text-7xl font-extrabold text-brand-600 sm:text-8xl">404</p>
        <h1 className="mt-4 text-xl font-bold sm:text-2xl">Página não encontrada</h1>
        <p className="mt-2 text-sm text-muted">Essa rota não existe ou foi movida.</p>
        <Link className="btn-primary mt-8 w-full sm:w-auto" to="/">
          <FiHome /> Voltar para home
        </Link>
      </div>
    </section>
  );
}
