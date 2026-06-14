import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiMoon, FiShield, FiSun, FiX } from 'react-icons/fi';
import { Logo } from '../common/Logo';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useAuth } from '../../contexts/AuthContext';

const links = [
  { to: '/', label: 'Início' },
  { to: '/buscar', label: 'Buscar' },
  { to: '/chat', label: 'Chat' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();
  const { user, logout } = useAuth();

  const dashboardPath =
    user?.role === 'professional' ? '/dashboard/profissional' : '/dashboard/cliente';

  return (
    <header className="glass-header sticky top-0 z-40">
      <nav className="container-page flex h-14 items-center gap-3 sm:h-16 md:h-[4.5rem]">
        {/* Mobile: menu à esquerda */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            className="flex min-h-touch min-w-touch items-center justify-center rounded-xl text-white"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
          </button>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex min-h-touch min-w-touch items-center justify-center rounded-xl text-white/90"
            aria-label={isDark ? 'Modo claro' : 'Modo escuro'}
          >
            {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </button>
        </div>

        {/* Desktop: logo à esquerda */}
        <Link
          to="/"
          className="hidden shrink-0 transition-opacity hover:opacity-90 md:block"
          onClick={() => setOpen(false)}
        >
          <Logo light />
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-0.5 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'nav-link-active bg-white/15 text-white'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex min-h-touch min-w-touch items-center justify-center rounded-xl text-white/90 transition-colors hover:bg-white/10"
            aria-label={isDark ? 'Modo claro' : 'Modo escuro'}
          >
            {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </button>
          {user ? (
            <>
              <Link
                to={dashboardPath}
                className="inline-flex min-h-touch items-center rounded-xl border border-white/25 bg-white/10 px-5 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Meu painel
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-flex min-h-touch items-center rounded-xl border border-white/25 px-5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex min-h-touch items-center rounded-xl px-4 text-sm font-bold text-white/95 transition hover:bg-white/10"
              >
                Entrar
              </Link>
              <Link to="/login" className="btn-accent px-5 py-2.5 text-sm shadow-warm">
                Quero trabalhar
              </Link>
            </>
          )}
        </div>

        {/* Mobile: logo (só texto) à direita */}
        <Link
          to="/"
          className="ml-auto shrink-0 transition-opacity hover:opacity-90 md:hidden"
          onClick={() => setOpen(false)}
        >
          <Logo textOnly light />
        </Link>
      </nav>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 top-14 z-30 bg-brand-950/40 backdrop-blur-[2px] sm:top-16 md:hidden"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
          />
          <div className="mobile-nav-panel relative z-40 animate-slide-up">
            <div className="container-page space-y-1">
              <div className="trust-banner mb-3 border-white/10 bg-white/10 text-white dark:text-brand-100">
                <FiShield className="mt-0.5 shrink-0 text-brand-300" />
                <span>Plataforma segura para encontrar cuidadores verificados.</span>
              </div>

              {links.map((link) => (
                <Link
                  key={link.to}
                  className="mobile-nav-link"
                  to={link.to}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <div className="mt-3 space-y-2 border-t border-white/10 pt-3">
                  <Link
                    className="btn-accent flex w-full justify-center shadow-warm"
                    to={dashboardPath}
                    onClick={() => setOpen(false)}
                  >
                    Meu painel
                  </Link>
                  <button
                    type="button"
                    className="btn-secondary w-full border-white/25 bg-transparent text-white hover:bg-white/10"
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                  >
                    Sair
                  </button>
                </div>
              ) : (
                <div className="mt-3 space-y-2 border-t border-white/10 pt-3">
                  <Link
                    className="btn-accent flex w-full justify-center shadow-warm"
                    to="/login"
                    onClick={() => setOpen(false)}
                  >
                    Entrar / Cadastrar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
