"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/stores/appStore";
import CustomerStep, { CustomerData } from "@/components/visit/CustomerStep";
import ServicesStep, { ServiceItem } from "@/components/visit/ServicesStep";
import BillingStep from "@/components/visit/BillingStep";

export type VisitStep = "customer" | "services" | "billing" | "success";

export default function VisitPage() {
  const shopConfig = useAppStore((s) => s.shopConfig);
  const router = useRouter();
  const [step, setStep] = useState<VisitStep>("customer");

  // Flow State
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  
  // Auto-redirect on success with no URL parameters
  useEffect(() => {
    if (step === "success") {
      try {
        sessionStorage.setItem("just_completed_visit", "true");
      } catch (e) {
        console.warn("sessionStorage write failed:", e);
      }
      const timer = setTimeout(() => {
        router.push("/dashboard");
      }, 1500); // 1.5 seconds auto-redirect
      return () => clearTimeout(timer);
    }
  }, [step, router]);

  const handleBack = () => {
    if (step === "customer") {
      router.push("/dashboard");
    } else if (step === "services") {
      setStep("customer");
    } else if (step === "billing") {
      setStep("services");
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case "customer": return "New Bill";
      case "services": return "Select Services";
      case "billing": return "Billing";
      case "success": return "Success";
      default: return "";
    }
  };

  if (step === "success") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-card p-[var(--spacing-lg)] animate-fade-in">
        <div className="w-[72px] h-[72px] rounded-full bg-success-light flex items-center justify-center mb-[var(--spacing-md)] animate-scale-in">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 className="text-[20px] font-bold text-text mb-[4px] text-center">Visit Saved</h2>
        <p className="text-[14px] text-text-secondary text-center">
          Reward added to {customer?.name || "customer"}&apos;s account.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-bg pb-[env(safe-area-inset-bottom,0px)]">
      {/* Header */}
      <header className="flex items-center h-16 px-[var(--spacing-md)] bg-card border-b border-border/40 sticky top-0 z-40">
        <button 
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center -ml-2 text-primary active:opacity-70 cursor-pointer"
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <h1 className="text-[18px] font-semibold text-text ml-2">
          {getStepTitle()}
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative">
        {step === "customer" && (
          <CustomerStep 
            initialData={customer}
            onContinue={(data) => {
              setCustomer(data);
              setStep("services");
            }}
          />
        )}

        {step === "services" && customer && (
          <ServicesStep 
            customerName={customer.name}
            initialServices={selectedServices}
            onContinue={(services) => {
              setSelectedServices(services);
              setStep("billing");
            }}
          />
        )}

        {step === "billing" && customer && (
          <BillingStep 
            customer={customer}
            services={selectedServices}
            rewardPercentage={shopConfig.rewardPercent / 100}
            maxRedeemPercentage={shopConfig.maxRedeemPercent / 100}
            onComplete={(details) => {
              try {
                const earned = Math.round(details.paid * (shopConfig.rewardPercent / 100));
                const methodType: "Cash" | "Online" = details.method === "cash" ? "Cash" : "Online";
                
                const newTxn = {
                  id: `txn-${Date.now()}`,
                  customerName: customer.name,
                  customerPhone: customer.phone,
                  services: selectedServices.map(s => s.name),
                  bill: details.bill,
                  rewardUsed: details.reward,
                  paid: details.paid,
                  rewardEarned: earned,
                  method: methodType,
                  createdAt: new Date().toISOString()
                };

                if (customer.isNew) {
                  useAppStore.getState().addCustomer({
                    id: `cust-${Date.now()}`,
                    phone: customer.phone,
                    name: customer.name,
                    rewardBalance: earned,
                    totalVisits: 1,
                    createdAt: new Date().toISOString()
                  });
                } else {
                  useAppStore.getState().updateCustomerReward(customer.phone, earned, details.reward);
                }
                
                useAppStore.getState().addTransaction(newTxn);
                
                const existingStr = localStorage.getItem("recentTransactions_demo");
                const existing = existingStr ? JSON.parse(existingStr) : [];
                
                // Deduplicate logic: if ID somehow exists, replace it, otherwise prepend.
                const index = existing.findIndex((t: any) => t.id === newTxn.id);
                if (index > -1) {
                  existing[index] = newTxn;
                } else {
                  existing.unshift(newTxn);
                }
                
                localStorage.setItem("recentTransactions_demo", JSON.stringify(existing));
              } catch (e) {
                console.warn("localStorage write failed:", e);
              }
              setStep("success");
            }}
          />
        )}
      </main>
    </div>
  );
}
