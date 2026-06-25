import { delay } from "@/shared/utils/delay";
import { BRANDS, CATEGORIES } from "@/shared/constants/catalog";
import type {
  BrandOption,
  CategoryOption,
  VendorOnboardingFormValues,
  VendorProfile,
} from "../types/onboarding.types";

const PROFILE_KEY = "regal_vendor_profile";

/**
 * Mock onboarding service. Mirrors a real API service (async getters + a save
 * mutation) and persists the resulting profile to localStorage for Phase 1.
 */
export const vendorOnboardingMockApi = {
  async getCategories(): Promise<CategoryOption[]> {
    await delay(400);
    return CATEGORIES;
  },

  async getBrands(): Promise<BrandOption[]> {
    await delay(400);
    return BRANDS;
  },

  async saveProfile(
    values: VendorOnboardingFormValues,
  ): Promise<VendorProfile> {
    await delay(900);

    if (!values.vendorType) {
      throw new Error("نوع فروشنده را انتخاب کنید.");
    }

    const profile: VendorProfile = {
      vendorType: values.vendorType,
      categoryIds: values.categoryIds,
      soldBrandIds:
        values.vendorType === "seller" ? values.soldBrandIds : [],
      brandName:
        values.vendorType === "brand_owner" ? values.brandName.trim() : "",
      completedAt: new Date().toISOString(),
    };

    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    return profile;
  },

  getStoredProfile(): VendorProfile | null {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as VendorProfile;
    } catch {
      return null;
    }
  },
};
