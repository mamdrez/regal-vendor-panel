import type { VendorType } from "@/shared/types/vendor";

export type { VendorType };

export interface ShopBranch {
  id: string;
  name: string;
  city: string;
  province: string;
  address: string;
  phone: string;
  workingHours: string;
  location?: string;
  isActive: boolean;
}

export interface ShopProfile {
  id: string;
  vendorType: VendorType;
  name: string;
  logo?: string;
  coverImage?: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  instagram?: string;
  /** Category ids (see shared catalog). */
  categories: string[];
  /** Brand ids the seller resells (see shared catalog). */
  soldBrands: string[];
  branches: ShopBranch[];
}

/** Values for the branch add/edit form. */
export type BranchFormValues = Omit<ShopBranch, "id">;
