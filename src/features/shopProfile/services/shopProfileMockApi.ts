import { delay } from "@/shared/utils/delay";
import { vendorOnboardingMockApi } from "@/features/onboarding/services/vendorOnboardingMockApi";
import type { ShopProfile } from "../types/shopProfile.types";

const STORAGE_KEY = "regal_vendor_shop_profile";

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
  };
};

export const shopProfileMockApi = {
  async getProfile(): Promise<ShopProfile> {
    await delay(500);
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return buildDefaultProfile();
    }
    try {
      return JSON.parse(raw) as ShopProfile;
    } catch {
      return buildDefaultProfile();
    }
  },

  async saveProfile(profile: ShopProfile): Promise<ShopProfile> {
    await delay(700);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    return profile;
  },
};
