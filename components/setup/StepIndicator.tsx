interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div
            key={stepNum}
            className={`
              h-[3px] flex-1 rounded-full transition-all duration-[var(--transition-normal)]
              ${isActive ? "bg-primary" : isCompleted ? "bg-primary" : "bg-border"}
            `}
          />
        );
      })}
    </div>
  );
}
