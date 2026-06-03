interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  id?: string;
}

export default function Button({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  type = "button",
  id,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseClasses = `
    w-full flex items-center justify-center gap-2
    min-h-[52px] px-[var(--spacing-lg)] py-[14px]
    rounded-[var(--radius-button)]
    text-[15px] font-semibold
    transition-all duration-[var(--transition-normal)]
    cursor-pointer select-none
    active:scale-[0.98]
    disabled:cursor-not-allowed disabled:active:scale-100
  `;

  const variantClasses =
    variant === "primary"
      ? `
        bg-primary text-white
        hover:bg-primary-hover
        disabled:bg-primary/40
        shadow-[0_1px_3px_rgba(79,70,229,0.3),0_1px_2px_rgba(79,70,229,0.2)]
        hover:shadow-[0_2px_6px_rgba(79,70,229,0.35),0_2px_4px_rgba(79,70,229,0.25)]
        disabled:shadow-none
      `
      : `
        bg-card text-text border border-border
        hover:bg-input-bg
        disabled:opacity-50
      `;

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses}`}
    >
      {loading ? (
        <>
          {/* Spinner */}
          <svg
            className="animate-spin h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.25"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <span>Please wait…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
