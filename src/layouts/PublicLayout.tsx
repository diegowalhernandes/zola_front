import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { BRAND } from '../design/brand';

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="animate-fade-in">
        <Outlet />
      </main>
      <footer className="section-divider mt-24 py-12">
        <div className="container-page flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-muted">
            {BRAND.name} © {new Date().getFullYear()} — {BRAND.tagline}
          </p>
          <p className="text-xs text-graphite-400">Seguro · Transparente · Profissional</p>
        </div>
      </footer>
    </>
  );
}
