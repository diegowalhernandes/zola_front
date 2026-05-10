import { Link } from 'react-router-dom';

export default function NotFound() {
  return <section className="container-page grid min-h-[70vh] place-items-center text-center"><div><h1 className="text-8xl font-extrabold text-brand-600">404</h1><p className="mt-4 text-2xl font-bold">Página não encontrada</p><p className="mt-2 text-slate-500">Essa rota não existe ou foi movida.</p><Link className="btn-primary mt-8" to="/">Voltar para home</Link></div></section>;
}
