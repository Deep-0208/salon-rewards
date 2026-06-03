import { useState } from "react";
import { useAppStore } from "@/stores/appStore";

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  icon?: string;
}

interface ServicesStepProps {
  customerName: string;
  initialServices: ServiceItem[];
  onContinue: (services: ServiceItem[]) => void;
}

export default function ServicesStep({ customerName, initialServices, onContinue }: ServicesStepProps) {
  const storeServices = useAppStore((s) => s.services);
  const [selected, setSelected] = useState<ServiceItem[]>(initialServices);

  const toggleService = (service: ServiceItem) => {
    setSelected((prev) => {
      const exists = prev.find((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      }
      return [...prev, service];
    });
  };

  const total = selected.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex-1 flex flex-col animate-fade-in">
      <div className="p-[var(--spacing-md)] flex-1 overflow-y-auto pb-[160px]">
        <div className="mb-[var(--spacing-lg)]">
          <h2 className="text-[18px] font-bold text-text mb-[4px]">Services</h2>
          <p className="text-[13px] text-text-secondary">
            Tap to select multiple services for {customerName}.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-[var(--spacing-md)]">
          {storeServices.map((service) => {
            const isSelected = selected.some((s) => s.id === service.id);
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => toggleService(service)}
                className={`
                  flex flex-col items-start p-[var(--spacing-md)]
                  rounded-[var(--radius-card)] border text-left
                  transition-all duration-200 active:scale-95 cursor-pointer
                  min-h-[110px] justify-between
                  ${isSelected 
                    ? "border-primary bg-primary/5 shadow-sm" 
                    : "border-border/60 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-border/80"
                  }
                `}
              >
                <div className={`
                  w-[44px] h-[44px] rounded-full flex items-center justify-center mb-2
                  ${isSelected ? "bg-primary text-white shadow-[0_4px_12px_rgba(79,70,229,0.2)]" : "bg-primary-light text-primary"}
                `}>
                  {service.id === "svc-haircut" ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="6" cy="6" r="3"></circle>
                      <circle cx="6" cy="18" r="3"></circle>
                      <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
                      <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
                      <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
                    </svg>
                  ) : service.id === "svc-beard" ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 3C7 3 7.5 7 12 7C16.5 7 17 3 17 3"></path>
                      <path d="M5 8C5 8 5 14 12 18C19 14 19 8 19 8"></path>
                    </svg>
                  ) : service.id === "svc-facial" ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  )}
                </div>
                <h3 className="font-semibold text-[15px] text-text line-clamp-1">{service.name}</h3>
                <p className="text-[13px] text-text-secondary font-medium mt-[2px]">₹{service.price}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border/50 p-[var(--spacing-md)] pb-[calc(var(--spacing-md)+env(safe-area-inset-bottom,0px))] shadow-[0_-8px_32px_rgba(0,0,0,0.08)] z-10 flex flex-col gap-[var(--spacing-md)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] text-text-tertiary font-medium">{selected.length} Services Selected</p>
            <p className="text-[20px] font-bold text-text mt-1 tabular-nums">Total: ₹{total}</p>
          </div>
          {selected.length > 0 && (
            <div className="bg-success-light text-success text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Ready
            </div>
          )}
        </div>
        <button
          type="button"
          disabled={selected.length === 0}
          onClick={() => onContinue(selected)}
          className="w-full min-h-[56px] bg-primary text-white font-semibold rounded-[var(--radius-button)] disabled:opacity-50 disabled:bg-text-tertiary disabled:active:scale-100 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-[8px] shadow-[0_4px_12px_rgba(24,23,21,0.15)]"
        >
          Continue
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
