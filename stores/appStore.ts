import { create } from "zustand";

// ── Types ──

export interface Customer {
  id: string;
  phone: string;
  name: string;
  rewardBalance: number;
  totalVisits: number;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface Transaction {
  id: string;
  customerPhone: string;
  customerName: string;
  services: string[];
  bill: number;
  rewardUsed: number;
  paid: number;
  rewardEarned: number;
  method: "Cash" | "Online";
  createdAt: string;
}

export interface ShopConfig {
  shopName: string;
  rewardPercent: number;
  maxRedeemPercent: number;
}

interface AppState {
  // ── Auth ──
  isLoggedIn: boolean;
  isSetupComplete: boolean;
  ownerPhone: string;

  // ── Shop Config ──
  shopConfig: ShopConfig;

  // ── Data ──
  services: Service[];
  customers: Customer[];
  transactions: Transaction[];

  // ── Actions ──
  login: (phone: string) => void;
  logout: () => void;
  completeSetup: (config: ShopConfig, services: Service[]) => void;

  addCustomer: (customer: Customer) => void;
  findCustomerByPhone: (phone: string) => Customer | undefined;

  addTransaction: (txn: Transaction) => void;
  updateCustomerReward: (phone: string, earned: number, used: number) => void;

  addService: (service: Service) => void;
  removeService: (id: string) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  updateAllServices: (services: Service[]) => void;
  updateShopConfig: (config: Partial<ShopConfig>) => void;
}

// ── Mock Data ──

const MOCK_SERVICES: Service[] = [
  { id: "svc-haircut", name: "Haircut", price: 150 },
  { id: "svc-beard", name: "Beard Trim", price: 80 },
  { id: "svc-facial", name: "Facial", price: 400 },
  { id: "svc-shave", name: "Clean Shave", price: 60 },
  { id: "svc-hair-color", name: "Hair Color", price: 800 },
  { id: "svc-head-massage", name: "Head Massage", price: 120 },
];

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "cust-1",
    phone: "9876543210",
    name: "Rahul Sharma",
    rewardBalance: 245,
    totalVisits: 14,
    createdAt: "2025-11-10T10:00:00Z",
  },
  {
    id: "cust-2",
    phone: "9876543211",
    name: "Vikram Patel",
    rewardBalance: 120,
    totalVisits: 8,
    createdAt: "2025-12-05T11:30:00Z",
  },
  {
    id: "cust-3",
    phone: "9876543212",
    name: "Priya Mehta",
    rewardBalance: 380,
    totalVisits: 22,
    createdAt: "2025-10-15T09:00:00Z",
  },
  {
    id: "cust-4",
    phone: "9876543213",
    name: "Amit Kumar",
    rewardBalance: 60,
    totalVisits: 3,
    createdAt: "2026-04-20T14:00:00Z",
  },
  {
    id: "cust-5",
    phone: "9876543214",
    name: "Deepak Reddy",
    rewardBalance: 190,
    totalVisits: 11,
    createdAt: "2026-01-08T16:00:00Z",
  },
];

