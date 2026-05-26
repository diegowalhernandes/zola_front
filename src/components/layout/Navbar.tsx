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
      <nav className="container-page flex h-[4.5rem] items-center justify-between">
        <Link to="/" className="transition-opacity hover:opacity-90">
          <Logo compact />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-4 py-2 ${isActive ? 'nav-link-active bg-brand-500/10' : 'nav-link'}`
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
            className="btn-ghost px-3"
            aria-label={isDark ? 'Modo claro' : 'Modo escuro'}
          >
            {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </button>
          {user ? (
            <>
              <Link
                to={user.role === 'professional' ? '/dashboard/profissional' : '/dashboard/cliente'}
                className="btn-secondary hidden sm:inline-flex"
              >
                Meu painel
              </Link>
              <button type="button" onClick={logout} className="btn-secondary">
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-primary">
              Entrar
            </Link>
          )}
        </div>

        <button
          type="button"
          className="btn-ghost px-3 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </nav>

      {open && (
        <div className="container-page animate-slide-up border-t border-graphite-200/60 pb-4 pt-2 dark:border-graphite-800/60 md:hidden">
          {links.map((link) => (
            <Link
              key={link.to}
              className="block rounded-xl px-3 py-3 font-semibold text-graphite-700 dark:text-graphite-200"
              to={link.to}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                className="btn-secondary mt-3 w-full"
                to={user.role === 'professional' ? '/dashboard/profissional' : '/dashboard/cliente'}
                onClick={() => setOpen(false)}
              >
                Meu painel
              </Link>
              <button type="button" className="btn-primary mt-2 w-full" onClick={() => { logout(); setOpen(false); }}>
                Sair
              </button>
            </>
          ) : (
            <Link className="btn-primary mt-3 w-full" to="/login" onClick={() => setOpen(false)}>
              Entrar
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
