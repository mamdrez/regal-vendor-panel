import type { IconName } from "@/shared/ui";
import { paths } from "@/routers/paths";

export interface NavItem {
  label: string;
  path: string;
  icon: IconName;
}

/** Primary sidebar navigation for the vendor panel. */
export const navItems: NavItem[] = [
  { label: "داشبورد", path: paths.dashboard, icon: "dashboard" },
  { label: "محصولات", path: paths.products, icon: "products" },
  { label: "سفارش‌ها", path: paths.orders, icon: "orders" },
  { label: "موجودی", path: paths.inventory, icon: "inventory" },
  { label: "کالکشن‌ها", path: paths.collections, icon: "collections" },
  { label: "تخفیف‌ها", path: paths.discounts, icon: "discounts" },
  { label: "پروفایل فروشگاه", path: paths.shopProfile, icon: "shop" },
  { label: "آنالیتیکس", path: paths.analytics, icon: "analytics" },
  { label: "اعلان‌ها", path: paths.notifications, icon: "bell" },
  { label: "تنظیمات", path: paths.settings, icon: "settings" },
];
