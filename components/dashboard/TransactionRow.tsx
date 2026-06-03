import React from "react";

interface TransactionRowProps {
  id: string;
  name: string;
  bill: number;
  reward: number;
  paid: number;
  method: "Cash" | "Online";
  customerPhone?: string;
  onClick?: () => void;
}

export default function TransactionRow({
  id,
  name,
  bill,
  reward,
  paid,
  method,
  customerPhone,
  onClick,
}: TransactionRowProps) {
  const initial = name.charAt(0).toUpperCase();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      id={id}
      tabIndex={0}
      role="button"
      aria-label={`Transaction for ${name}, bill amount ₹${bill}, paid amount ₹${paid} via ${method}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="
        bg-card
        border border-border/50
        rounded-[var(--radius-card)]
        p-[var(--spacing-md)]
        shadow-sm
        flex items-start justify-between
        transition-all duration-[var(--transition-normal)]
        cursor-pointer
        outline-none
        focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        active:scale-[0.98]
        hover:border-border
      "
    >
      <div className="flex items-center gap-[var(--spacing-md)]">
        {/* Avatar initial */}
        <div
          className="
            flex-shrink-0 w-10 h-10
            rounded-full bg-primary-light
            flex items-center justify-center
            text-[15px] font-bold text-primary
          "
        >
          {initial}
        </div>

        {/* Info */}
        <div className="flex flex-col min-w-0">
          <span className="text-[16px] font-semibold text-text truncate mb-1 leading-none">
            {name}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-text-secondary tabular-nums leading-none">
              Bill ₹{bill}
            </span>
            {reward > 0 && (
              <>
                <span className="text-[10px] text-text-tertiary leading-none">•</span>
                <span className="text-[13px] text-success tabular-nums font-medium leading-none">
                  Reward -₹{reward}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="text-[20px] font-bold text-text tabular-nums leading-none tracking-tight">
          ₹{paid}
        </span>
        <span className={`inline-flex items-center px-2 py-1 rounded-[6px] text-[10px] font-bold tracking-wide uppercase leading-none ${
          method === "Online" ? "bg-success-light text-success" : "bg-bg text-text-secondary border border-border/50"
        }`}>
          {method}
        </span>
      </div>
    </div>
  );
}

