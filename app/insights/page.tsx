"use client";

import { useState, useMemo, useCallback } from "react";
import { useAppStore } from "@/stores/appStore";
import BottomNav from "@/components/dashboard/BottomNav";

export default function InsightsPage() {
  const transactions = useAppStore((s) => s.transactions);
  const [activeSheet, setActiveSheet] = useState<
    "revenue" | "customers" | "rewards" | null
  >(null);

  // Compute today's insights from store
  const insights = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayTxns = transactions.filter((t) =>
      t.createdAt.startsWith(today)
    );

    const totalRevenue = todayTxns.reduce((sum, t) => sum + t.paid, 0);
    const totalRewardsEarned = todayTxns.reduce(
      (sum, t) => sum + t.rewardEarned,
      0
    );
    const totalRewardsUsed = todayTxns.reduce(
      (sum, t) => sum + t.rewardUsed,
      0
    );

    const uniquePhones = new Set(todayTxns.map((t) => t.customerPhone));
    const customerCount = uniquePhones.size;

    // Revenue breakdown by payment method
    const cashRevenue = todayTxns
      .filter((t) => t.method === "Cash")
      .reduce((sum, t) => sum + t.paid, 0);
    const onlineRevenue = todayTxns
      .filter((t) => t.method === "Online")
      .reduce((sum, t) => sum + t.paid, 0);

    // Customer breakdown: unique names
    const customerNames = Array.from(
      new Map(
        todayTxns.map((t) => [t.customerPhone, t.customerName])
      ).values()
    );

    return {
      totalRevenue,
      totalRewardsEarned,
      totalRewardsUsed,
      customerCount,
      visitCount: todayTxns.length,
      cashRevenue,
      onlineRevenue,
      customerNames,
    };
  }, [transactions]);

  const closeSheet = useCallback(() => setActiveSheet(null), []);

  return (
    <div className="flex-1 flex flex-col pb-[100px]">
      {/* Header */}
      <header className="px-[var(--spacing-md)] pt-[var(--spacing-xl)] pb-[var(--spacing-sm)] animate-fade-in">
        <h1 className="text-[28px] font-bold tracking-tight text-text">Insights</h1>
        <p className="text-[14px] text-text-secondary mt-[2px]">
          Today&apos;s performance
        </p>
      </header>

      {/* 3 Insight Cards */}
      <section
        className="px-[var(--spacing-md)] mt-[var(--spacing-sm)] animate-fade-in"
        style={{ animationDelay: "50ms" }}
        aria-label="Today's insights"
      >
        <div className="flex flex-col gap-[var(--spacing-s)]">
          {/* Revenue Card */}
          <InsightCard
            id="insight-revenue"
            label="Revenue"
            value={`₹${insights.totalRevenue.toLocaleString("en-IN")}`}
            subtitle={`${insights.visitCount} visit${insights.visitCount !== 1 ? "s" : ""} today`}
            icon={<RevenueIcon />}
            accentColor="var(--color-primary)"
            accentBg="var(--color-primary-light)"
            onTap={() => setActiveSheet("revenue")}
          />

          {/* Customers Card */}
          <InsightCard
            id="insight-customers"
            label="Customers"
            value={String(insights.customerCount)}
            subtitle={`${insights.visitCount} total visit${insights.visitCount !== 1 ? "s" : ""}`}
            icon={<CustomersIcon />}
            accentColor="var(--color-primary)"
            accentBg="var(--color-primary-light)"
            onTap={() => setActiveSheet("customers")}
          />

          {/* Rewards Card */}
          <InsightCard
            id="insight-rewards"
            label="Rewards"
            value={`₹${insights.totalRewardsEarned.toLocaleString("en-IN")}`}
            subtitle="Earned today"
            icon={<RewardsIcon />}
            accentColor="var(--color-success)"
            accentBg="var(--color-success-light)"
            onTap={() => setActiveSheet("rewards")}
          />
        </div>
      </section>

      {/* Today's Activity Summary */}
      <section
        className="px-[var(--spacing-md)] mt-[var(--spacing-md)] animate-fade-in"
        style={{ animationDelay: "100ms" }}
        aria-label="Today's activity"
      >
        <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-[var(--spacing-s)]">
          Today&apos;s Activity
        </p>
        <div className="bg-card rounded-[var(--radius-card)] shadow-[var(--shadow-subtle)] px-[var(--spacing-md)] py-[var(--spacing-sm)] flex items-center justify-around">
          <ActivityItem value={String(insights.visitCount)} label="Visits" />
          <div className="w-px h-[28px] bg-border/30" />
          <ActivityItem value={String(insights.customerCount)} label="Customers" />
          <div className="w-px h-[28px] bg-border/30" />
          <ActivityItem value={`₹${insights.totalRewardsEarned}`} label="Rewards Issued" />
        </div>
      </section>

      {/* Bottom Nav */}
      <BottomNav />

      {/* ═══════════ BREAKDOWN SHEETS ═══════════ */}

      {/* Revenue Breakdown */}
      {activeSheet === "revenue" && (
        <BreakdownSheet title="Revenue Breakdown" onClose={closeSheet}>
          <div className="flex flex-col gap-[10px]">
            <BreakdownRow
              label="Cash"
              value={`₹${insights.cashRevenue.toLocaleString("en-IN")}`}
            />
            <BreakdownRow
              label="Online"
              value={`₹${insights.onlineRevenue.toLocaleString("en-IN")}`}
            />
            <div className="border-t border-border/30 pt-[10px]">
              <BreakdownRow
                label="Total Revenue"
                value={`₹${insights.totalRevenue.toLocaleString("en-IN")}`}
                bold
              />
            </div>
            <p className="text-[12px] text-text-tertiary mt-[4px]">
              Revenue = Amount actually paid by customers (after reward deductions).
            </p>
          </div>
        </BreakdownSheet>
      )}

      {/* Customers Breakdown */}
      {activeSheet === "customers" && (
        <BreakdownSheet title="Customers Today" onClose={closeSheet}>
          <div className="flex flex-col gap-[10px]">
            <BreakdownRow
              label="Unique Customers"
              value={String(insights.customerCount)}
            />
            <BreakdownRow
              label="Total Visits"
              value={String(insights.visitCount)}
            />
            <div className="border-t border-border/30 pt-[10px]">
              <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-[8px]">
                Customers Served
              </p>
              <div className="flex flex-wrap gap-[6px]">
                {insights.customerNames.map((name, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-[10px] py-[5px] rounded-full bg-primary-light text-[13px] font-medium text-primary"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </BreakdownSheet>
      )}

      {/* Rewards Breakdown */}
      {activeSheet === "rewards" && (
        <BreakdownSheet title="Rewards Breakdown" onClose={closeSheet}>
          <div className="flex flex-col gap-[10px]">
            <BreakdownRow
              label="Rewards Earned"
              value={`₹${insights.totalRewardsEarned.toLocaleString("en-IN")}`}
              valueColor="text-success"
            />
            <BreakdownRow
              label="Rewards Used"
              value={`₹${insights.totalRewardsUsed.toLocaleString("en-IN")}`}
              valueColor="text-error"
            />
            <div className="border-t border-border/30 pt-[10px]">
              <BreakdownRow
                label="Net Rewards"
                value={`₹${(
                  insights.totalRewardsEarned - insights.totalRewardsUsed
                ).toLocaleString("en-IN")}`}
                bold
              />
            </div>
          </div>
        </BreakdownSheet>
      )}
    </div>
  );
}


// ── Sub-Components ──

function ActivityItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-[2px]">
      <span className="text-[16px] font-bold text-text tabular-nums leading-none">{value}</span>
      <span className="text-[11px] font-medium text-text-tertiary leading-none">{label}</span>
    </div>
  );
}

