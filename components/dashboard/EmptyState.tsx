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
    <div className="flex flex-col items-center justify-center py-[var(--spacing-xl)] px-[var(--spacing-lg)] text-center animate-fade-in w-full">
      {/* Icon */}
      {icon ? (
        <div className="mb-[var(--spacing-md)] text-text-tertiary">{icon}</div>
      ) : (
        <div className="mb-[var(--spacing-md)]">
          <div className="w-[64px] h-[64px] rounded-[20px] bg-primary/8 flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9h18" />
              <path d="M9 21V9" />
            </svg>
          </div>
        </div>
      )}

      <h3 className="text-[20px] font-bold text-text mb-[var(--spacing-2xs)] tracking-tight">
        {title}
      </h3>
      <p className="text-[14px] text-text-secondary max-w-[240px] leading-relaxed">
        {subtitle}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="mt-[var(--spacing-md)] h-[48px] px-[var(--spacing-lg)] rounded-[var(--radius-button)] bg-primary text-white font-semibold text-[15px] shadow-[0_4px_16px_rgba(79,70,229,0.25)] active:scale-95 transition-all cursor-pointer"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
