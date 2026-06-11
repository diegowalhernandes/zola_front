import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Logo } from '../components/common/Logo';
import { BRAND } from '../design/brand';

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="animate-fade-in">
        <Outlet />
      </main>
      <footer className="mt-16 border-t border-brand-100 bg-white py-12 dark:border-brand-800/60 dark:bg-navy-950">
        <div className="container-page grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{BRAND.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-bold text-brand-700 dark:text-white">Plataforma</p>
              <ul className="mt-3 space-y-2 text-muted">
                <li>Buscar profissionais</li>
                <li>Cadastro seguro</li>
                <li>Avaliações reais</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-brand-700 dark:text-white">Confiança</p>
              <ul className="mt-3 space-y-2 text-muted">
                <li>Verificados</li>
                <li>Suporte humanizado</li>
                <li>Processo simples</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container-page mt-10 flex flex-col items-center justify-between gap-2 border-t border-brand-100 pt-6 text-center text-xs text-muted sm:flex-row sm:text-left dark:border-brand-800/60">
          <p>
            {BRAND.name} © {new Date().getFullYear()} — {BRAND.taglineAlt}
          </p>
          <p>Seguro · Acolhedor · Profissional</p>
        </div>
      </footer>
    </>
  );
}
