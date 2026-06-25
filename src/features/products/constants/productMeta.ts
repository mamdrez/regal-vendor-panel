import type { BadgeTone } from "@/shared/ui";
import type { Product, ProductStatus } from "../types/product.types";

export const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  draft: "پیش‌نویس",
  active: "فعال",
  inactive: "غیرفعال",
  out_of_stock: "ناموجود",
  pending_review: "در انتظار بررسی",
};

export const PRODUCT_STATUS_TONES: Record<ProductStatus, BadgeTone> = {
  draft: "neutral",
  active: "success",
  inactive: "warning",
  out_of_stock: "danger",
  pending_review: "primary",
};

export const PRODUCT_STATUS_ORDER: ProductStatus[] = [
  "active",
  "draft",
  "pending_review",
  "inactive",
  "out_of_stock",
];

/** Sum of stock across all variants. */
export const getTotalStock = (product: Product): number =>
  product.variants.reduce((total, variant) => total + variant.stock, 0);
