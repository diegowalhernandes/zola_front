import { FaStar } from 'react-icons/fa';

export function Rating({ value, count }: { value: number; count?: number }) {
  return <div className="flex items-center gap-1 text-sm font-semibold text-amber-500"><FaStar /> {value.toFixed(1)} {count ? <span className="font-medium text-slate-500">({count})</span> : null}</div>;
}
