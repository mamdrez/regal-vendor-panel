import type { VendorType } from "@/shared/types/vendor";

export type { VendorType };

/** A selectable product category. */
export interface CategoryOption {
  id: string;
  label: string;
}

/** A selectable brand (for sellers). */
export interface BrandOption {
  id: string;
  name: string;
}

/** Values collected across the onboarding steps. */
export interface VendorOnboardingFormValues {
  vendorType: VendorType | null;
  categoryIds: string[];
  /** Brands the seller resells. */
  soldBrandIds: string[];
  /** Brand name entered by a brand owner. */
  brandName: string;
}

/** The mock vendor profile persisted after onboarding. */
export interface VendorProfile {
  vendorType: VendorType;
  categoryIds: string[];
  soldBrandIds: string[];
  brandName: string;
  completedAt: string;
}
