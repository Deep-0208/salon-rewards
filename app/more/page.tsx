"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/stores/appStore";
import BottomNav from "@/components/dashboard/BottomNav";

type PendingAction =
  | { type: "add_service"; payload: { id: string; name: string; price: number } }
  | { type: "remove_service"; payload: string }
  | { type: "update_service"; payload: { id: string; name: string; price: number } }
  | { type: "update_all_services"; payload: { id: string; name: string; price: number }[] }
  | { type: "update_rewards"; payload: { rp: number; mrp: number } }
  | null;

export default function MorePage() {
  const router = useRouter();
  const shopName = useAppStore((s) => s.shopConfig.shopName);
  const rewardPercent = useAppStore((s) => s.shopConfig.rewardPercent);
  const maxRedeemPercent = useAppStore((s) => s.shopConfig.maxRedeemPercent);
  const services = useAppStore((s) => s.services);
  const logout = useAppStore((s) => s.logout);
  const updateShopConfig = useAppStore((s) => s.updateShopConfig);
  const addService = useAppStore((s) => s.addService);
  const removeService = useAppStore((s) => s.removeService);
  const updateService = useAppStore((s) => s.updateService);
  const updateAllServices = useAppStore((s) => s.updateAllServices);

  const [showServicesSheet, setShowServicesSheet] = useState(false);
  const [showRewardSheet, setShowRewardSheet] = useState(false);
  const [showShopSheet, setShowShopSheet] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const executeAction = useCallback((action: PendingAction) => {
    if (!action) return;
    if (action.type === "add_service") {
      addService(action.payload);
    } else if (action.type === "remove_service") {
      removeService(action.payload);
    } else if (action.type === "update_service") {
      updateService(action.payload.id, { name: action.payload.name, price: action.payload.price });
    } else if (action.type === "update_all_services") {
      updateAllServices(action.payload);
    } else if (action.type === "update_rewards") {
      updateShopConfig({
        rewardPercent: action.payload.rp,
        maxRedeemPercent: action.payload.mrp,
      });
      setShowRewardSheet(false);
    }
  }, [addService, removeService, updateService, updateAllServices, updateShopConfig]);

  const requestSecureAction = useCallback((action: PendingAction) => {
    if (isOtpVerified) {
      executeAction(action);
    } else {
      setPendingAction(action);
    }
  }, [isOtpVerified, executeAction]);

  const handleLogout = useCallback(() => {
    logout();
    router.push("/login");
  }, [logout, router]);

  return (
    <div className="flex-1 flex flex-col pb-[100px]">
      {/* Header */}
      <header className="px-[var(--spacing-md)] pt-[var(--spacing-xl)] pb-[var(--spacing-sm)] animate-fade-in">
        <h1 className="text-[28px] font-bold tracking-tight text-text">More</h1>
        <p className="text-[14px] text-text-secondary mt-[2px]">
          Manage your salon
        </p>
      </header>

      {/* Quick Actions */}
      <section
        className="px-[var(--spacing-md)] mt-[var(--spacing-sm)] animate-fade-in"
        style={{ animationDelay: "50ms" }}
        aria-label="Quick Actions"
      >
        <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-[var(--spacing-s)]">
          Quick Actions
        </p>

        <div className="bg-card rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] overflow-hidden">
          {/* Services */}
          <button
            type="button"
            onClick={() => setShowServicesSheet(true)}
            className="w-full flex items-center gap-[var(--spacing-sm)] px-[var(--spacing-md)] py-[var(--spacing-sm)] min-h-[64px] cursor-pointer active:bg-surface transition-colors text-left"
          >
            <div className="w-[42px] h-[42px] rounded-[14px] bg-primary-light flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[15px] font-semibold text-text">Services</span>
              <p className="text-[12px] text-text-secondary mt-[2px]">
                {services.length} service{services.length !== 1 ? "s" : ""} configured
              </p>
            </div>
            <ChevronRight />
          </button>

          <div className="border-t border-border/20 mx-[var(--spacing-md)]" />

          {/* Reward Rules */}
          <button
            type="button"
            onClick={() => setShowRewardSheet(true)}
            className="w-full flex items-center gap-[var(--spacing-sm)] px-[var(--spacing-md)] py-[var(--spacing-sm)] min-h-[64px] cursor-pointer active:bg-surface transition-colors text-left"
          >
            <div className="w-[42px] h-[42px] rounded-[14px] bg-success-light flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[15px] font-semibold text-text">Reward Rules</span>
              <p className="text-[12px] text-text-secondary mt-[2px]">
                Earn {rewardPercent}% · Max redeem {maxRedeemPercent}%
              </p>
            </div>
            <ChevronRight />
          </button>

          <div className="border-t border-border/20 mx-[var(--spacing-md)]" />

          {/* Shop */}
          <button
            type="button"
            onClick={() => setShowShopSheet(true)}
            className="w-full flex items-center gap-[var(--spacing-sm)] px-[var(--spacing-md)] py-[var(--spacing-sm)] min-h-[64px] cursor-pointer active:bg-surface transition-colors text-left"
          >
            <div className="w-[42px] h-[42px] rounded-[14px] bg-warning-light flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-warning)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
                <path d="M9 21V12h6v9" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[15px] font-semibold text-text">Shop</span>
              <p className="text-[12px] text-text-secondary mt-[2px]">
                {shopName}
              </p>
            </div>
            <ChevronRight />
          </button>
        </div>
      </section>

      {/* Settings */}
      <section
        className="px-[var(--spacing-md)] mt-[var(--spacing-md)] animate-fade-in"
        style={{ animationDelay: "100ms" }}
        aria-label="Settings"
      >
        <p className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider mb-[var(--spacing-s)]">
          Settings
        </p>

        <div className="bg-card rounded-[var(--radius-card)] shadow-[var(--shadow-subtle)] overflow-hidden">
          {/* Notifications */}
          <SettingsRow icon={<BellIcon />} label="Notifications" subtitle="Manage alerts" />

          <div className="border-t border-border/20 mx-[var(--spacing-md)]" />

          {/* Help */}
          <SettingsRow icon={<HelpIcon />} label="Help" subtitle="FAQ & support" />

          <div className="border-t border-border/20 mx-[var(--spacing-md)]" />

          {/* Logout */}
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center gap-[var(--spacing-sm)] px-[var(--spacing-md)] py-[var(--spacing-sm)] min-h-[64px] cursor-pointer active:bg-surface transition-colors text-left"
          >
            <div className="w-[42px] h-[42px] rounded-[14px] bg-error-light flex items-center justify-center flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[15px] font-semibold text-error">Logout</span>
              <p className="text-[12px] text-text-secondary mt-[2px]">
                Sign out of your account
              </p>
            </div>
          </button>
        </div>
      </section>

      {/* Bottom Nav */}
      <BottomNav />

      {/* ═══════════ EDITABLE BOTTOM SHEETS ═══════════ */}

      {/* Services Sheet — Edit */}
      {showServicesSheet && (
        <EditServicesSheet
          initialServices={services}
          onSaveAll={(newServices) => requestSecureAction({ type: "update_all_services", payload: newServices })}
          onClose={() => setShowServicesSheet(false)}
        />
      )}

      {/* Reward Rules Sheet — Edit */}
      {showRewardSheet && (
        <EditRewardSheet
          rewardPercent={rewardPercent}
          maxRedeemPercent={maxRedeemPercent}
          onSave={(rp, mrp) => requestSecureAction({ type: "update_rewards", payload: { rp, mrp } })}
          onClose={() => setShowRewardSheet(false)}
        />
      )}

      {/* OTP Verification Overlay */}
      {pendingAction && (
        <OTPVerificationSheet
          onVerify={(otp) => {
            setIsOtpVerified(true);
            executeAction(pendingAction);
            setPendingAction(null);
          }}
          onCancel={() => setPendingAction(null)}
        />
      )}

      {/* Shop Sheet — Edit */}
      {showShopSheet && (
        <EditShopSheet
          shopName={shopName}
          onSave={(name) => {
            updateShopConfig({ shopName: name });
            setShowShopSheet(false);
          }}
          onClose={() => setShowShopSheet(false)}
        />
      )}

      {/* Logout Confirm */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center animate-fade-in"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="w-full max-w-[768px] bg-card rounded-t-[32px] shadow-[0_-8px_32px_rgba(0,0,0,0.12)] pb-[env(safe-area-inset-bottom,16px)] animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center pt-[12px] pb-[8px]">
              <div className="w-[36px] h-[4px] rounded-full bg-border" />
            </div>

            <div className="px-[var(--spacing-md)] pb-[var(--spacing-md)] text-center">
              <h2 className="text-[18px] font-semibold text-text">Logout?</h2>
              <p className="text-[14px] text-text-secondary mt-[var(--spacing-xs)]">
                Are you sure you want to sign out?
              </p>

              <div className="flex flex-col gap-[var(--spacing-sm)] mt-[var(--spacing-lg)]">
                <button
                  onClick={handleLogout}
                  className="w-full h-[50px] rounded-[var(--radius-button)] bg-error text-white font-semibold text-[15px] cursor-pointer active:scale-[0.98] transition-transform"
                >
                  Logout
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full h-[50px] rounded-[var(--radius-button)] bg-bg text-text font-medium text-[15px] cursor-pointer active:scale-[0.98] transition-transform border border-border/40"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════════════
// EDITABLE SHEETS
// ═══════════════════════════════════════════════════

// ── Edit Services Sheet ──
function EditServicesSheet({
  initialServices,
  onSaveAll,
  onClose,
}: {
  initialServices: { id: string; name: string; price: number }[];
  onSaveAll: (services: { id: string; name: string; price: number }[]) => void;
  onClose: () => void;
}) {
  const [localServices, setLocalServices] = useState(initialServices);

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);

  const handleAdd = () => {
    const name = newName.trim();
    const price = Number(newPrice);
    if (!name || !price || price <= 0) return;

    const newServices = [...localServices, {
      id: `svc-${Date.now()}`,
      name,
      price,
    }];
    setLocalServices(newServices);
    setNewName("");
    setNewPrice("");
    setShowAddForm(false);
    
    // Save immediately so the new service is available everywhere
    onSaveAll(newServices);
  };

  const handleRemove = (id: string) => {
    setLocalServices(localServices.filter((s) => s.id !== id));
  };

  const handleUpdate = (id: string, name: string, price: number) => {
    setLocalServices(localServices.map((s) => s.id === id ? { ...s, name, price } : s));
  };

  const handleDone = () => {
    const isChanged = JSON.stringify(initialServices) !== JSON.stringify(localServices);
    if (isChanged) {
      onSaveAll(localServices);
      setIsEditMode(false);
    } else {
      setIsEditMode(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[768px] bg-card rounded-t-[var(--radius-sheet)] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] pb-[env(safe-area-inset-bottom,16px)] animate-slide-up max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag indicator */}
        <div className="flex justify-center pt-[12px] pb-[8px]">
          <div className="w-[36px] h-[4px] rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-[var(--spacing-md)] pb-[var(--spacing-md)]">
          <h2 className="text-[18px] font-semibold text-text">Edit Services</h2>
          <button
            onClick={onClose}
            className="w-[44px] h-[44px] rounded-full bg-bg flex items-center justify-center text-text-tertiary hover:text-text cursor-pointer transition-colors"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="border-t border-border/40" />

        {/* Scrollable list */}
        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-[var(--spacing-md)] py-[var(--spacing-md)]">
          <div className="flex flex-col gap-[8px]">
            {localServices.map((svc) => (
              editingId === svc.id ? (
                <div key={svc.id} className="p-[14px] bg-bg rounded-[var(--radius-input)] border border-border/40">
                  <div className="flex flex-col gap-[10px]">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Service name"
                      className="w-full h-[44px] px-[14px] rounded-[var(--radius-input)] border border-border bg-card text-[14px] text-text placeholder:text-text-tertiary outline-none focus:border-primary transition-colors"
                      autoFocus
                    />
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      placeholder="Price (₹)"
                      min="1"
                      className="w-full h-[44px] px-[14px] rounded-[var(--radius-input)] border border-border bg-card text-[14px] text-text placeholder:text-text-tertiary outline-none focus:border-primary transition-colors"
                    />
                    <div className="flex gap-[8px]">
                      <button
                        onClick={() => {
                          if (editName.trim() && Number(editPrice) > 0) {
                            handleUpdate(svc.id, editName.trim(), Number(editPrice));
                            setEditingId(null);
                          }
                        }}
                        disabled={!editName.trim() || Number(editPrice) <= 0}
                        className="flex-1 h-[44px] rounded-[var(--radius-button)] bg-primary text-white font-semibold text-[14px] cursor-pointer active:scale-[0.98] transition-transform disabled:opacity-40"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="h-[44px] px-[16px] rounded-[var(--radius-button)] bg-card border border-border/40 text-text font-medium text-[14px] cursor-pointer active:scale-[0.98] transition-transform"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={svc.id}
                  className="flex items-center justify-between py-[10px] px-[14px] bg-bg rounded-[var(--radius-input)] group transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[14px] font-medium text-text">{svc.name}</span>
                  </div>
                  <div className="flex items-center gap-[12px]">
                    <span className="text-[14px] font-semibold text-text tabular-nums">₹{svc.price}</span>
                    {isEditMode && (
                      <div className="flex items-center gap-[6px] animate-fade-in">
                        <button
                          onClick={() => {
                            setEditingId(svc.id);
                            setEditName(svc.name);
                            setEditPrice(String(svc.price));
                            setShowAddForm(false);
                          }}
                          className="w-[28px] h-[28px] rounded-full bg-border/50 hover:bg-border flex items-center justify-center text-text-secondary cursor-pointer active:scale-95 transition-all flex-shrink-0"
                          aria-label={`Edit ${svc.name}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleRemove(svc.id)}
                          className="w-[28px] h-[28px] rounded-full bg-error-light flex items-center justify-center text-error cursor-pointer active:scale-95 transition-transform flex-shrink-0"
                          aria-label={`Remove ${svc.name}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="border-t border-border/40 p-[var(--spacing-md)] bg-card">
          {showAddForm ? (
            <div className="p-[14px] bg-bg rounded-[var(--radius-input)] border border-border/40">
              <div className="flex flex-col gap-[10px]">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Service name"
                  className="w-full h-[44px] px-[14px] rounded-[var(--radius-input)] border border-border bg-card text-[14px] text-text placeholder:text-text-tertiary outline-none focus:border-primary transition-colors"
                  autoFocus
                />
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="Price (₹)"
                  min="1"
                  className="w-full h-[44px] px-[14px] rounded-[var(--radius-input)] border border-border bg-card text-[14px] text-text placeholder:text-text-tertiary outline-none focus:border-primary transition-colors"
                />
                <div className="flex gap-[8px]">
                  <button
                    onClick={handleAdd}
                    disabled={!newName.trim() || !newPrice || Number(newPrice) <= 0}
                    className="flex-1 h-[44px] rounded-[var(--radius-button)] bg-primary text-white font-semibold text-[14px] cursor-pointer active:scale-[0.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => { setShowAddForm(false); setNewName(""); setNewPrice(""); }}
                    className="h-[44px] px-[16px] rounded-[var(--radius-button)] bg-card border border-border/40 text-text font-medium text-[14px] cursor-pointer active:scale-[0.98] transition-transform"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-[12px]">
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setIsEditMode(false);
                }}
                className="flex-1 h-[50px] rounded-[var(--radius-button)] bg-primary text-white font-semibold text-[15px] flex items-center justify-center gap-[8px] cursor-pointer active:scale-[0.98] transition-transform shadow-[0_2px_8px_rgba(var(--color-primary-rgb),0.25)]"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add New Service
              </button>
              <button
                onClick={isEditMode ? handleDone : () => setIsEditMode(true)}
                className={`h-[50px] px-[24px] rounded-[var(--radius-button)] font-medium text-[15px] cursor-pointer active:scale-[0.98] transition-colors ${
                  isEditMode 
                    ? "bg-bg text-text border border-border" 
                    : "bg-bg text-primary border border-primary/30"
                }`}
              >
                {isEditMode ? "Done" : "Edit"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


// ── Edit Reward Rules Sheet ──
function EditRewardSheet({
  rewardPercent,
  maxRedeemPercent,
  onSave,
  onClose,
}: {
  rewardPercent: number;
  maxRedeemPercent: number;
  onSave: (rewardPercent: number, maxRedeemPercent: number) => void;
  onClose: () => void;
}) {
  const [rp, setRp] = useState(String(rewardPercent));
  const [mrp, setMrp] = useState(String(maxRedeemPercent));

  const rpNum = Number(rp);
  const mrpNum = Number(mrp);
  const isValid = rpNum > 0 && rpNum <= 100 && mrpNum > 0 && mrpNum <= 100;
  const hasChanges = rpNum !== rewardPercent || mrpNum !== maxRedeemPercent;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[768px] bg-card rounded-t-[var(--radius-sheet)] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] pb-[env(safe-area-inset-bottom,16px)] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-[12px] pb-[8px]">
          <div className="w-[36px] h-[4px] rounded-full bg-border" />
        </div>

        <div className="flex items-center justify-between px-[var(--spacing-md)] pb-[var(--spacing-md)]">
          <h2 className="text-[18px] font-semibold text-text">Edit Reward Rules</h2>
          <button
            onClick={onClose}
            className="w-[36px] h-[36px] rounded-full bg-bg flex items-center justify-center text-text-tertiary hover:text-text cursor-pointer transition-colors"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="border-t border-border/40" />

        <div className="px-[var(--spacing-md)] pt-[var(--spacing-md)] pb-[var(--spacing-sm)]">
          <div className="flex flex-col gap-[16px]">
            {/* Reward % */}
            <div>
              <label className="text-[13px] font-medium text-text-secondary mb-[6px] block">
                Reward Percentage
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={rp}
                  onChange={(e) => setRp(e.target.value)}
                  min="1"
                  max="100"
                  className="w-full h-[48px] px-[14px] pr-[40px] rounded-[var(--radius-input)] border border-border bg-bg text-[15px] font-medium text-text outline-none focus:border-primary transition-colors"
                />
                <span className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[14px] font-medium text-text-tertiary">%</span>
              </div>
              <p className="text-[12px] text-text-tertiary mt-[4px]">
                Customers earn this % of their bill as rewards
              </p>
            </div>

            {/* Max Redeem % */}
            <div>
              <label className="text-[13px] font-medium text-text-secondary mb-[6px] block">
                Max Redeem Percentage
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={mrp}
                  onChange={(e) => setMrp(e.target.value)}
                  min="1"
                  max="100"
                  className="w-full h-[48px] px-[14px] pr-[40px] rounded-[var(--radius-input)] border border-border bg-bg text-[15px] font-medium text-text outline-none focus:border-primary transition-colors"
                />
                <span className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[14px] font-medium text-text-tertiary">%</span>
              </div>
              <p className="text-[12px] text-text-tertiary mt-[4px]">
                Maximum % of earned rewards that can be redeemed per visit
              </p>
            </div>

            {/* Save */}
            <button
              onClick={() => onSave(rpNum, mrpNum)}
              disabled={!isValid || !hasChanges}
              className="w-full h-[50px] rounded-[var(--radius-button)] bg-primary text-white font-semibold text-[15px] cursor-pointer active:scale-[0.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed mt-[4px]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ── Edit Shop Name Sheet ──
function EditShopSheet({
  shopName,
  onSave,
  onClose,
}: {
  shopName: string;
  onSave: (name: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(shopName);

  const isValid = name.trim().length > 0;
  const hasChanges = name.trim() !== shopName;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[768px] bg-card rounded-t-[var(--radius-sheet)] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] pb-[env(safe-area-inset-bottom,16px)] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-[12px] pb-[8px]">
          <div className="w-[36px] h-[4px] rounded-full bg-border" />
        </div>

        <div className="flex items-center justify-between px-[var(--spacing-md)] pb-[var(--spacing-md)]">
          <h2 className="text-[18px] font-semibold text-text">Edit Shop Name</h2>
          <button
            onClick={onClose}
            className="w-[36px] h-[36px] rounded-full bg-bg flex items-center justify-center text-text-tertiary hover:text-text cursor-pointer transition-colors"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="border-t border-border/40" />

        <div className="px-[var(--spacing-md)] pt-[var(--spacing-md)] pb-[var(--spacing-sm)]">
          <div className="flex flex-col gap-[16px]">
            <div>
              <label className="text-[13px] font-medium text-text-secondary mb-[6px] block">
                Shop Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your shop name"
                className="w-full h-[48px] px-[14px] rounded-[var(--radius-input)] border border-border bg-bg text-[15px] font-medium text-text placeholder:text-text-tertiary outline-none focus:border-primary transition-colors"
                autoFocus
              />
            </div>

            <button
              onClick={() => onSave(name.trim())}
              disabled={!isValid || !hasChanges}
              className="w-full h-[50px] rounded-[var(--radius-button)] bg-primary text-white font-semibold text-[15px] cursor-pointer active:scale-[0.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ── OTP Verification Sheet ──
function OTPVerificationSheet({
  onVerify,
  onCancel,
}: {
  onVerify: (otp: string) => void;
  onCancel: () => void;
}) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);

  const handleVerify = () => {
    if (otp === "1234") {
      onVerify(otp);
    } else {
      setError(true);
      setOtp("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/40 flex items-end justify-center animate-fade-in"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[768px] bg-card rounded-t-[var(--radius-sheet)] shadow-[0_-4px_20px_rgba(0,0,0,0.1)] pb-[env(safe-area-inset-bottom,16px)] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-[12px] pb-[8px]">
          <div className="w-[36px] h-[4px] rounded-full bg-border" />
        </div>

        <div className="flex items-center justify-between px-[var(--spacing-md)] pb-[var(--spacing-md)]">
          <h2 className="text-[18px] font-semibold text-text">Security Check</h2>
          <button
            onClick={onCancel}
            className="w-[36px] h-[36px] rounded-full bg-bg flex items-center justify-center text-text-tertiary hover:text-text cursor-pointer transition-colors"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="border-t border-border/40" />

        <div className="px-[var(--spacing-md)] pt-[var(--spacing-md)] pb-[var(--spacing-sm)]">
          <div className="flex flex-col gap-[16px]">
            <div>
              <label className="text-[13px] font-medium text-text-secondary mb-[6px] block">
                Enter Admin OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 4));
                  setError(false);
                }}
                placeholder="****"
                className={`w-full h-[48px] px-[14px] rounded-[var(--radius-input)] border ${error ? "border-error focus:border-error" : "border-border focus:border-primary"
                  } bg-bg text-[18px] font-medium text-text tracking-[0.5em] text-center outline-none transition-colors`}
                autoFocus
                maxLength={4}
              />
              {error ? (
                <p className="text-[12px] text-error mt-[6px] text-center">Invalid OTP. Use 1234.</p>
              ) : (
                <p className="text-[12px] text-text-tertiary mt-[6px] text-center">Use 1234 for testing.</p>
              )}
            </div>

            <button
              onClick={handleVerify}
              disabled={otp.length !== 4}
              className="w-full h-[50px] rounded-[var(--radius-button)] bg-primary text-white font-semibold text-[15px] cursor-pointer active:scale-[0.98] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Verify & Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// ── Reusable Sub-Components ──

function SettingsRow({ icon, label, subtitle }: { icon: React.ReactNode; label: string; subtitle: string }) {
  return (
    <button
      type="button"
      className="w-full flex items-center gap-[var(--spacing-sm)] px-[var(--spacing-md)] py-[var(--spacing-sm)] min-h-[64px] cursor-pointer active:bg-surface transition-colors text-left"
    >
      <div className="w-[42px] h-[42px] rounded-[14px] bg-surface flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[15px] font-semibold text-text">{label}</span>
        <p className="text-[12px] text-text-secondary mt-[2px]">{subtitle}</p>
      </div>
      <ChevronRight />
    </button>
  );
}


// ── Icons ──

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-tertiary/50 flex-shrink-0">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
