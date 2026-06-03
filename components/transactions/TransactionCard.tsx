"use client";

import type { Transaction } from "@/stores/appStore";

interface TransactionCardProps {
  transaction: Transaction;
  onTap: () => void;
}

// Format time from ISO string → "2:45 PM"
function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function TransactionCard({
  transaction,
  onTap,
}: TransactionCardProps) {
  const { customerName, services, bill, rewardUsed, paid, method, createdAt } =
    transaction;
  const initial = customerName.charAt(0).toUpperCase();
  const time = formatTime(createdAt);

  return (
    <button
      type="button"
      onClick={onTap}
      className="
        w-full text-left
        bg-card rounded-[var(--radius-card)]
        border border-border/50
        shadow-sm
        p-[var(--spacing-md)]
        flex flex-col gap-3
        cursor-pointer
        active:scale-[0.98]
        transition-all duration-[var(--transition-normal)]
        outline-none
        focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        hover:border-border
      "
      aria-label={`Transaction for ${customerName}, ₹${paid} via ${method}`}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex items-center gap-[var(--spacing-md)]">
          {/* Avatar */}
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
            <span className="text-[16px] font-semibold text-text truncate leading-none mb-[6px]">
              {customerName}
            </span>
            <span className="text-[13px] text-text-secondary truncate leading-none">
              {services.join(", ")}
            </span>
          </div>
        </div>

        {/* Paid Amount */}
        <div className="flex flex-col items-end gap-[6px]">
          <span className="text-[20px] font-bold text-text tabular-nums leading-none tracking-tight">
            ₹{paid.toLocaleString("en-IN")}
          </span>
          <span className={`inline-flex items-center px-2 py-1 rounded-[6px] text-[10px] font-bold tracking-wide uppercase leading-none ${
            method === "Online" ? "bg-success-light text-success" : "bg-bg text-text-secondary border border-border/50"
          }`}>
            {method}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-border/50 mt-1">
        <span className="text-[12px] font-medium text-text-secondary tabular-nums leading-none">
          Bill ₹{bill.toLocaleString("en-IN")}
        </span>
        {rewardUsed > 0 && (
          <>
            <span className="text-[10px] text-text-tertiary leading-none">•</span>
            <span className="text-[12px] font-medium text-success tabular-nums leading-none">
              Reward -₹{rewardUsed.toLocaleString("en-IN")}
            </span>
          </>
        )}
        <div className="flex-1" />
        <span className="text-[11px] font-medium text-text-tertiary tabular-nums leading-none">
          {time}
        </span>
      </div>
    </button>
  );
}