function InsightCard({
  id,
  label,
  value,
  subtitle,
  icon,
  accentColor,
  accentBg,
  onTap,
}: {
  id: string;
  label: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  accentBg: string;
  onTap: () => void;
}) {
  return (
    <button
      id={id}
      type="button"
      onClick={onTap}
      className="
        w-full text-left
        bg-card rounded-[var(--radius-card)]
        shadow-[var(--shadow-soft)]
        px-[var(--spacing-md)] py-[var(--spacing-sm)]
        flex items-center gap-[var(--spacing-sm)]
        min-h-[88px]
        cursor-pointer
        active:scale-[0.98]
        transition-all duration-[var(--transition-normal)]
        outline-none
        focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        hover:shadow-[var(--shadow-floating)]
      "
      aria-label={`${label}: ${value}`}
    >
      {/* Icon */}
      <div
        className="w-[48px] h-[48px] rounded-[16px] flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: accentBg, color: accentColor }}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <p className="text-[12px] font-semibold text-text-tertiary uppercase tracking-wider leading-none mb-[6px]">
          {label}
        </p>
        <p className="text-[30px] font-bold text-text tabular-nums leading-none tracking-tight mb-[4px]">
          {value}
        </p>
        <p className="text-[12px] text-text-secondary leading-none">{subtitle}</p>
      </div>

      {/* Chevron hint */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-text-tertiary/50 flex-shrink-0"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}

function BreakdownSheet({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[768px] bg-card rounded-t-[var(--radius-sheet)] shadow-[0_-8px_32px_rgba(0,0,0,0.12)] pb-[env(safe-area-inset-bottom,16px)] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-[12px] pb-[8px]">
          <div className="w-[36px] h-[4px] rounded-full bg-border" />
        </div>

        <div className="flex items-center justify-between px-[var(--spacing-md)] pb-[var(--spacing-sm)]">
          <h2 className="text-[18px] font-semibold text-text">{title}</h2>
          <button
            onClick={onClose}
            className="w-[36px] h-[36px] rounded-full bg-surface flex items-center justify-center text-text-tertiary hover:text-text cursor-pointer transition-colors"
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

        <div className="border-t border-border/30" />

        <div className="px-[var(--spacing-md)] pt-[var(--spacing-sm)] pb-[var(--spacing-sm)]">
          {children}
        </div>
      </div>
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  bold,
  valueColor,
}: {
  label: string;
  value: string;
  bold?: boolean;
  valueColor?: string;
}) {
  return (
    <div className="flex justify-between items-center py-[8px] px-[var(--spacing-sm)] bg-surface rounded-[var(--radius-input)]">
      <span
        className={`text-[14px] ${
          bold ? "font-semibold text-text" : "text-text-secondary"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-[14px] tabular-nums ${
          bold ? "font-bold text-text" : `font-medium ${valueColor || "text-text"}`
        }`}
      >
        {value}
      </span>
    </div>
  );
}


// ── Icons ──

function RevenueIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v20" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function CustomersIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function RewardsIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
