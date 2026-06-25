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

export type PanelLanguage = "fa" | "en";
export type StoreStatus = "active" | "vacation";

export interface AccountSettings {
  language: PanelLanguage;
  timezone: string;
  storeStatus: StoreStatus;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginAlertsEnabled: boolean;
}

export interface NotificationSettings {
  newOrders: boolean;
  lowStock: boolean;
  productStatus: boolean;
  weeklyReport: boolean;
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
  account: AccountSettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
}

/** Values for the branch add/edit form. */
export type BranchFormValues = Omit<ShopBranch, "id">;

/** Payload for creating a branch. */
export type CreateBranchPayload = BranchFormValues;

/** Payload for updating an existing branch. */
export interface UpdateBranchPayload extends BranchFormValues {
  id: string;
}

/**
 * The editable sections shown in the profile menu. Each maps to a preview
 * view and (where applicable) an edit form rendered inside the edit panel.
 */
export type ProfileSectionId =
  | "store"
  | "branches"
  | "contact"
  | "social"
  | "brands"
  | "account"
  | "security"
  | "notifications";
