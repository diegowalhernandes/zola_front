import { BRAND } from '../../design/brand';

type LogoProps = {
  compact?: boolean;
  light?: boolean;
  /** Apenas o nome, sem ícone SVG */
  textOnly?: boolean;
};

export function Logo({ compact = false, light = false, textOnly = false }: LogoProps) {
  const nameClass = light
    ? 'text-white'
    : 'text-brand-700 dark:text-white';

  if (textOnly || compact) {
    return (
      <span
        className={`font-display text-xl font-bold tracking-tight ${nameClass} sm:text-2xl`}
      >
        {BRAND.name}
      </span>
    );
  }

  return (
    <div className="leading-tight">
      <span className={`block text-lg font-bold tracking-tight ${nameClass}`}>
        {BRAND.name}
      </span>
      <span
        className={`hidden text-[11px] font-medium sm:block ${light ? 'text-white/80' : 'text-ink-muted dark:text-ink-400'}`}
      >
        {BRAND.tagline}
      </span>
    </div>
  );
}
