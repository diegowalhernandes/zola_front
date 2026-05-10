import { FaHandshake } from 'react-icons/fa';

export function Logo() {
  return (
    <div className="flex items-center gap-2 font-extrabold tracking-tight text-slate-950 dark:text-white">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-cyan-500/20"><FaHandshake /></span>
      <span className="text-xl">ServiçoJá</span>
    </div>
  );
}
