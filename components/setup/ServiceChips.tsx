"use client";

import { useState } from "react";

interface Service {
  id: string;
  name: string;
  price: number;
}

interface ServiceChipsProps {
  services: Service[];
  onAdd: (service: Service) => void;
  onRemove: (id: string) => void;
}

export default function ServiceChips({ services, onAdd, onRemove }: ServiceChipsProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const handleAdd = () => {
    if (!newName.trim() || !newPrice.trim()) return;

    const service: Service = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      price: parseInt(newPrice, 10),
    };

    onAdd(service);
    setNewName("");
    setNewPrice("");
    setShowAddForm(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="flex flex-col gap-[var(--spacing-md)]">
      {/* Service chips */}
      <div className="flex flex-wrap gap-[10px]">
        {services.map((service) => (
          <div
            key={service.id}
            className="
              flex items-center gap-[8px]
              px-[14px] py-[10px]
              bg-card border border-border
              rounded-[var(--radius-button)]
              text-[14px] text-text
              transition-all duration-[var(--transition-fast)]
            "
          >
            <span className="font-medium">{service.name}</span>
            <span className="text-text-tertiary">₹{service.price}</span>
            <button
              onClick={() => onRemove(service.id)}
              className="group min-w-[44px] min-h-[44px] -mr-[12px] -my-[12px] flex items-center justify-center rounded-full text-text-tertiary hover:text-error transition-colors duration-[var(--transition-fast)] cursor-pointer"
              aria-label={`Remove ${service.name}`}
            >
              <div className="w-[20px] h-[20px] flex items-center justify-center rounded-full group-hover:bg-error-light transition-colors duration-[var(--transition-fast)]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M3 3l6 6M9 3l-6 6" />
                </svg>
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Add service */}
      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className="
            min-h-[44px] min-w-[44px] -my-[12px] -ml-[8px] px-[8px]
            flex items-center justify-center gap-[6px]
            text-[14px] font-medium text-primary
            hover:text-primary-hover
            cursor-pointer
            transition-colors duration-[var(--transition-fast)]
            self-start
          "
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 3v10M3 8h10" />
          </svg>
          <span>Add Service</span>
        </button>
      ) : (
        <div className="flex gap-[8px] animate-fade-in">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Service name"
            autoFocus
            className="
              flex-1 min-h-[44px] px-[12px]
              bg-input-bg border border-border rounded-[var(--radius-input)]
              text-[14px] text-text placeholder:text-text-tertiary
              focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-primary/10
              transition-all duration-[var(--transition-fast)]
            "
          />
          <input
            type="text"
            inputMode="numeric"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value.replace(/\D/g, ""))}
            onKeyDown={handleKeyDown}
            placeholder="₹"
            className="
              w-[80px] min-h-[44px] px-[12px]
              bg-input-bg border border-border rounded-[var(--radius-input)]
              text-[14px] text-text placeholder:text-text-tertiary
              focus:outline-none focus:border-border-focus focus:ring-2 focus:ring-primary/10
              transition-all duration-[var(--transition-fast)]
            "
          />
          <button
            onClick={handleAdd}
            disabled={!newName.trim() || !newPrice.trim()}
            className="
              min-h-[44px] px-[14px]
              bg-primary text-white
              rounded-[var(--radius-button)]
              text-[14px] font-medium
              cursor-pointer
              disabled:bg-primary/40 disabled:cursor-not-allowed
              transition-all duration-[var(--transition-fast)]
              active:scale-[0.97]
            "
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
