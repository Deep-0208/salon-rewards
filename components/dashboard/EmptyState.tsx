interface EmptyStateProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ title, subtitle, icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-[var(--spacing-xl)] text-center bg-card rounded-[var(--radius-card)] border border-border/50 shadow-sm animate-fade-in w-full">
      {/* Icon */}
      {icon ? (
        <div className="mb-[var(--spacing-md)] text-text-tertiary">{icon}</div>
      ) : (
        <div className="mb-[var(--spacing-md)]">
          <div className="w-[56px] h-[56px] rounded-[16px] bg-primary/10 flex items-center justify-center border border-primary/20">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
        </div>
      )}

      <h3 className="text-[18px] font-bold text-text mb-[4px] tracking-tight">
        {title}
      </h3>
      <p className="text-[14px] text-text-secondary max-w-[240px] leading-relaxed">
        {subtitle}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="mt-[var(--spacing-lg)] h-[44px] px-[var(--spacing-lg)] rounded-full bg-primary text-white font-semibold text-[14px] shadow-[0_4px_12px_rgba(79,70,229,0.2)] active:scale-95 transition-all"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

