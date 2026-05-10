import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
import { Logo } from '../common/Logo';
import { useDarkMode } from '../../hooks/useDarkMode';
import { useAuth } from '../../contexts/AuthContext';

const links = [
  { to: '/', label: 'Início' },
  { to: '/buscar', label: 'Buscar' },
  { to: '/chat', label: 'Chat' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <nav className="container-page flex h-20 items-center justify-between">
        <Link to="/"><Logo /></Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => <NavLink key={link.to} to={link.to} className={({ isActive }) => `text-sm font-semibold transition ${isActive ? 'text-brand-600' : 'text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'}`}>{link.label}</NavLink>)}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <button onClick={toggleDarkMode} className="btn-secondary px-4">{isDark ? <FiSun /> : <FiMoon />}</button>
          {user ? <button onClick={logout} className="btn-secondary">Sair</button> : <Link to="/login" className="btn-primary">Entrar</Link>}
        </div>
        <button className="btn-secondary px-4 md:hidden" onClick={() => setOpen(!open)}>{open ? <FiX /> : <FiMenu />}</button>
      </nav>
      {open && <div className="container-page pb-4 md:hidden">{links.map((link) => <Link key={link.to} className="block rounded-xl px-3 py-3 font-semibold" to={link.to} onClick={() => setOpen(false)}>{link.label}</Link>)}<Link className="btn-primary mt-2 w-full" to="/login">Entrar</Link></div>}
    </header>
  );
}
