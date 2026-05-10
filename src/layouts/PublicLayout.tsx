import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';

export default function PublicLayout() {
  return <><Navbar /><main><Outlet /></main><footer className="mt-20 border-t border-slate-200 py-10 text-center text-sm text-slate-500 dark:border-slate-800">ServiçoJá © 2026 — Marketplace de serviços locais.</footer></>;
}
