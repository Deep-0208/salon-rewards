export default function BrandHeader() {
  return (
    <div className="text-center animate-fade-in">
      {/* Brand icon mark */}
      <div className="mx-auto mb-[var(--spacing-lg)] w-14 h-14 rounded-[var(--radius-card)] bg-primary flex items-center justify-center shadow-[0_2px_12px_rgba(79,70,229,0.25)]">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
          <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2Z" />
          <path d="M3 7.6v12.8A1.6 1.6 0 0 0 4.6 22h9.8" />
          <path d="M12 10l-1.5 5h3L12 10z" />
        </svg>
      </div>

      {/* App name */}
      <h1 className="text-[28px] font-semibold tracking-tight text-text leading-tight">
        Salon Rewards
      </h1>

      {/* Tagline */}
      <p className="mt-[var(--spacing-sm)] text-[15px] text-text-secondary font-normal">
        Reward your regulars
      </p>
    </div>
  );
}
