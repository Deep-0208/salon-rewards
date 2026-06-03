"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppStore, type Transaction } from "@/stores/appStore";
import BottomNav from "@/components/dashboard/BottomNav";
import TransactionCard from "@/components/transactions/TransactionCard";
import TransactionDetailSheet from "@/components/transactions/TransactionDetailSheet";
import EmptyState from "@/components/dashboard/EmptyState";

export default function TransactionsPage() {
  const router = useRouter();
  const transactions = useAppStore((s) => s.transactions);
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  // Transactions are already recent-first in the store (newest prepended)
  // Group by date for display
  const groupedTransactions = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};

    transactions.forEach((txn) => {
      const dateKey = new Date(txn.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(txn);
    });

    // We rely on the store's order (newest first) instead of sorting by time,
    // because mock data might have future timestamps that mess up the date sort.

    return groups;
  }, [transactions]);

  const dateKeys = Object.keys(groupedTransactions);

  // Check if a date label is today
  const todayLabel = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex-1 flex flex-col pb-[80px]">
      {/* Header */}
      <header className="px-[var(--spacing-md)] pt-[var(--spacing-xl)] pb-[var(--spacing-sm)] animate-fade-in">
        <h1 className="text-[32px] font-bold tracking-tight text-text">Transactions</h1>
        <p className="text-[15px] text-text-secondary mt-1">
          Recent activity
        </p>
      </header>

      {/* Transaction List */}
      <main className="flex-1 px-[var(--spacing-md)] mt-[var(--spacing-sm)] animate-fade-in"
        style={{ animationDelay: "50ms" }}
      >
        {transactions.length === 0 ? (
          <EmptyState
            title="No transactions yet"
            subtitle="Complete a visit to see it here"
            action={{ label: "New Bill", onClick: () => router.push("/visit") }}
          />
        ) : (
          <div className="flex flex-col gap-[var(--spacing-lg)]">
            {dateKeys.map((dateKey) => (
              <section key={dateKey} aria-label={`Transactions on ${dateKey}`}>
                {/* Date Label */}
                <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-[var(--spacing-sm)]">
                  {dateKey === todayLabel ? "Today" : dateKey}
                </p>

                {/* Cards */}
                <div className="flex flex-col gap-[var(--spacing-sm)]">
                  {groupedTransactions[dateKey].map((txn) => (
                    <TransactionCard
                      key={txn.id}
                      transaction={txn}
                      onTap={() => setSelectedTxn(txn)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Detail Bottom Sheet */}
      <TransactionDetailSheet
        transaction={selectedTxn}
        onClose={() => setSelectedTxn(null)}
      />
    </div>
  );
}
