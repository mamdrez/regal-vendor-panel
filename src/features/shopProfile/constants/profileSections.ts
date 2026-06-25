import type { IconName } from "@/shared/ui";
import type { ProfileSectionId } from "../types/shopProfile.types";

export interface ProfileSectionConfig {
  id: ProfileSectionId;
  label: string;
  description: string;
  icon: IconName;
}

/** Static definition of the profile section menu (order + copy + icons). */
export const PROFILE_SECTIONS: ProfileSectionConfig[] = [
  {
    id: "store",
    label: "اطلاعات فروشگاه",
    description: "نام، لوگو، تصویر کاور و توضیحات برند",
    icon: "store",
  },
  {
    id: "branches",
    label: "شعبات",
    description: "آدرس، شهر، ساعت کاری و وضعیت شعب",
    icon: "map-pin",
  },
  {
    id: "contact",
    label: "اطلاعات تماس",
    description: "شماره تماس، ایمیل و وب‌سایت فروشگاه",
    icon: "phone",
  },
  {
    id: "social",
    label: "شبکه‌های اجتماعی",
    description: "اینستاگرام و لینک‌های ارتباطی برند",
    icon: "instagram",
  },
  {
    id: "brands",
    label: "برندها و دسته‌بندی‌ها",
    description: "حوزه فعالیت و برندهای قابل فروش",
    icon: "tag",
  },
  {
    id: "account",
    label: "تنظیمات حساب",
    description: "وضعیت حساب، زبان پنل و اطلاعات پایه",
    icon: "user",
  },
  {
    id: "security",
    label: "امنیت",
    description: "رمز عبور، نشست‌ها و وضعیت امنیت حساب",
    icon: "settings",
  },
  {
    id: "notifications",
    label: "اعلان‌ها",
    description: "اعلان سفارش‌ها و هشدارهای موجودی",
    icon: "bell",
  },
];
