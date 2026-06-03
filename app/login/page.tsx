"use client";

import { useState, useCallback, useEffect } from "react";
import BrandHeader from "@/components/login/BrandHeader";
import PhoneInput from "@/components/login/PhoneInput";
import OTPInput from "@/components/login/OTPInput";
import Button from "@/components/login/Button";
import { useRouter } from 'next/navigation';
import { useAppStore } from "@/stores/appStore";

// Mock OTP — prototype mode
const VALID_OTP = "1234";

type Step = "phone" | "otp" | "success";

export default function LoginPage() {
  const router = useRouter();
  const login = useAppStore((s) => s.login);
  const isSetupComplete = useAppStore((s) => s.isSetupComplete);
  // ── State ──
  const [step, setStep] = useState<Step>("phone");

  // Auto-redirect on login success
  useEffect(() => {
    if (step === "success") {
      const timer = setTimeout(() => {
        if (isSetupComplete) {
          router.push("/dashboard");
        } else {
          router.push("/setup");
        }
      }, 1500); // 1.5 seconds auto-redirect
      return () => clearTimeout(timer);
    }
  }, [step, router, isSetupComplete]);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpHasShakeError, setOtpHasShakeError] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // ── Derived ──
  const isPhoneValid = phone.length === 10;
  const isOtpComplete = otp.length === 4;

  // ── Handlers ──
  const handlePhoneChange = useCallback((value: string) => {
    setPhone(value);
    if (phoneError) setPhoneError("");
  }, [phoneError]);

  const handleOtpChange = useCallback((value: string) => {
    setOtp(value);
    if (otpError) {
      setOtpError("");
      setOtpHasShakeError(false);
    }
  }, [otpError]);

  const handleSendOTP = useCallback(async () => {
    if (!isPhoneValid) {
      setPhoneError("Enter a valid 10 digit phone number");
      return;
    }

    setIsLoading(true);
    setPhoneError("");

    // Fake delay: 800–1200ms
    const delay = 800 + Math.random() * 400;
    await new Promise((r) => setTimeout(r, delay));

    setIsLoading(false);
    setStep("otp");

    // Start resend timer (30s)
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isPhoneValid]);

  const handleVerifyOTP = useCallback(async () => {
    if (!isOtpComplete) return;

    setIsLoading(true);
    setOtpError("");

    // Fake delay: 800–1200ms
    const delay = 800 + Math.random() * 400;
    await new Promise((r) => setTimeout(r, delay));

    if (otp === VALID_OTP) {
      login(phone);
      setIsLoading(false);
      setStep("success");
    } else {
      setIsLoading(false);
      setOtpError("Invalid code. Please try again.");
      setOtpHasShakeError(true);
      setOtp("");
      // Clear shake after animation
      setTimeout(() => setOtpHasShakeError(false), 600);
    }
  }, [otp, isOtpComplete]);

  // Auto-verify when OTP is complete (4 digits)
  useEffect(() => {
    if (step === "otp" && otp.length === 4 && !isLoading) {
      handleVerifyOTP();
    }
  }, [otp, step, isLoading, handleVerifyOTP]);

  const handleResend = useCallback(async () => {
    if (resendTimer > 0) return;

    setIsLoading(true);
    setOtp("");
    setOtpError("");

    const delay = 800 + Math.random() * 400;
    await new Promise((r) => setTimeout(r, delay));

    setIsLoading(false);
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [resendTimer]);

  const handleBackToPhone = useCallback(() => {
    setStep("phone");
    setOtp("");
    setOtpError("");
    setOtpHasShakeError(false);
  }, []);

  // ── Render ──
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-[var(--spacing-md)] py-[var(--spacing-xl)]">
      {/* Card container — full width on mobile, centered card on tablet+ */}
      <div className="w-full max-w-[400px] mx-auto">

        {/* ═══════════════════════════════ PHONE STEP ═══════════════════════════════ */}
        {step === "phone" && (
          <div className="flex flex-col items-center gap-[var(--spacing-xl)]">
            <BrandHeader />

            <div className="w-full flex flex-col gap-[var(--spacing-md)]">
              <PhoneInput
                value={phone}
                onChange={handlePhoneChange}
                error={phoneError}
                disabled={isLoading}
              />

              <Button
                id="btn-continue"
                onClick={handleSendOTP}
                disabled={!isPhoneValid}
                loading={isLoading}
              >
                Continue
              </Button>
            </div>

            {/* Terms hint */}
            <p className="text-[12px] text-text-tertiary text-center leading-relaxed max-w-[280px]">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        )}

        {/* ═══════════════════════════════ OTP STEP ═══════════════════════════════ */}
        {step === "otp" && (
          <div className="flex flex-col items-center gap-[var(--spacing-lg)] animate-fade-in">
            {/* Back + Header */}
            <div className="w-full">
              <button
                onClick={handleBackToPhone}
                disabled={isLoading}
                className="flex items-center gap-1 text-[14px] text-text-secondary hover:text-text transition-colors duration-[var(--transition-fast)] mb-[var(--spacing-lg)] cursor-pointer disabled:opacity-50"
                aria-label="Go back to phone number"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.5 15L7.5 10L12.5 5" />
                </svg>
                Back
              </button>

              <div className="text-center">
                <h2 className="text-[22px] font-semibold text-text">
                  Verify your number
                </h2>
                <p className="mt-[var(--spacing-xs)] text-[14px] text-text-secondary">
                  We sent a code to{" "}
                  <span className="font-medium text-text">+91 {phone}</span>
                </p>
              </div>
            </div>

            {/* OTP Input */}
            <div className="w-full py-[var(--spacing-sm)]">
              <OTPInput
                value={otp}
                onChange={handleOtpChange}
                error={otpError}
                disabled={isLoading}
                hasError={otpHasShakeError}
              />
            </div>

            {/* Verify Button */}
            <div className="w-full">
              <Button
                id="btn-verify"
                onClick={handleVerifyOTP}
                disabled={!isOtpComplete}
                loading={isLoading}
              >
                Verify
              </Button>
            </div>

            {/* Resend */}
            <div className="text-center">
              {resendTimer > 0 ? (
                <p className="text-[13px] text-text-tertiary">
                  Resend code in{" "}
                  <span className="font-medium text-text-secondary tabular-nums">
                    {resendTimer}s
                  </span>
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={isLoading}
                  className="text-[13px] font-medium text-primary hover:text-primary-hover cursor-pointer transition-colors duration-[var(--transition-fast)] disabled:opacity-50"
                >
                  Resend code
                </button>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════ SUCCESS STEP ═══════════════════════════════ */}
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
                Verified
              </h2>
              <p className="mt-[var(--spacing-xs)] text-[14px] text-text-secondary">
                Your phone number has been verified successfully
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
