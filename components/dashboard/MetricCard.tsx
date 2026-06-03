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
          w-full bg-card rounded-[var(--radius-hero)]
          p-[var(--spacing-lg)]
          border border-border/50
          shadow-sm
          flex flex-col items-start
          transition-all duration-[var(--transition-normal)]
          active:scale-[0.98]
          cursor-pointer select-none
        "
        aria-label={`${label}: ${value}`}
      >
        <span className="text-[13px] font-medium text-text-tertiary mb-2 uppercase tracking-wider">{label}</span>
        <span className="text-[40px] font-bold tracking-tight text-text tabular-nums leading-none">
          {value}
        </span>
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
        border border-border/50
        transition-all duration-[var(--transition-normal)]
        active:scale-[0.97]
        cursor-pointer select-none
        hover:border-border
        shadow-sm
        flex flex-col items-start w-full
      "
      aria-label={`${label}: ${value}`}
    >
      {icon && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mb-3"
          style={{ backgroundColor: accentBg }}
        >
          <span style={{ color: accentColor }} className="[&>svg]:w-4 [&>svg]:h-4">{icon}</span>
        </div>
      )}

      <div className="flex flex-col items-start min-w-0">
        <span className="text-[12px] font-medium text-text-secondary mb-1">
          {label}
        </span>
        <span className="text-[24px] font-bold text-text leading-none tabular-nums tracking-tight">
          {value}
        </span>
      </div>
    </button>
  );
}

