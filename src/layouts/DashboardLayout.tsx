import { NavLink, Outlet } from 'react-router-dom';
import { FiBriefcase, FiHeart, FiHome, FiMessageCircle, FiSettings } from 'react-icons/fi';
import { Logo } from '../components/common/Logo';

const items = [
  { to: '/dashboard/profissional', label: 'Profissional', icon: FiBriefcase },
  { to: '/dashboard/cliente', label: 'Cliente', icon: FiHeart },
  { to: '/chat', label: 'Chat', icon: FiMessageCircle },
  { to: '/', label: 'Home', icon: FiHome },
  { to: '/dashboard/profissional', label: 'Configurações', icon: FiSettings }
];

export default function DashboardLayout() {
  return <div className="min-h-screen bg-slate-50 dark:bg-slate-950"><aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 lg:block"><Logo /><div className="mt-10 space-y-2">{items.map((item) => <NavLink key={item.label} to={item.to} className="flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"><item.icon />{item.label}</NavLink>)}</div></aside><main className="p-4 lg:ml-72 lg:p-8"><Outlet /></main></div>;
}
