import { BRAND } from '../../design/brand';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-gradient-brand shadow-glow-sm">
        <span className="text-lg font-extrabold text-white">Z</span>
      </span>
      {!compact && (
        <div className="leading-tight">
          <span className="block text-lg font-extrabold tracking-tight text-graphite-900 dark:text-white">
            {BRAND.name}
          </span>
          <span className="hidden text-[11px] font-medium text-graphite-500 sm:block dark:text-graphite-400">
            {BRAND.tagline}
          </span>
        </div>
      )}
    </div>
  );
}
