import { getBrandName, getCategoryLabel } from "@/shared/constants/catalog";
import type {
  BranchFormValues,
  ProfileSectionId,
  ShopBranch,
  ShopProfile,
} from "../types/shopProfile.types";
import {
  getStoreStatusLabel,
  getVendorTypeLabel,
} from "./shopProfileLabels";

export const emptyBranchValues: BranchFormValues = {
  name: "",
  city: "",
  province: "",
  address: "",
  phone: "",
  workingHours: "",
  location: "",
  isActive: true,
};

export const toBranchValues = (branch: ShopBranch): BranchFormValues => ({
  name: branch.name,
  city: branch.city,
  province: branch.province,
  address: branch.address,
  phone: branch.phone,
  workingHours: branch.workingHours,
  location: branch.location,
  isActive: branch.isActive,
});

export const getCategoryLabels = (profile: ShopProfile): string[] =>
  profile.categories.map(getCategoryLabel);

export const getSoldBrandLabels = (profile: ShopProfile): string[] =>
  profile.soldBrands.map(getBrandName);

export const getActiveBranches = (profile: ShopProfile): ShopBranch[] =>
  profile.branches.filter((branch) => branch.isActive);

/** Combines province + city into a single readable location line. */
export const getBranchLocation = (branch: ShopBranch): string =>
  [branch.province, branch.city].filter(Boolean).join("، ");

/**
 * Rough profile completeness, used by the hero progress indicator to nudge the
 * vendor toward a richer public profile.
 */
export const calculateCompletion = (profile: ShopProfile): number => {
  const checks: boolean[] = [
    Boolean(profile.name),
    Boolean(profile.logo),
    Boolean(profile.coverImage),
    Boolean(profile.description),
    Boolean(profile.phone),
    Boolean(profile.email),
    Boolean(profile.website),
    Boolean(profile.instagram),
    profile.categories.length > 0,
    profile.vendorType === "brand_owner" || profile.soldBrands.length > 0,
    profile.branches.length > 0,
  ];

  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
};

export const toPersianNumber = (value: number): string =>
  value.toLocaleString("fa-IR");

/** Short status/summary shown on the right of each section menu row. */
export const getSectionSummary = (
  profile: ShopProfile,
  sectionId: ProfileSectionId,
): string | undefined => {
  switch (sectionId) {
    case "store":
      return getVendorTypeLabel(profile.vendorType);
    case "branches":
      return `${toPersianNumber(getActiveBranches(profile).length)} شعبه فعال`;
    case "contact":
      return profile.phone || profile.email ? "تکمیل شده" : "نیازمند تکمیل";
    case "social":
      return profile.instagram ? "متصل" : "ثبت نشده";
    case "brands":
      return `${toPersianNumber(profile.categories.length)} دسته‌بندی`;
    case "account":
      return getStoreStatusLabel(profile.account.storeStatus);
    case "security":
      return profile.security.twoFactorEnabled ? "ورود دومرحله‌ای" : undefined;
    case "notifications":
      return undefined;
    default:
      return undefined;
  }
};
