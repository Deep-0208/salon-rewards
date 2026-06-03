"use client";

import { useEffect, useRef, useCallback } from "react";
import type { Transaction } from "@/stores/appStore";

interface TransactionDetailSheetProps {
  transaction: Transaction | null;
  onClose: () => void;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TransactionDetailSheet({
  transaction,
  onClose,
}: TransactionDetailSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!transaction) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [transaction, onClose]);

  // Close on backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  if (!transaction) return null;

  const {
    customerName,
    customerPhone,
    services,
    bill,
    rewardUsed,
    paid,
    rewardEarned,
    method,
    createdAt,
  } = transaction;

  const initial = customerName.charAt(0).toUpperCase();

  return (
    // Backdrop
    <div
      className="
        fixed inset-0 z-50
        bg-black/40
        flex items-end justify-center
        animate-fade-in
      "
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-label={`Transaction details for ${customerName}`}
    >
      {/* Sheet */}
      <div
        ref={sheetRef}
        className="
          w-full max-w-[768px]
          bg-card
          rounded-t-[var(--radius-sheet)]
          shadow-[0_-4px_20px_rgba(0,0,0,0.1)]
          pb-[env(safe-area-inset-bottom,16px)]
          animate-slide-up
        "
      >
        {/* Drag indicator */}
        <div className="flex justify-center pt-[12px] pb-[8px]">
          <div className="w-[36px] h-[4px] rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-[var(--spacing-md)] pb-[var(--spacing-md)]">
          <div className="flex items-center gap-[12px]">
            <div className="w-[44px] h-[44px] rounded-full bg-primary-light flex items-center justify-center text-[16px] font-semibold text-primary">
              {initial}
            </div>
            <div>
              <h2 className="text-[18px] font-semibold text-text">
                {customerName}
              </h2>
              <p className="text-[13px] text-text-secondary mt-[1px]">
                +91 {customerPhone}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-[36px] h-[36px] rounded-full bg-bg flex items-center justify-center text-text-tertiary hover:text-text cursor-pointer transition-colors"
            aria-label="Close"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-border/40" />

        {/* Details */}
        <div className="px-[var(--spacing-md)] pt-[var(--spacing-md)] pb-[var(--spacing-sm)]">
          {/* Date + Time */}
          <div className="flex items-center gap-[6px] mb-[var(--spacing-md)]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="text-text-tertiary"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-[13px] text-text-secondary">
              {formatDate(createdAt)} at {formatTime(createdAt)}
            </span>
          </div>

          {/* Services */}
          <div className="mb-[var(--spacing-md)]">
            <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-[8px]">
              Services
            </p>
            <div className="flex flex-wrap gap-[6px]">
              {services.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-[10px] py-[5px] rounded-full bg-bg text-[13px] font-medium text-text border border-border/40"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Billing Breakdown */}
          <div className="bg-bg rounded-[var(--radius-input)] p-[var(--spacing-md)]">
            <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-[12px]">
              Billing
            </p>

            <div className="space-y-[10px]">
              <div className="flex justify-between">
                <span className="text-[14px] text-text-secondary">
                  Bill Amount
                </span>
                <span className="text-[14px] font-medium text-text tabular-nums">
                  ₹{bill.toLocaleString("en-IN")}
                </span>
              </div>

              {rewardUsed > 0 && (
                <div className="flex justify-between">
                  <span className="text-[14px] text-text-secondary">
                    Reward Used
                  </span>
                  <span className="text-[14px] font-medium text-success tabular-nums">
                    -₹{rewardUsed.toLocaleString("en-IN")}
                  </span>
                </div>
              )}

              <div className="border-t border-border/40 pt-[10px] flex justify-between">
                <span className="text-[15px] font-semibold text-text">
                  Amount Paid
                </span>
                <span className="text-[15px] font-bold text-text tabular-nums">
                  ₹{paid.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Reward Earned + Payment Method */}
          <div className="flex items-center justify-between mt-[var(--spacing-md)]">
            <div className="flex items-center gap-[6px]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-success)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
              <span className="text-[13px] text-success font-medium">
                +₹{rewardEarned.toLocaleString("en-IN")} earned
              </span>
            </div>

            <span
              className={`inline-flex items-center px-[10px] py-[4px] rounded-full text-[11px] font-bold tracking-wide ${
                method === "Online"
                  ? "bg-success-light text-success"
                  : "bg-border/60 text-text-secondary"
              }`}
            >
              {method.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
