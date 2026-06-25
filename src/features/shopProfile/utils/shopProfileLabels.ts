import type { EditTarget } from "../hooks/useProfileEditPanel";
import type {
  PanelLanguage,
  StoreStatus,
  VendorType,
} from "../types/shopProfile.types";

export const getVendorTypeLabel = (vendorType: VendorType): string =>
  vendorType === "brand_owner" ? "صاحب برند" : "فروشنده چندبرندی";

export const getStoreStatusLabel = (status: StoreStatus): string =>
  status === "active" ? "فعال" : "تعطیلی موقت";

export const getLanguageLabel = (language: PanelLanguage): string =>
  language === "fa" ? "فارسی" : "انگلیسی";

export const getBooleanLabel = (value: boolean): string =>
  value ? "فعال" : "غیرفعال";

/** Persian fallback shown for any empty/optional profile field. */
export const EMPTY_VALUE_LABEL = "ثبت نشده";

const SECTION_PANEL_TITLES: Record<Exclude<EditTarget, "branch" | null>, string> =
  {
    store: "ویرایش اطلاعات فروشگاه",
    contact: "ویرایش اطلاعات تماس",
    social: "ویرایش شبکه‌های اجتماعی",
    brands: "ویرایش برندها و دسته‌بندی‌ها",
    account: "ویرایش تنظیمات حساب",
    security: "مدیریت امنیت",
    notifications: "ویرایش اعلان‌ها",
  };

/** Title shown in the edit panel header for the active edit target. */
export const getEditPanelTitle = (
  target: EditTarget,
  isEditingBranch: boolean,
): string => {
  if (target === null) return "";
  if (target === "branch") return isEditingBranch ? "ویرایش شعبه" : "افزودن شعبه";
  return SECTION_PANEL_TITLES[target];
};
