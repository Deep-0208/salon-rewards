interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export default function PhoneInput({
  value,
  onChange,
  error,
  disabled = false,
}: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "");
    if (raw.startsWith("91") && raw.length >= 12) {
      raw = raw.slice(2);
    } else if (raw.startsWith("0") && raw.length >= 11) {
      raw = raw.slice(1);
    }
    const sanitized = raw.slice(0, 10);
    onChange(sanitized);
  };

  const isValid = value.length === 10;
  const hasError = !!error;

  return (
    <div className="w-full animate-fade-in">
      <label
        htmlFor="phone-input"
        className="block text-[13px] font-medium text-text-secondary mb-[var(--spacing-sm)]"
      >
        Phone number
      </label>

      <div
        className={`
          flex items-center w-full rounded-[var(--radius-input)] border overflow-hidden
          transition-all duration-[var(--transition-normal)]
          ${hasError
            ? "border-error bg-error-light"
            : "border-border bg-input-bg focus-within:border-border-focus focus-within:bg-card focus-within:shadow-[0_0_0_3px_rgba(79,70,229,0.08)]"
          }
          ${disabled ? "opacity-50 pointer-events-none" : ""}
        `}
      >
        {/* Country code — fixed +91 for Indian market */}
        <span className="flex-shrink-0 pl-4 pr-2 py-[14px] text-[15px] font-medium text-text-secondary select-none border-r border-border">
          +91
        </span>

        <input
          id="phone-input"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="Enter 10 digit number"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? "phone-error" : undefined}
          className={`
            flex-1 px-3 py-[14px] text-[16px] font-normal text-text
            bg-transparent outline-none placeholder:text-text-tertiary
            min-h-[48px]
          `}
        />

        {/* Validation indicator */}
        {isValid && !hasError && (
          <div className="flex-shrink-0 pr-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-success"
            >
              <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.12" />
              <path
                d="M6.5 10.5L8.5 12.5L13.5 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <p
          id="phone-error"
          className="mt-[6px] text-[13px] text-error font-medium animate-fade-in"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
