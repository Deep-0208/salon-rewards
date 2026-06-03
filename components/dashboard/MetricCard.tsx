interface MetricCardProps {
  id: string;
  label: string;
  value: string;
  icon?: React.ReactNode;
  accentColor?: string;
  accentBg?: string;
  variant?: "default" | "hero";
}

export default function MetricCard({
  id,
  label,
  value,
  icon,
  accentColor = "var(--color-primary)",
  accentBg = "var(--color-primary-light)",
  variant = "default",
}: MetricCardProps) {
  if (variant === "hero") {
    return (
      <button
        id={id}
        type="button"
        className="
          w-full bg-card rounded-[var(--radius-card)]
          p-[var(--spacing-lg)]
          shadow-[var(--shadow-hero)]
          flex items-start gap-[var(--spacing-sm)]
          transition-all duration-[var(--transition-normal)]
          active:scale-[0.98]
          cursor-pointer select-none
          relative overflow-hidden
        "
        aria-label={`${label}: ${value}`}
      >
        {/* Accent bar */}
        <div
          className="absolute left-0 top-[16px] bottom-[16px] w-[4px] rounded-r-full"
          style={{ backgroundColor: accentColor }}
        />

        <div className="flex flex-col items-start pl-[var(--spacing-s)]">
          <span className="text-[13px] font-semibold text-text-tertiary mb-[var(--spacing-xs)] uppercase tracking-wider">
            {label}
          </span>
          <span className="text-[48px] font-extrabold tracking-tighter text-text tabular-nums leading-none">
            {value}
          </span>
        </div>
      </button>
    );
  }

  return (
    <button
      id={id}
      type="button"
      className="
        bg-card rounded-[var(--radius-card)]
        p-[var(--spacing-md)]
        shadow-[var(--shadow-soft)]
        transition-all duration-[var(--transition-normal)]
        active:scale-[0.97]
        cursor-pointer select-none
        hover:shadow-[var(--shadow-floating)]
        flex flex-col items-start w-full
      "
      aria-label={`${label}: ${value}`}
    >
      {icon && (
        <div
          className="flex-shrink-0 w-9 h-9 rounded-[12px] flex items-center justify-center mb-[var(--spacing-s)]"
          style={{ backgroundColor: accentBg }}
        >
          <span style={{ color: accentColor }} className="[&>svg]:w-[18px] [&>svg]:h-[18px]">{icon}</span>
        </div>
      )}

      <div className="flex flex-col items-start min-w-0">
        <span className="text-[12px] font-medium text-text-secondary mb-[var(--spacing-2xs)]">
          {label}
        </span>
        <span className="text-[26px] font-bold text-text leading-none tabular-nums tracking-tight">
          {value}
        </span>
      </div>
    </button>
  );
}
