import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  FiBriefcase,
  FiHeart,
  FiHome,
  FiMessageCircle,
  FiSearch,
  FiSettings,
} from 'react-icons/fi';
import { Logo } from '../components/common/Logo';
import { Navbar } from '../components/layout/Navbar';
import { useAuth } from '../contexts/AuthContext';

function getSidebarItems(role: string | undefined) {
  const dashboardPath =
    role === 'professional' ? '/dashboard/profissional' : '/dashboard/cliente';

  return [
    { to: '/', label: 'Início', icon: FiHome },
    { to: '/buscar', label: 'Buscar profissionais', icon: FiSearch },
    { to: dashboardPath, label: 'Meu painel', icon: role === 'professional' ? FiBriefcase : FiHeart },
    { to: '/chat', label: 'Chat', icon: FiMessageCircle },
    { to: dashboardPath, label: 'Configurações', icon: FiSettings },
  ];
}

export default function DashboardLayout() {
  const { user } = useAuth();
  const items = getSidebarItems(user?.role);

  return (
    <div className="min-h-screen bg-graphite-50 dark:bg-navy-950">
      <Navbar />

      <div className="lg:pl-72">
        <aside className="fixed left-0 top-[4.5rem] z-30 hidden h-[calc(100vh-4.5rem)] w-72 overflow-y-auto border-r border-graphite-200/80 bg-white/90 p-6 backdrop-blur-xl dark:border-graphite-800/80 dark:bg-navy-900/90 lg:block">
          <Link to="/" className="block transition-opacity hover:opacity-90">
            <Logo />
          </Link>
          <p className="mt-2 text-xs font-medium text-muted">Painel de controle</p>
          <nav className="mt-8 space-y-1">
            {items.map((item) => (
              <NavLink
                key={`${item.label}-${item.to}`}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  isActive ? 'sidebar-link sidebar-link-active' : 'sidebar-link'
                }
              >
                <item.icon className="text-lg" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-h-[calc(100vh-4.5rem)] p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
