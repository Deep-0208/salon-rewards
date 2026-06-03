import { useState, useEffect } from "react";
import { useAppStore } from "@/stores/appStore";

export interface CustomerData {
  phone: string;
  name: string;
  visits: number;
  rewardBalance: number;
  lastVisit?: string;
  isNew?: boolean;
}

interface CustomerStepProps {
  initialData: CustomerData | null;
  onContinue: (data: CustomerData) => void;
}

export default function CustomerStep({ initialData, onContinue }: CustomerStepProps) {
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [customer, setCustomer] = useState<CustomerData | null>(initialData?.isNew ? null : initialData);
  const [isSearching, setIsSearching] = useState(false);
  const [isNewCustomer, setIsNewCustomer] = useState(!!initialData?.isNew);
  const [newName, setNewName] = useState(initialData?.isNew && initialData.name !== "New Customer" ? initialData.name : "");

  // Auto-fill and search simulation
  useEffect(() => {
    if (!initialData) {
      setPhone("9876543210");
    }
  }, [initialData]);

  useEffect(() => {
    let active = true;
    if (phone.length === 10) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        if (!active) return;
        const foundCustomer = useAppStore.getState().findCustomerByPhone(phone);
        
        if (foundCustomer) {
          setCustomer({
            phone: foundCustomer.phone,
            name: foundCustomer.name,
            visits: foundCustomer.totalVisits,
            rewardBalance: foundCustomer.rewardBalance,
            lastVisit: "Recent visit",
          });
          setIsNewCustomer(false);
        } else {
          setCustomer(null);
          setIsNewCustomer(true);
        }
        setIsSearching(false);
      }, 500); // 500ms fake delay
      return () => {
        active = false;
        clearTimeout(timer);
      };
    } else {
      setCustomer(null);
      setIsNewCustomer(false);
      setIsSearching(false);
    }
  }, [phone]);

  const canContinue = phone.length === 10 && (customer !== null || isNewCustomer);

  return (
    <div className="flex-1 flex flex-col p-[var(--spacing-md)] animate-fade-in">
      <div className="mb-[var(--spacing-xl)]">
        <label htmlFor="phone-input" className="block text-[13px] font-medium text-text-secondary mb-[var(--spacing-xs)]">
          Customer Mobile Number
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            id="phone-input"
            type="tel"
            value={phone}
            onChange={(e) => {
              let raw = e.target.value.replace(/\D/g, "");
              if (raw.startsWith("91") && raw.length >= 12) {
                raw = raw.slice(2);
              } else if (raw.startsWith("0") && raw.length >= 11) {
                raw = raw.slice(1);
              }
              const sanitized = raw.slice(0, 10);
              setPhone(sanitized);
            }}
            className="w-full h-[56px] pl-[44px] pr-[16px] bg-card border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-[var(--radius-input)] text-[16px] font-medium outline-none transition-all shadow-sm"
            placeholder="Enter mobile number"
            autoComplete="off"
          />
        </div>
      </div>

      {isSearching && (
        <div className="bg-card border border-border/60 rounded-[var(--radius-card)] p-[var(--spacing-md)] flex items-center justify-center min-h-[120px] shadow-sm">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}

      {!isSearching && customer && (
        <div className="bg-card border border-success/30 rounded-[var(--radius-card)] p-[var(--spacing-md)] shadow-[0_4px_12px_rgba(0,0,0,0.02)] animate-fade-in">
          <div className="flex items-start justify-between mb-[var(--spacing-md)]">
            <div className="flex items-center gap-[12px]">
              <div className="w-[42px] h-[42px] rounded-full bg-primary-light flex items-center justify-center text-primary font-bold text-[16px]">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-[16px] text-text leading-tight">{customer.name}</h3>
                <p className="text-[12px] text-text-secondary mt-[2px]">Active Member</p>
              </div>
            </div>
            <span className="bg-success-light text-success text-[11px] font-bold px-[8px] py-[3px] rounded-full uppercase tracking-wide">
              Found
            </span>
          </div>

          <div className="grid grid-cols-2 gap-[var(--spacing-md)] py-[var(--spacing-sm)] border-t border-border/40">
            <div>
              <p className="text-[11px] text-text-tertiary uppercase tracking-wider mb-[2px]">Reward Balance</p>
              <p className="font-bold text-[15px] text-success flex items-center gap-[4px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-success">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
                ₹{customer.rewardBalance}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-text-tertiary uppercase tracking-wider mb-[2px]">Total Visits</p>
              <p className="font-bold text-[15px] text-text flex items-center gap-[4px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {customer.visits}
              </p>
            </div>
          </div>
          
          {customer.lastVisit && (
            <div className="pt-[var(--spacing-sm)] mt-[var(--spacing-xs)] border-t border-border/40">
              <p className="text-[11px] text-text-tertiary uppercase tracking-wider mb-[2px]">Last Visit</p>
              <p className="text-[13px] text-text-secondary font-medium">{customer.lastVisit}</p>
            </div>
          )}
        </div>
      )}

      {!isSearching && isNewCustomer && (
        <div className="bg-card border border-border/60 rounded-[var(--radius-card)] p-[var(--spacing-md)] shadow-sm animate-fade-in">
          <div className="flex items-center gap-[12px] mb-[var(--spacing-md)]">
            <div className="w-[42px] h-[42px] rounded-full bg-surface flex items-center justify-center text-[20px]">
              ❔
            </div>
            <div>
              <h3 className="font-semibold text-[16px] text-text leading-tight">New Customer</h3>
              <p className="text-[13px] text-text-secondary mt-[2px]">{phone}</p>
            </div>
          </div>

          <div className="pt-[var(--spacing-md)] border-t border-border/40">
            <label htmlFor="name-input" className="block text-[13px] font-medium text-text-secondary mb-[var(--spacing-xs)]">
              Name (Optional)
            </label>
            <input
              id="name-input"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full h-[48px] px-[16px] bg-surface border border-border focus:border-primary focus:ring-1 focus:ring-primary rounded-[var(--radius-input)] text-[15px] font-medium outline-none transition-all"
              placeholder="e.g. Rahul Kumar"
              maxLength={40}
            />
            <p className="text-[12px] text-text-tertiary mt-[8px] leading-relaxed">
              This customer will be saved automatically when the visit completes.
            </p>
          </div>
        </div>
      )}

      <div className="mt-auto pt-[var(--spacing-xl)]">
        <button
          type="button"
          disabled={!canContinue}
          onClick={() => {
            if (customer) {
              onContinue(customer);
            } else if (isNewCustomer) {
              onContinue({
                phone,
                name: newName.trim() || "New Customer",
                visits: 0,
                rewardBalance: 0,
                isNew: true
              });
            }
          }}
          className="w-full min-h-[56px] bg-primary text-white font-semibold rounded-[var(--radius-button)] disabled:opacity-50 disabled:active:scale-100 active:scale-95 transition-all cursor-pointer shadow-[0_4px_12px_rgba(24,23,21,0.15)] flex items-center justify-center gap-[8px]"
        >
          {customer ? `Continue with ${customer.name}` : "Continue"}
          {(customer || isNewCustomer) && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
