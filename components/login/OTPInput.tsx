"use client";

import { useRef, useEffect, useCallback } from "react";

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  hasError?: boolean;
}

export default function OTPInput({
  value,
  onChange,
  error,
  disabled = false,
  hasError = false,
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.split("").concat(Array(4 - value.length).fill(""));

  // Auto-focus first input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const focusInput = useCallback((index: number) => {
    if (index >= 0 && index < 4) {
      inputRefs.current[index]?.focus();
      inputRefs.current[index]?.select();
    }
  }, []);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Take only last character if multiple typed
    const digit = val.replace(/\D/g, "").slice(-1);

    if (!digit && val !== "") return;

    const newValue = value.split("");
    newValue[index] = digit;
    const result = newValue.join("").slice(0, 4);
    onChange(result);

    // Auto-advance to next input
    if (digit && index < 3) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Move to previous input on backspace when current is empty
        e.preventDefault();
        const newValue = value.split("");
        newValue[index - 1] = "";
        onChange(newValue.join(""));
        focusInput(index - 1);
      } else {
        // Clear current input
        const newValue = value.split("");
        newValue[index] = "";
        onChange(newValue.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < 3) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasted) {
      onChange(pasted);
      // Focus the last filled input or the next empty one
      focusInput(Math.min(pasted.length, 3));
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <label className="block text-[13px] font-medium text-text-secondary mb-[var(--spacing-sm)] text-center">
        Enter verification code
      </label>

      <div
        className={`flex justify-center gap-3 ${hasError ? "animate-shake" : ""}`}
        onPaste={handlePaste}
      >
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? "one-time-code" : "off"}
            maxLength={1}
            value={digits[index] || ""}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={(e) => e.target.select()}
            disabled={disabled}
            aria-label={`Digit ${index + 1}`}
            className={`
              w-[56px] h-[56px] text-center text-[22px] font-semibold
              rounded-[var(--radius-input)] border
              outline-none transition-all duration-[var(--transition-normal)]
              ${
                hasError
                  ? "border-error bg-error-light text-error"
                  : digits[index]
                  ? "border-primary bg-primary-light text-text"
                  : "border-border bg-input-bg text-text"
              }
              focus:border-border-focus focus:bg-card
              focus:shadow-[0_0_0_3px_rgba(79,70,229,0.08)]
              disabled:opacity-50 disabled:pointer-events-none
              placeholder:text-text-tertiary
            `}
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p
          className="mt-[var(--spacing-sm)] text-[13px] text-error font-medium text-center animate-fade-in"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
