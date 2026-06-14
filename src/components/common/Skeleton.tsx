export function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <div className="h-40 animate-pulse bg-cream-200 dark:bg-brand-900/50 sm:h-44" />
      <div className="space-y-3 p-5">
        <div className="flex gap-3">
          <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-cream-200 dark:bg-brand-900/50" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 animate-pulse rounded-lg bg-cream-200 dark:bg-brand-900/50" />
            <div className="h-3 w-1/2 animate-pulse rounded-lg bg-cream-200 dark:bg-brand-900/50" />
          </div>
        </div>
        <div className="h-3 w-full animate-pulse rounded-lg bg-cream-200 dark:bg-brand-900/50" />
        <div className="h-3 w-5/6 animate-pulse rounded-lg bg-cream-200 dark:bg-brand-900/50" />
        <div className="mt-2 h-11 animate-pulse rounded-xl bg-cream-200 dark:bg-brand-900/50" />
      </div>
    </div>
  );
}
