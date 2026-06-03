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
        rounded-[var(--radius-card)]
        p-[var(--spacing-sm)] px-[20px]
        shadow-[var(--shadow-subtle)]
        flex items-center justify-between
        transition-all duration-[var(--transition-normal)]
        cursor-pointer
        outline-none
        focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        active:scale-[0.98]
        hover:shadow-[var(--shadow-soft)]
      "
    >
      <div className="flex items-center gap-[var(--spacing-s)]">
        {/* Avatar initial */}
        <div
          className="
            flex-shrink-0 w-9 h-9
            rounded-full bg-primary-light
            flex items-center justify-center
            text-[14px] font-bold text-primary
          "
        >
          {initial}
        </div>

        {/* Info */}
        <div className="flex flex-col min-w-0">
          <span className="text-[15px] font-semibold text-text truncate leading-tight">
            {name}
          </span>
          <div className="flex items-center gap-[6px] mt-[2px]">
            <span className="text-[12px] text-text-tertiary tabular-nums leading-none">
              ₹{bill}
            </span>
            {reward > 0 && (
              <>
                <span className="text-[8px] text-text-tertiary leading-none">•</span>
                <span className="text-[12px] text-success tabular-nums font-medium leading-none">
                  -₹{reward}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-[6px]">
        <span className="text-[18px] font-bold text-text tabular-nums leading-none tracking-tight">
          ₹{paid}
        </span>
        <span className={`inline-flex items-center px-[8px] py-[3px] rounded-full text-[9px] font-bold tracking-wider uppercase leading-none ${
          method === "Online" ? "bg-success-light text-success" : "bg-surface text-text-tertiary"
        }`}>
          {method}
        </span>
      </div>
    </div>
  );
}
