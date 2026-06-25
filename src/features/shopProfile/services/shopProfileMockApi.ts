import { delay } from "@/shared/utils/delay";
import { vendorOnboardingMockApi } from "@/features/onboarding/services/vendorOnboardingMockApi";
import type {
  AccountSettings,
  CreateBranchPayload,
  NotificationSettings,
  SecuritySettings,
  ShopBranch,
  ShopProfile,
  UpdateBranchPayload,
} from "../types/shopProfile.types";

const STORAGE_KEY = "regal_vendor_shop_profile";

const defaultAccount: AccountSettings = {
  language: "fa",
  timezone: "Asia/Tehran",
  storeStatus: "active",
};

const defaultSecurity: SecuritySettings = {
  twoFactorEnabled: false,
  loginAlertsEnabled: true,
};

const defaultNotifications: NotificationSettings = {
  newOrders: true,
  lowStock: true,
  productStatus: true,
  weeklyReport: false,
};

const createBranchId = (): string =>
  `branch-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

/**
 * Builds an initial profile, prefilling vendor type, categories and brands
 * from the onboarding data saved in localStorage (if present).
 */
const buildDefaultProfile = (): ShopProfile => {
  const onboarding = vendorOnboardingMockApi.getStoredProfile();
  return {
    id: "shop-1",
    vendorType: onboarding?.vendorType ?? "brand_owner",
    name: onboarding?.brandName?.trim() || "فروشگاه من",
    description: "",
    phone: "",
    email: "",
    website: "",
    instagram: "",
    categories: onboarding?.categoryIds ?? [],
    soldBrands: onboarding?.soldBrandIds ?? [],
    branches: [],
    account: { ...defaultAccount },
    security: { ...defaultSecurity },
    notifications: { ...defaultNotifications },
  };
};

/**
 * Fills any missing fields on a stored profile so older persisted shapes stay
 * compatible after the data model grows. Keeps the mock close to a real API
 * that would always return a complete resource.
 */
const normalizeProfile = (raw: Partial<ShopProfile>): ShopProfile => {
  const base = buildDefaultProfile();
  return {
    ...base,
    ...raw,
    categories: raw.categories ?? base.categories,
    soldBrands: raw.soldBrands ?? base.soldBrands,
    branches: raw.branches ?? base.branches,
    account: { ...base.account, ...raw.account },
    security: { ...base.security, ...raw.security },
    notifications: { ...base.notifications, ...raw.notifications },
  };
};

const readProfile = (): ShopProfile => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return buildDefaultProfile();
  try {
    return normalizeProfile(JSON.parse(raw) as Partial<ShopProfile>);
  } catch {
    return buildDefaultProfile();
  }
};

const writeProfile = (profile: ShopProfile): ShopProfile => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  return profile;
};

export const shopProfileMockApi = {
  async getProfile(): Promise<ShopProfile> {
    await delay(500);
    return readProfile();
  },

  async saveProfile(profile: ShopProfile): Promise<ShopProfile> {
    await delay(700);
    return writeProfile(normalizeProfile(profile));
  },

  async createBranch(payload: CreateBranchPayload): Promise<ShopProfile> {
    await delay(600);
    const profile = readProfile();
    const branch: ShopBranch = { ...payload, id: createBranchId() };
    return writeProfile({ ...profile, branches: [...profile.branches, branch] });
  },

  async updateBranch(payload: UpdateBranchPayload): Promise<ShopProfile> {
    await delay(600);
    const profile = readProfile();
    const { id, ...values } = payload;
    return writeProfile({
      ...profile,
      branches: profile.branches.map((branch) =>
        branch.id === id ? { ...branch, ...values } : branch,
      ),
    });
  },

  async deleteBranch(branchId: string): Promise<ShopProfile> {
    await delay(500);
    const profile = readProfile();
    return writeProfile({
      ...profile,
      branches: profile.branches.filter((branch) => branch.id !== branchId),
    });
  },
};