const today = new Date().toISOString().split("T")[0];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "txn-001",
    customerPhone: "9876543210",
    customerName: "Rahul Sharma",
    services: ["Haircut", "Beard Trim"],
    bill: 230,
    rewardUsed: 46,
    paid: 184,
    rewardEarned: 18,
    method: "Online",
    createdAt: `${today}T09:15:00Z`,
  },
  {
    id: "txn-002",
    customerPhone: "9876543211",
    customerName: "Vikram Patel",
    services: ["Haircut"],
    bill: 150,
    rewardUsed: 0,
    paid: 150,
    rewardEarned: 15,
    method: "Cash",
    createdAt: `${today}T09:42:00Z`,
  },
  {
    id: "txn-003",
    customerPhone: "9876543212",
    customerName: "Priya Mehta",
    services: ["Facial", "Head Massage"],
    bill: 520,
    rewardUsed: 80,
    paid: 440,
    rewardEarned: 44,
    method: "Online",
    createdAt: `${today}T10:05:00Z`,
  },
  {
    id: "txn-004",
    customerPhone: "9876543213",
    customerName: "Amit Kumar",
    services: ["Clean Shave"],
    bill: 60,
    rewardUsed: 0,
    paid: 60,
    rewardEarned: 6,
    method: "Cash",
    createdAt: `${today}T10:30:00Z`,
  },
  {
    id: "txn-005",
    customerPhone: "9876543210",
    customerName: "Rahul Sharma",
    services: ["Hair Color"],
    bill: 800,
    rewardUsed: 100,
    paid: 700,
    rewardEarned: 70,
    method: "Online",
    createdAt: `${today}T11:00:00Z`,
  },
  {
    id: "txn-006",
    customerPhone: "9876543214",
    customerName: "Deepak Reddy",
    services: ["Haircut", "Facial"],
    bill: 550,
    rewardUsed: 50,
    paid: 500,
    rewardEarned: 50,
    method: "Cash",
    createdAt: `${today}T11:25:00Z`,
  },
  {
    id: "txn-007",
    customerPhone: "9876543211",
    customerName: "Vikram Patel",
    services: ["Beard Trim", "Head Massage"],
    bill: 200,
    rewardUsed: 0,
    paid: 200,
    rewardEarned: 20,
    method: "Online",
    createdAt: `${today}T11:50:00Z`,
  },
  {
    id: "txn-008",
    customerPhone: "9876543212",
    customerName: "Priya Mehta",
    services: ["Haircut"],
    bill: 150,
    rewardUsed: 30,
    paid: 120,
    rewardEarned: 12,
    method: "Cash",
    createdAt: `${today}T12:10:00Z`,
  },
  {
    id: "txn-009",
    customerPhone: "9876543213",
    customerName: "Amit Kumar",
    services: ["Haircut", "Beard Trim"],
    bill: 230,
    rewardUsed: 0,
    paid: 230,
    rewardEarned: 23,
    method: "Online",
    createdAt: `${today}T13:00:00Z`,
  },
  {
    id: "txn-010",
    customerPhone: "9876543214",
    customerName: "Deepak Reddy",
    services: ["Clean Shave", "Head Massage"],
    bill: 180,
    rewardUsed: 36,
    paid: 144,
    rewardEarned: 14,
    method: "Cash",
    createdAt: `${today}T13:30:00Z`,
  },
  {
    id: "txn-011",
    customerPhone: "9876543210",
    customerName: "Rahul Sharma",
    services: ["Facial"],
    bill: 400,
    rewardUsed: 0,
    paid: 400,
    rewardEarned: 40,
    method: "Online",
    createdAt: `${today}T14:15:00Z`,
  },
  {
    id: "txn-012",
    customerPhone: "9876543212",
    customerName: "Priya Mehta",
    services: ["Hair Color", "Head Massage"],
    bill: 920,
    rewardUsed: 100,
    paid: 820,
    rewardEarned: 82,
    method: "Online",
    createdAt: `${today}T14:45:00Z`,
  },
];

// ── Store ──

export const useAppStore = create<AppState>((set, get) => ({
  // Auth — start unauthenticated so login → OTP → setup flow runs correctly
  isLoggedIn: false,
  isSetupComplete: false,
  ownerPhone: "",

  // Shop Config — empty until setup is completed
  shopConfig: {
    shopName: "",
    rewardPercent: 10,
    maxRedeemPercent: 20,
  },

  // Data — empty until populated after setup
  services: [],
  customers: [],
  transactions: [],

  // Actions
  login: (phone: string) =>
    set({ isLoggedIn: true, ownerPhone: phone }),

  logout: () =>
    set({ isLoggedIn: false, ownerPhone: "" }),

  completeSetup: (config: ShopConfig, services: Service[]) =>
    set({
      isSetupComplete: true,
      shopConfig: config,
      services,
    }),

  addCustomer: (customer: Customer) =>
    set((state) => ({
      customers: [...state.customers, customer],
    })),

  findCustomerByPhone: (phone: string) => {
    return get().customers.find((c) => c.phone === phone);
  },

  addTransaction: (txn: Transaction) =>
    set((state) => ({
      transactions: [txn, ...state.transactions],
    })),

  updateCustomerReward: (phone: string, earned: number, used: number) =>
    set((state) => ({
      customers: state.customers.map((c) =>
        c.phone === phone
          ? {
            ...c,
            rewardBalance: c.rewardBalance + earned - used,
            totalVisits: c.totalVisits + 1,
          }
          : c
      ),
    })),

  addService: (service: Service) =>
    set((state) => ({
      services: [...state.services, service],
    })),

  removeService: (id: string) =>
    set((state) => ({
      services: state.services.filter((s) => s.id !== id),
    })),

  updateService: (id: string, updates: Partial<Service>) =>
    set((state) => ({
      services: state.services.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),

  updateAllServices: (services: Service[]) =>
    set(() => ({
      services,
    })),

  updateShopConfig: (config: Partial<ShopConfig>) =>
    set((state) => ({
      shopConfig: { ...state.shopConfig, ...config },
    })),
}));
