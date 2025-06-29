import { atom } from "jotai";
import type {
  User,
  Trade,
  Alert,
  WebhookConfig,
  TelegramConfig,
  Profile,
  PaymentConfig,
} from "../types";
import { MutableRefObject } from "react";
import { AddOns } from "@/components/getfunded/GetFunded";

// Auth
export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));
export const signupEmailAtom = atom<string>("");
export const passwordAtom = atom<string>("");

// Trading
export const activeTradesAtom = atom<Trade[]>([]);
export const featureSectionAtom = atom<MutableRefObject<HTMLDivElement | null>>(
  {
    current: null,
  }
);
export const tradingBalanceAtom = atom(0);
export const tradingStatsAtom = atom({
  winRate: 0,
  totalTrades: 0,
  profitFactor: 0,
  averageWin: 0,
  averageLoss: 0,
});

//Oxapay
export const oxapayCurrencyAtom = atom<string | null>("BTC");
export const oxapayNetworkAtom = atom<string | null>(null);

// Alerts & Notifications
export const alertsAtom = atom<Alert[]>([]);
export const unreadAlertsAtom = atom(
  (get) => get(alertsAtom).filter((alert) => !alert.read).length
);

// Webhooks
export const webhooksAtom = atom<WebhookConfig[]>([]);
export const activeWebhooksAtom = atom((get) =>
  get(webhooksAtom).filter((webhook) => webhook.isActive)
);

//Navbar height atom
export const navbarHeightAtom = atom<number>(0);

// Telegram Configuration
export const telegramConfigAtom = atom<TelegramConfig>({
  enabled: false,
  notifications: {
    trades: true,
    signals: true,
    alerts: true,
    performance: false,
    risk: true,
  },
});

// UI State
export const sidebarCollapsedAtom = atom(false);
export const activeViewAtom = atom("dashboard");

export const themeAtom = atom<"light" | "dark">(localStorage.getItem("theme") === "dark" ? "dark":"light");

//SideMenu
export const collapsedAtom = atom<boolean>(false);

//Profile

export const profileAtom = atom<Profile | null>(null);

//Account

export const accountNameAtom = atom<string>("");

//Signup Email for verification


//trade filter

export const selectedAccountAtom = atom<string>("");
export const selectedAccountTypeAtom = atom<string>("MetaTrader");

// trade account balance

export const balanceAtom = atom<number>(0);

// trade platform

export const platformAtom = atom<string>("");

// trade fee

export const feeAtom = atom<number>(0);

// trade challenge

export const challengeAtom = atom<string>("");

// add-ons
export const addOnsAtom = atom<AddOns>({
  profitSplit100: false,
  fastPayout: false,
});

// payment data

export const paymentAtom = atom<PaymentConfig>({
  QRCode: "",
  address: "",
  trackId: "",
  amount: "",
  currency: "",
  payAmount: "",
  payCurrency: "",
  network: "",
  orderId: "",
});
