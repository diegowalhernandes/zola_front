import { Outlet, Link } from 'react-router-dom';
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
      <footer className="mt-12 border-t border-brand-100 bg-white pb-8 pt-10 dark:border-brand-800/60 dark:bg-navy-950 sm:mt-16 sm:py-12">
        <div className="container-page grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start md:gap-10">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{BRAND.tagline}</p>
            <p className="mt-3 text-xs text-muted">{BRAND.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-display font-bold text-brand-700 dark:text-white">Plataforma</p>
              <ul className="mt-3 space-y-2.5">
                <li>
                  <Link to="/buscar" className="text-muted transition-colors hover:text-brand-600">
                    Buscar profissionais
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-muted transition-colors hover:text-brand-600">
                    Cadastro seguro
                  </Link>
                </li>
                <li>
                  <Link to="/buscar" className="text-muted transition-colors hover:text-brand-600">
                    Avaliações reais
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-display font-bold text-brand-700 dark:text-white">Confiança</p>
              <ul className="mt-3 space-y-2.5 text-muted">
                <li>Profissionais verificados</li>
                <li>Suporte humanizado</li>
                <li>Processo simples</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container-page section-divider mt-8 flex flex-col items-center justify-between gap-2 pt-6 text-center text-xs text-muted sm:flex-row sm:text-left">
          <p>
            {BRAND.name} © {new Date().getFullYear()} — {BRAND.taglineAlt}
          </p>
          <p className="font-medium">Seguro · Acolhedor · Profissional</p>
        </div>
      </footer>
    </>
  );
}
