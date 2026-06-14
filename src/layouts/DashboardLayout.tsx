import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

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



function getFirstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
}

function getSidebarItems(role: string | undefined) {

  const dashboardPath =

    role === 'professional' ? '/dashboard/profissional' : '/dashboard/cliente';



  return [

    { to: '/', label: 'Início', icon: FiHome, mobileLabel: 'Início' },

    { to: '/buscar', label: 'Buscar profissionais', icon: FiSearch, mobileLabel: 'Buscar' },

    {

      to: dashboardPath,

      label: 'Meu painel',

      icon: role === 'professional' ? FiBriefcase : FiHeart,

      mobileLabel: 'Painel',

    },

    { to: '/chat', label: 'Chat', icon: FiMessageCircle, mobileLabel: 'Chat' },

    { to: dashboardPath, label: 'Configurações', icon: FiSettings, mobileLabel: 'Config' },

  ];

}



export default function DashboardLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const items = getSidebarItems(user?.role);
  const firstName = user?.name ? getFirstName(user.name) : null;

  return (

    <div className="min-h-screen bg-white dark:bg-navy-950">

      <Navbar />



      <div className="lg:pl-72">

        <aside className="fixed left-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-72 overflow-y-auto border-r border-brand-100 bg-white/95 p-6 backdrop-blur-xl dark:border-brand-800/60 dark:bg-navy-900/95 sm:top-16 sm:h-[calc(100vh-4rem)] lg:block lg:top-[4.5rem] lg:h-[calc(100vh-4.5rem)]">

          <Link to="/" className="block transition-opacity hover:opacity-90">
            <Logo />
          </Link>
          {firstName ? (
            <p className="mt-4 font-display text-xl font-bold leading-snug text-ink dark:text-white">
              Olá!{' '}
              <span className="text-brand-600 dark:text-brand-400">{firstName}</span>
            </p>
          ) : null}
          <p className={`text-xs font-medium text-muted ${firstName ? 'mt-1' : 'mt-2'}`}>
            Painel de controle
          </p>

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



        <main className="dashboard-main-pad">
          {firstName ? (
            <div className="container-page mb-4 lg:hidden">
              <p className="font-display text-xl font-bold leading-snug text-ink dark:text-white">
                Olá!{' '}
                <span className="text-brand-600 dark:text-brand-400">{firstName}</span>
              </p>
              <p className="mt-0.5 text-xs font-medium text-muted">Painel de controle</p>
            </div>
          ) : null}
          <Outlet />
        </main>

      </div>



      <nav className="mobile-bottom-nav" aria-label="Navegação principal">

        {items.map((item) => {

          const isActive =

            item.to === '/'

              ? location.pathname === '/'

              : location.pathname.startsWith(item.to) && item.to !== '/';



          return (

            <NavLink

              key={`mobile-${item.label}-${item.to}`}

              to={item.to}

              end={item.to === '/'}

              className={`mobile-bottom-nav-item ${isActive ? 'mobile-bottom-nav-item-active' : ''}`}

            >

              <item.icon className={`text-xl ${isActive ? 'text-brand-600 dark:text-brand-400' : ''}`} />

              {item.mobileLabel}

            </NavLink>

          );

        })}

      </nav>

    </div>

  );

}


