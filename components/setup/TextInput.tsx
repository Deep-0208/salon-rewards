interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  type?: "text" | "number";
  suffix?: string;
  helperText?: string;
  min?: number;
  max?: number;
}

export default function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  type = "text",
  suffix,
  helperText,
  min,
  max,
}: TextInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (type === "number") {
      // Allow only digits
      val = val.replace(/\D/g, "");
      const num = parseInt(val, 10);
      if (max !== undefined && num > max) val = String(max);
      if (val === "") val = "";
    }

    onChange(val);
  };

  return (
    <div className="flex flex-col gap-[6px]">
      <label
        htmlFor={id}
        className="text-[14px] font-medium text-text"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode={type === "number" ? "numeric" : "text"}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          className={`
            w-full min-h-[48px] px-[var(--spacing-md)] py-[13px]
            bg-input-bg border rounded-[var(--radius-input)]
            text-[15px] text-text placeholder:text-text-tertiary
            transition-all duration-[var(--transition-fast)]
            focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-primary/10 focus:bg-card
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-error" : "border-border"}
            ${suffix ? "pr-12" : ""}
          `}
        />

        {suffix && (
          <span className="absolute right-[var(--spacing-md)] top-1/2 -translate-y-1/2 text-[14px] text-text-tertiary font-medium pointer-events-none">
            {suffix}
          </span>
        )}
      </div>

      {error && (
        <p className="text-[12px] text-error">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-[12px] text-text-tertiary">{helperText}</p>
      )}
    </div>
  );
}
