import { useState, useRef, useEffect } from "react";
import { CustomerData } from "./CustomerStep";
import { ServiceItem } from "./ServicesStep";

interface BillingStepProps {
  customer: CustomerData;
  services: ServiceItem[];
  rewardPercentage: number;
  maxRedeemPercentage: number;
  onComplete: (details: { bill: number; reward: number; paid: number; method: "cash" | "online" }) => void;
}

export default function BillingStep({ customer, services, rewardPercentage, maxRedeemPercentage, onComplete }: BillingStepProps) {
  const [rewardInputValue, setRewardInputValue] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("online");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  const otpInputRef = useRef<HTMLInputElement>(null);

  // Billing math
  const totalBill = services.reduce((sum, item) => sum + item.price, 0);
  
  // Redeem Limit: based on dynamic store config (applied to customer's earned reward)
  const redeemLimit = Math.round(customer.rewardBalance * maxRedeemPercentage);
  const maxApplicableReward = Math.min(totalBill, redeemLimit);
  
  const parsedInput = parseInt(rewardInputValue || "0", 10);
  const rewardUsed = Math.min(isNaN(parsedInput) ? 0 : parsedInput, maxApplicableReward);
  
  const finalPaid = totalBill - rewardUsed;
  const rewardEarned = Math.round(finalPaid * rewardPercentage);

  const handleCompleteClick = () => {
    if (isSaving) return;
    if (rewardUsed > 0) {
      setShowOTP(true);
    } else {
      setIsSaving(true);
      onComplete({ bill: totalBill, reward: rewardUsed, paid: finalPaid, method: paymentMethod });
    }
  };

  const handleVerifyOTP = () => {
    if (isSaving || otpVerified) return;
    if (otp === "1234") {
      setIsSaving(true);
      setOtpVerified(true);
      setTimeout(() => {
        onComplete({ bill: totalBill, reward: rewardUsed, paid: finalPaid, method: paymentMethod });
      }, 1200);
    } else {
      setOtpError(true);
      setOtp("");
    }
  };

  const handleContinueWithoutReward = () => {
    if (isSaving || otpVerified) return;
    // Reward -> 0, complete normally
    setRewardInputValue("0");
    setShowOTP(false);
    setIsSaving(true);
    onComplete({ bill: totalBill, reward: 0, paid: totalBill, method: paymentMethod });
  };

  // Auto-focus OTP
  useEffect(() => {
    if (showOTP && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [showOTP]);

  // Auto-verify OTP when 4 digits are entered
  useEffect(() => {
    if (showOTP && otp.length === 4 && !isSaving && !otpVerified) {
      handleVerifyOTP();
    }
  }, [otp, showOTP, isSaving, otpVerified]);

  return (
    <div className="flex-1 flex flex-col p-[var(--spacing-md)] animate-fade-in relative pb-[120px]">
      
      {/* Bill Summary Card */}
      <div className="bg-card rounded-[var(--radius-card)] p-[var(--spacing-lg)] mb-[var(--spacing-sm)] flex flex-col items-center justify-center shadow-[var(--shadow-soft)]">
        <p className="text-[11px] text-text-tertiary uppercase tracking-widest font-semibold mb-[var(--spacing-xs)]">FINAL PAY</p>
        <h2 className="text-[40px] font-bold text-primary leading-none tracking-tight flex items-start">
          <span className="text-[20px] mt-[4px] mr-[2px]">₹</span>
          {finalPaid}
        </h2>
        {rewardUsed > 0 && (
          <p className="text-[13px] text-text-secondary font-medium mt-[var(--spacing-sm)]">
            Original Bill ₹{totalBill} • <span className="text-success">Saved ₹{rewardUsed}</span>
          </p>
        )}
      </div>

      {/* Rewards Card */}
      <div className="bg-card rounded-[var(--radius-card)] p-[var(--spacing-md)] mb-[var(--spacing-sm)] shadow-[var(--shadow-soft)]">
        <div className="flex flex-col gap-[var(--spacing-md)]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-[12px]">
              <div className="w-[40px] h-[40px] rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[15px] text-text">Available Rewards</p>
                <p className="text-[12px] text-text-secondary mt-[2px]">Balance: ₹{customer.rewardBalance} • Max Redeem: ₹{maxApplicableReward}</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary font-bold text-[20px]">₹</div>
            <input 
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={rewardInputValue}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") {
                  setRewardInputValue("");
                  return;
                }
                const num = parseInt(val, 10);
                if (!isNaN(num)) {
                  if (num > maxApplicableReward) {
                    setRewardInputValue(maxApplicableReward.toString());
                  } else {
                    setRewardInputValue(num.toString());
                  }
                }
              }}
              className="w-full h-[64px] pl-[40px] pr-[16px] bg-surface border-2 border-border/40 focus:border-primary focus:shadow-[0_0_0_3px_rgba(79,70,229,0.1)] rounded-[var(--radius-input)] text-[28px] font-bold outline-none transition-all tabular-nums"
            />
          </div>
        </div>
        
        {/* Reward Earned Preview */}
        <div className="mt-[var(--spacing-sm)] pt-[var(--spacing-sm)] border-t border-border/20 flex justify-between items-center">
          <div>
            <p className="text-[13px] text-text-secondary font-medium">Earn Today</p>
            <p className="text-[11px] text-text-tertiary">{Math.round(rewardPercentage * 100)}% of Final Pay</p>
          </div>
          <p className="font-bold text-[15px] text-success flex items-center gap-[4px]">
             +₹{rewardEarned}
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-success">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-[var(--spacing-lg)]">
        <p className="text-[12px] text-text-tertiary font-semibold uppercase tracking-wider mb-[var(--spacing-sm)] pl-[4px]">Payment Method</p>
        <div className="flex bg-surface rounded-[var(--radius-input)] p-[4px] gap-1">
          <button
            type="button"
            onClick={() => setPaymentMethod("cash")}
            className={`
              flex-1 flex items-center justify-center gap-[8px] min-h-[56px] rounded-[16px] transition-all cursor-pointer
              ${paymentMethod === "cash" ? "bg-primary text-white shadow-[0_4px_16px_rgba(79,70,229,0.25)] font-semibold" : "text-text-secondary hover:bg-black/5"}
            `}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <circle cx="12" cy="12" r="2" />
              <path d="M6 12h.01M18 12h.01" />
            </svg>
            <span className="text-[15px]">Cash</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("online")}
            className={`
              flex-1 flex items-center justify-center gap-[8px] min-h-[56px] rounded-[16px] transition-all cursor-pointer
              ${paymentMethod === "online" ? "bg-primary text-white shadow-[0_4px_16px_rgba(79,70,229,0.25)] font-semibold" : "text-text-secondary hover:bg-black/5"}
            `}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <rect x="7" y="7" width="3" height="3" />
              <rect x="14" y="7" width="3" height="3" />
              <rect x="7" y="14" width="3" height="3" />
              <rect x="14" y="14" width="3" height="3" />
            </svg>
            <span className="text-[14px]">Online</span>
          </button>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-[var(--spacing-md)] pb-[calc(var(--spacing-md)+env(safe-area-inset-bottom,0px))] bg-card/90 backdrop-blur-xl border-t border-border/20 shadow-[0_-8px_32px_rgba(0,0,0,0.08)] z-10">
        <button
          type="button"
          disabled={isSaving}
          onClick={handleCompleteClick}
          className="w-full min-h-[56px] bg-primary text-white font-semibold text-[16px] rounded-[var(--radius-button)] disabled:opacity-80 active:scale-[0.97] transition-all cursor-pointer shadow-[0_4px_16px_rgba(79,70,229,0.3)] flex items-center justify-center gap-[8px]"
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            "Complete Visit"
          )}
        </button>
      </div>

      {/* Inline OTP Bottom Sheet Overlay */}
      {showOTP && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowOTP(false)} />
          <div className="relative bg-card w-full rounded-t-[var(--radius-sheet)] p-[var(--spacing-lg)] pb-[calc(var(--spacing-2xl)+env(safe-area-inset-bottom,0px))] animate-[fadeIn_0.2s_ease-out_forwards]">
            
            {otpVerified ? (
              <div className="flex flex-col items-center justify-center py-[var(--spacing-lg)] animate-scale-in">
                <div className="w-[64px] h-[64px] rounded-full bg-success-light flex items-center justify-center mb-[var(--spacing-md)] animate-scale-in">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="text-success">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="text-[20px] font-bold text-text mb-[4px] text-center">OTP Verified</h3>
                <p className="text-[14px] text-text-secondary text-center">
                  Completing your visit transaction...
                </p>
              </div>
            ) : (
              <>
                <div className="w-[40px] h-[4px] bg-border rounded-full mx-auto mb-[var(--spacing-lg)]" />
                
                <h3 className="text-[20px] font-bold text-text mb-[4px]">Verify Reward</h3>
                <p className="text-[14px] text-text-secondary mb-[var(--spacing-xl)]">
                  OTP sent to {customer.phone.replace(/.(?=.{4})/g, 'x')}
                </p>

                <div className="mb-[var(--spacing-xl)]">
                  <input
                    ref={otpInputRef}
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/[^0-9]/g, ''));
                      setOtpError(false);
                    }}
                    maxLength={4}
                    className={`w-full h-[64px] bg-surface border-2 ${otpError ? 'border-error text-error animate-shake' : 'border-border/40 focus:border-primary'} rounded-[var(--radius-input)] text-center text-[24px] font-bold tracking-[1em] outline-none transition-colors`}
                    placeholder="••••"
                    inputMode="numeric"
                  />
                  {otpError && (
                    <p className="text-error text-[12px] font-medium mt-[8px] text-center">Invalid OTP. Use 1234 for prototype.</p>
                  )}
                </div>

                <div className="flex flex-col gap-[var(--spacing-md)]">
                  <button
                    type="button"
                    disabled={otp.length !== 4 || isSaving}
                    onClick={handleVerifyOTP}
                    className="w-full min-h-[56px] bg-primary text-white font-semibold rounded-[var(--radius-button)] disabled:opacity-50 disabled:active:scale-100 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-[8px]"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Saving...</span>
                      </>
                    ) : (
                      "Verify & Complete"
                    )}
                  </button>
                  
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={handleContinueWithoutReward}
                    className="w-full min-h-[44px] text-primary font-semibold text-[14px] active:opacity-70 transition-opacity cursor-pointer disabled:opacity-50"
                  >
                    Continue Without Reward
                  </button>
                </div>

                <p className="text-center text-[12px] text-text-tertiary mt-[var(--spacing-lg)]">
                  Didn&apos;t receive the code? <button className="text-primary font-medium hover:underline">Resend OTP</button>
                </p>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
