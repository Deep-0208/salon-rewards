export default function SkeletonDashboard() {
  return (
    <div className="flex-1 flex flex-col animate-pulse-soft" aria-busy="true" aria-label="Loading dashboard">
      {/* Header skeleton */}
      <div className="px-[var(--spacing-md)] pt-[var(--spacing-xl)] pb-[var(--spacing-md)]">
        <div className="h-8 w-40 bg-border/60 rounded-[8px] mb-[8px]" />
        <div className="h-4 w-32 bg-border/40 rounded-[6px]" />
      </div>

      {/* Metric cards skeleton */}
      <div className="px-[var(--spacing-md)] flex flex-col gap-[var(--spacing-md)]">
        {/* Hero Card */}
        <div className="bg-card rounded-[var(--radius-hero)] p-[var(--spacing-lg)] border border-border/40 h-[120px] flex flex-col gap-[12px]">
          <div className="h-4 w-24 bg-border/40 rounded-[6px]" />
          <div className="h-10 w-32 bg-border/50 rounded-[8px]" />
        </div>

        {/* Smaller Cards */}
        <div className="grid grid-cols-2 gap-[var(--spacing-md)]">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-card rounded-[var(--radius-card)] p-[var(--spacing-md)] border border-border/40 h-[100px] flex flex-col gap-[12px]"
            >
              <div className="w-8 h-8 bg-border/40 rounded-full mb-[8px]" />
              <div>
                <div className="h-3 w-16 bg-border/40 rounded-[6px] mb-[8px]" />
                <div className="h-6 w-20 bg-border/50 rounded-[6px]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent transactions skeleton */}
      <div className="px-[var(--spacing-md)] mt-[var(--spacing-lg)]">
        <div className="h-4 w-36 bg-border/40 rounded-[6px] mb-[var(--spacing-md)]" />

        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-[14px] py-[14px]">
            <div className="w-[42px] h-[42px] rounded-full bg-border/40 flex-shrink-0" />
            <div className="flex-1">
              <div className="h-4 w-24 bg-border/40 rounded-[6px] mb-[6px]" />
              <div className="h-3 w-36 bg-border/30 rounded-[6px]" />
            </div>
            <div className="h-4 w-12 bg-border/40 rounded-[6px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

