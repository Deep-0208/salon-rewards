export default function SkeletonDashboard() {
  return (
    <div className="flex-1 flex flex-col" aria-busy="true" aria-label="Loading dashboard">
      {/* Header skeleton */}
      <div className="px-[var(--spacing-md)] pt-[var(--spacing-xl)] pb-[var(--spacing-md)]">
        <div className="h-8 w-40 skeleton-shimmer mb-[var(--spacing-xs)]" />
        <div className="h-4 w-32 skeleton-shimmer" />
      </div>

      {/* Metric cards skeleton */}
      <div className="px-[var(--spacing-md)] flex flex-col gap-[var(--spacing-sm)]">
        {/* Hero Card */}
        <div className="bg-card rounded-[var(--radius-card)] p-[var(--spacing-lg)] shadow-[var(--shadow-soft)] h-[130px] flex flex-col justify-center gap-[var(--spacing-s)]">
          <div className="h-4 w-28 skeleton-shimmer" />
          <div className="h-12 w-40 skeleton-shimmer" />
        </div>

        {/* Smaller Cards */}
        <div className="grid grid-cols-2 gap-[var(--spacing-s)]">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-card rounded-[var(--radius-card)] p-[var(--spacing-md)] shadow-[var(--shadow-subtle)] h-[110px] flex flex-col justify-between"
            >
              <div className="w-9 h-9 skeleton-shimmer rounded-[12px]" />
              <div>
                <div className="h-3 w-16 skeleton-shimmer mb-[var(--spacing-xs)]" />
                <div className="h-7 w-20 skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Summary skeleton */}
      <div className="px-[var(--spacing-md)] mt-[var(--spacing-md)]">
        <div className="bg-card rounded-[var(--radius-card)] shadow-[var(--shadow-subtle)] p-[var(--spacing-sm)] flex items-center justify-around">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-[6px]">
              <div className="h-5 w-8 skeleton-shimmer" />
              <div className="h-3 w-14 skeleton-shimmer" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent transactions skeleton */}
      <div className="px-[var(--spacing-md)] mt-[var(--spacing-lg)]">
        <div className="h-4 w-16 skeleton-shimmer mb-[var(--spacing-sm)]" />

        <div className="flex flex-col gap-[var(--spacing-s)]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-[var(--radius-card)] shadow-[var(--shadow-subtle)] p-[var(--spacing-sm)] px-[20px] flex items-center gap-[var(--spacing-s)]">
              <div className="w-9 h-9 rounded-full skeleton-shimmer flex-shrink-0" />
              <div className="flex-1">
                <div className="h-4 w-24 skeleton-shimmer mb-[6px]" />
                <div className="h-3 w-32 skeleton-shimmer" />
              </div>
              <div className="flex flex-col items-end gap-[6px]">
                <div className="h-5 w-14 skeleton-shimmer" />
                <div className="h-4 w-10 skeleton-shimmer rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
