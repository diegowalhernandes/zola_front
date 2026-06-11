import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
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

  return (
    <header className="glass-header sticky top-0 z-40">
      <nav className="container-page flex h-16 items-center justify-between sm:h-[4.5rem]">
        <Link to="/" className="transition-opacity hover:opacity-90">
          <Logo compact light />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive ? 'nav-link-active bg-white/15 text-white' : 'text-white/85 hover:text-white'
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
            className="rounded-xl p-2.5 text-white/90 transition-colors hover:bg-white/10"
            aria-label={isDark ? 'Modo claro' : 'Modo escuro'}
          >
            {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </button>
          {user ? (
            <>
              <Link
                to={user.role === 'professional' ? '/dashboard/profissional' : '/dashboard/cliente'}
                className="hidden rounded-2xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20 sm:inline-flex"
              >
                Meu painel
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-2xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-2xl border border-white/25 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10 sm:inline-flex"
              >
                Entrar
              </Link>
              <Link to="/login" className="btn-accent px-5 py-2.5 text-sm">
                Quero trabalhar
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-xl p-2.5 text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </nav>

      {open && (
        <div className="container-page animate-slide-up border-t border-white/15 pb-4 pt-2 md:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              className="block rounded-xl px-3 py-3 font-semibold text-white/90"
              to={link.to}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                className="mt-3 block w-full rounded-2xl border border-white/25 bg-white/10 py-3 text-center font-bold text-white"
                to={user.role === 'professional' ? '/dashboard/profissional' : '/dashboard/cliente'}
                onClick={() => setOpen(false)}
              >
                Meu painel
              </Link>
              <button
                type="button"
                className="btn-accent mt-2 w-full"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link className="btn-accent mt-3 w-full" to="/login" onClick={() => setOpen(false)}>
                Entrar / Cadastrar
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
