import { BRAND } from '../../design/brand';

function LogoMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10" aria-hidden>
      <rect width="40" height="40" rx="12" fill="#2B4C7E" />
      <path
        d="M10 26V18c0-2.2 1.8-4 4-4h1.5c1.5 0 2.9.8 3.6 2.1L20 20l1-1.5"
        stroke="#7BAE7F"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M30 26V18c0-2.2-1.8-4-4-4h-1.5c-1.5 0-2.9.8-3.6 2.1L20 20l-1-1.5"
        stroke="#7BAE7F"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M14 28c2.5 2 4.5 3 6 3s3.5-1 6-3"
        stroke="#F2C94C"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M20 12v3"
        stroke="#F7F2E8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="20" cy="10" r="1.5" fill="#F2C94C" />
    </svg>
  );
}

export function Logo({ compact = false, light = false }: { compact?: boolean; light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark />
      {!compact && (
        <div className="leading-tight">
          <span
            className={`block text-lg font-bold tracking-tight ${light ? 'text-white' : 'text-brand-700 dark:text-white'}`}
          >
            {BRAND.name}
          </span>
          <span
            className={`hidden text-[11px] font-medium sm:block ${light ? 'text-white/80' : 'text-ink-muted dark:text-ink-400'}`}
          >
            {BRAND.tagline}
          </span>
        </div>
      )}
    </div>
  );
}
