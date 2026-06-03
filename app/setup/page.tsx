"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/stores/appStore";
import StepIndicator from "@/components/setup/StepIndicator";
import TextInput from "@/components/setup/TextInput";
import ServiceChips from "@/components/setup/ServiceChips";
import Button from "@/components/login/Button";

// ── Types ──
interface Service {
  id: string;
  name: string;
  price: number;
}

type Step = 1 | 2 | 3 | "success";

// ── Default data ──
const DEFAULT_SERVICES: Service[] = [
  { id: "haircut", name: "Haircut", price: 150 },
  { id: "beard", name: "Beard", price: 80 },
  { id: "facial", name: "Facial", price: 400 },
];

export default function SetupPage() {
  const router = useRouter();
  const completeSetup = useAppStore((s) => s.completeSetup);
  // ── State ──
  const [step, setStep] = useState<Step>(1);
  const [shopName, setShopName] = useState("");
  const [rewardPercent, setRewardPercent] = useState("10");
  const [maxRedeemPercent, setMaxRedeemPercent] = useState("20");
  const [services, setServices] = useState<Service[]>([...DEFAULT_SERVICES]);
  const [isLoading, setIsLoading] = useState(false);
  const [shopNameError, setShopNameError] = useState("");

  // ── Derived ──
  const currentStep = typeof step === "number" ? step : 3;

  // ── Handlers ──
  const handleShopNameChange = useCallback((value: string) => {
    setShopName(value);
    if (shopNameError) setShopNameError("");
  }, [shopNameError]);

  const handleStep1Continue = useCallback(async () => {
    if (!shopName.trim()) {
      setShopNameError("Shop name is required");
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setIsLoading(false);
    setStep(2);
  }, [shopName]);

  const handleStep2Continue = useCallback(async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    setIsLoading(false);
    setStep(3);
  }, []);

  const handleStep2Back = useCallback(() => {
    setStep(1);
  }, []);

  const handleFinish = useCallback(async () => {
    setIsLoading(true);
    // Simulate saving
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));
    completeSetup(
      {
        shopName: shopName.trim(),
        rewardPercent: Number(rewardPercent) || 10,
        maxRedeemPercent: Number(maxRedeemPercent) || 20,
      },
      services.map((s) => ({ id: s.id, name: s.name, price: s.price }))
    );
    setIsLoading(false);
    router.push("/dashboard");
  }, [shopName, rewardPercent, maxRedeemPercent, services, completeSetup, router]);

  const handleSkip = useCallback(async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    completeSetup(
      {
        shopName: shopName.trim() || "My Salon",
        rewardPercent: Number(rewardPercent) || 10,
        maxRedeemPercent: Number(maxRedeemPercent) || 20,
      },
      services.map((s) => ({ id: s.id, name: s.name, price: s.price }))
    );
    setIsLoading(false);
    router.push("/dashboard");
  }, [shopName, rewardPercent, maxRedeemPercent, services, completeSetup, router]);

  const handleAddService = useCallback((service: Service) => {
    setServices((prev) => [...prev, service]);
  }, []);

  const handleRemoveService = useCallback((id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // ── Render ──
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-[var(--spacing-md)] py-[var(--spacing-xl)]">
      <div className="w-full max-w-[400px] mx-auto">

        {/* ═══════════ STEP 1 — Shop Name ═══════════ */}
        {step === 1 && (
          <div className="flex flex-col gap-[var(--spacing-xl)] animate-fade-in">
            <StepIndicator currentStep={1} totalSteps={3} />

            <div>
              <h1 className="text-[24px] font-semibold text-text">
                Welcome 👋
              </h1>
              <p className="mt-[var(--spacing-xs)] text-[14px] text-text-secondary">
                Let's set up your salon in under a minute
              </p>
            </div>

            <TextInput
              id="shop-name"
              label="Shop Name"
              value={shopName}
              onChange={handleShopNameChange}
              placeholder="Royal Salon"
              error={shopNameError}
              disabled={isLoading}
            />

            <Button
              id="btn-step1-continue"
              onClick={handleStep1Continue}
              disabled={!shopName.trim()}
              loading={isLoading}
            >
              Continue
            </Button>
          </div>
        )}

        {/* ═══════════ STEP 2 — Reward Rules ═══════════ */}
        {step === 2 && (
          <div className="flex flex-col gap-[var(--spacing-xl)] animate-fade-in">
            <StepIndicator currentStep={2} totalSteps={3} />

            {/* Back */}
            <button
              onClick={handleStep2Back}
              disabled={isLoading}
              className="min-h-[44px] min-w-[44px] -ml-[12px] px-[12px] -my-[12px] flex items-center justify-center gap-1 text-[14px] text-text-secondary hover:text-text transition-colors duration-[var(--transition-fast)] cursor-pointer disabled:opacity-50 self-start"
              aria-label="Go back"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.5 15L7.5 10L12.5 5" />
              </svg>
              <span>Back</span>
            </button>

            <div>
              <h1 className="text-[24px] font-semibold text-text">
                Reward Rules
              </h1>
              <p className="mt-[var(--spacing-xs)] text-[14px] text-text-secondary">
                Set how customers earn and use rewards
              </p>
            </div>

            <div className="flex flex-col gap-[var(--spacing-md)]">
              <TextInput
                id="reward-percent"
                label="Reward Percentage"
                value={rewardPercent}
                onChange={setRewardPercent}
                placeholder="10"
                type="number"
                suffix="%"
                helperText="Customers earn this % of their bill as rewards"
                disabled={isLoading}
                max={100}
              />

              <TextInput
                id="max-redeem-percent"
                label="Max Redeem Percentage"
                value={maxRedeemPercent}
                onChange={setMaxRedeemPercent}
                placeholder="20"
                type="number"
                suffix="%"
                helperText="Max % of a customer's reward balance they can redeem per visit"
                disabled={isLoading}
                max={100}
              />
            </div>

            <Button
              id="btn-step2-continue"
              onClick={handleStep2Continue}
              loading={isLoading}
            >
              Continue
            </Button>
          </div>
        )}

        {/* ═══════════ STEP 3 — Services ═══════════ */}
        {step === 3 && (
          <div className="flex flex-col gap-[var(--spacing-xl)] animate-fade-in">
            <StepIndicator currentStep={3} totalSteps={3} />

            <div>
              <h1 className="text-[24px] font-semibold text-text">
                Services
              </h1>
              <p className="mt-[var(--spacing-xs)] text-[14px] text-text-secondary">
                Add the services you offer — you can always edit later
              </p>
            </div>

            <ServiceChips
              services={services}
              onAdd={handleAddService}
              onRemove={handleRemoveService}
            />

            {/* Dual buttons */}
            <div className="flex flex-col gap-[var(--spacing-sm)]">
              <Button
                id="btn-finish"
                onClick={handleFinish}
                loading={isLoading}
              >
                Finish
              </Button>

              <Button
                id="btn-skip"
                onClick={handleSkip}
                variant="secondary"
                disabled={isLoading}
              >
                Skip
              </Button>
            </div>
          </div>
        )}

        {/* ═══════════ SUCCESS ═══════════ */}
        {step === "success" && (
          <div className="flex flex-col items-center gap-[var(--spacing-xl)] animate-fade-in">
            {/* Success checkmark */}
            <div className="animate-scale-in">
              <div className="w-[60px] h-[60px] rounded-full bg-success-light flex items-center justify-center">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 36 36"
                  fill="none"
                  className="text-success"
                >
                  <path
                    d="M10 18L15.5 23.5L26 13"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-[22px] font-semibold text-text">
                Setup Complete
              </h2>
              <p className="mt-[var(--spacing-xs)] text-[14px] text-text-secondary">
                Your salon is ready to go
              </p>
            </div>

            <div className="w-full pt-[var(--spacing-sm)]">
              <Button id="btn-continue-dashboard">
                Continue
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
