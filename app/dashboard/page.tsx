"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/stores/appStore";
import MetricCard from "@/components/dashboard/MetricCard";
import TransactionRow from "@/components/dashboard/TransactionRow";
import BottomNav from "@/components/dashboard/BottomNav";
import SkeletonDashboard from "@/components/dashboard/SkeletonDashboard";
import EmptyState from "@/components/dashboard/EmptyState";

// ── Time-based greeting ──
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

// ── State type ──
type DashboardState = "loading" | "empty" | "data";

export default function DashboardPage() {
  const router = useRouter();
  const [state, setState] = useState<DashboardState>("loading");
  const [showToast, setShowToast] = useState(false);

  // Read from store
  const shopName = useAppStore((s) => s.shopConfig.shopName);
  const transactions = useAppStore((s) => s.transactions);

  // Compute today's metrics from store transactions
  const metrics = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const todayTxns = transactions.filter((t) =>
      t.createdAt.startsWith(today)
    );

    const revenue = todayTxns.reduce((sum, t) => sum + t.paid, 0);
    const rewards = todayTxns.reduce((sum, t) => sum + t.rewardEarned, 0);

    const uniquePhones = new Set(todayTxns.map((t) => t.customerPhone));
    const customers = uniquePhones.size;

    return {
      revenue: `₹${revenue.toLocaleString("en-IN")}`,
      customers: String(customers),
      rewards: `₹${rewards.toLocaleString("en-IN")}`,
    };
  }, [transactions]);

  // Recent 5 transactions for the list
  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 5);
  }, [transactions]);

  // Simulate loading delay
  useEffect(() => {
    const checkInstantLoad = () => {
      if (typeof window !== "undefined") {
        try {
          const justCompleted = sessionStorage.getItem("just_completed_visit");
          if (justCompleted === "true") {
            setState("data");
            return true;
          }
        } catch (e) {
          console.warn("sessionStorage read failed:", e);
        }
      }
      return false;
    };

    if (checkInstantLoad()) return;

    const timer = setTimeout(() => {
      setState(transactions.length > 0 ? "data" : "empty");
    }, 1200);
    return () => clearTimeout(timer);
  }, [transactions.length]);

  // Check sessionStorage for success toast alert
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const justCompleted = sessionStorage.getItem("just_completed_visit");
        if (justCompleted === "true") {
          setShowToast(true);
          sessionStorage.removeItem("just_completed_visit");
          const timer = setTimeout(() => {
            setShowToast(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
      } catch (e) {
        console.warn("sessionStorage read failed:", e);
      }
    }
  }, []);

  // ── Loading State ──
  if (state === "loading") {
    return (
      <div className="flex-1 flex flex-col pb-[80px]">
        <SkeletonDashboard />
        <BottomNav />
      </div>
    );
  }

  // ── Empty State ──
  if (state === "empty") {
    return (
      <div className="flex-1 flex flex-col pb-[80px]">
        {/* Header */}
        <header className="px-[var(--spacing-md)] pt-[var(--spacing-xl)] pb-[var(--spacing-md)]">
          <h1 className="text-[32px] font-bold tracking-tight text-text">
            Dashboard
          </h1>
          <p className="text-[15px] text-text-secondary mt-1">
            Track visits and rewards
          </p>
        </header>

        {/* Metrics — zeroed */}
        <section
          className="px-[var(--spacing-md)] mt-[var(--spacing-sm)]"
          aria-label="Today's metrics"
        >
          <div className="flex flex-col gap-[var(--spacing-md)]">
            <MetricCard
              id="metric-revenue"
              label="Revenue Today"
              value="₹0"
              variant="hero"
            />
            <div className="grid grid-cols-2 gap-[var(--spacing-md)]">
              <MetricCard
                id="metric-customers"
                label="Customers"
                value="0"
                icon={<CustomersIcon />}
              />
              <MetricCard
                id="metric-rewards"
                label="Rewards"
                value="₹0"
                icon={<RewardsIcon />}
                accentColor="var(--color-success)"
                accentBg="var(--color-success-light)"
              />
            </div>
          </div>
        </section>

        {/* Empty */}
        <EmptyState
          title="No visits yet"
          subtitle="Ready for your first customer today?"
          action={{ label: "New Bill", onClick: () => router.push("/visit") }}
        />

        <BottomNav />
      </div>
    );
  }

  // ── Data State ──
  return (
    <div className="flex-1 flex flex-col pb-[80px]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-success text-white px-[20px] py-[12px] rounded-full flex items-center gap-[8px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] font-semibold text-[14px] whitespace-nowrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Visit completed successfully!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="px-[var(--spacing-md)] pt-[var(--spacing-xl)] pb-[var(--spacing-md)] animate-fade-in">
        <h1 className="text-[32px] font-bold tracking-tight text-text">
          Dashboard
        </h1>
        <p className="text-[15px] text-text-secondary mt-1">
          Track visits and rewards
        </p>
      </header>

      {/* Metrics */}
      <section
        className="px-[var(--spacing-md)] mt-[var(--spacing-sm)] animate-fade-in"
        style={{ animationDelay: "50ms" }}
        aria-label="Today's metrics"
      >
        <div className="flex flex-col gap-[var(--spacing-md)]">
          <MetricCard
            id="metric-revenue"
            label="Revenue Today"
            value={metrics.revenue}
            variant="hero"
          />
          <div className="grid grid-cols-2 gap-[var(--spacing-md)]">
            <MetricCard
              id="metric-customers"
              label="Customers"
              value={metrics.customers}
              icon={<CustomersIcon />}
            />
            <MetricCard
              id="metric-rewards"
              label="Rewards"
              value={metrics.rewards}
              icon={<RewardsIcon />}
              accentColor="var(--color-success)"
              accentBg="var(--color-success-light)"
            />
          </div>
        </div>
      </section>

      {/* Recent Transactions */}
      <section
        className="px-[var(--spacing-md)] mt-[var(--spacing-lg)] animate-fade-in"
        style={{ animationDelay: "100ms" }}
        aria-label="Recent transactions"
      >
        <div className="flex items-center justify-between mb-[var(--spacing-sm)]">
          <h2 className="text-[13px] font-semibold text-text-tertiary uppercase tracking-wider">
            Recent
          </h2>
          <button
            onClick={() => router.push("/transactions")}
            className="text-[11px] font-semibold text-primary uppercase tracking-wide hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="flex flex-col gap-[var(--spacing-sm)]">
          {recentTransactions.map((txn) => (
            <TransactionRow
              key={txn.id}
              id={txn.id}
              name={txn.customerName}
              bill={txn.bill}
              reward={txn.rewardUsed}
              paid={txn.paid}
              method={txn.method}
              customerPhone={txn.customerPhone}
            />
          ))}
        </div>
      </section>

      {/* Bottom Nav */}
      <BottomNav />
    </div>
  );
}


// ── Icons ──
function RevenueIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function CustomersIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function RewardsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}
