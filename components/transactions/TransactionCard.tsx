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
        shadow-[var(--shadow-soft)]
        p-[var(--spacing-sm)] px-[20px]
        flex flex-col gap-[var(--spacing-xs)]
        cursor-pointer
        active:scale-[0.98]
        transition-all duration-[var(--transition-normal)]
        outline-none
        focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        hover:shadow-[var(--shadow-floating)]
      "
      aria-label={`Transaction for ${customerName}, ₹${paid} via ${method}`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-[var(--spacing-s)]">
          {/* Avatar */}
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
              {customerName}
            </span>
            <span className="text-[12px] text-text-tertiary truncate leading-none mt-[2px]">
              {services.join(", ")}
            </span>
          </div>
        </div>

        {/* Paid Amount */}
        <div className="flex flex-col items-end gap-[6px]">
          <span className="text-[20px] font-bold text-text tabular-nums leading-none tracking-tight">
            ₹{paid.toLocaleString("en-IN")}
          </span>
          <span className={`inline-flex items-center px-[8px] py-[3px] rounded-full text-[9px] font-bold tracking-wider uppercase leading-none ${
            method === "Online" ? "bg-success-light text-success" : "bg-surface text-text-tertiary"
          }`}>
            {method}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-[6px] pt-[var(--spacing-xs)] border-t border-border/30">
        <span className="text-[11px] font-medium text-text-tertiary tabular-nums leading-none">
          Bill ₹{bill.toLocaleString("en-IN")}
        </span>
        {rewardUsed > 0 && (
          <>
            <span className="text-[8px] text-text-tertiary leading-none">•</span>
            <span className="text-[11px] font-medium text-success tabular-nums leading-none">
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
