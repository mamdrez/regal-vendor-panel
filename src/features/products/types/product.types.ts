export type ProductStatus =
  | "draft"
  | "active"
  | "inactive"
  | "out_of_stock"
  | "pending_review";

export interface ProductVariant {
  id: string;
  color: string;
  size: string;
  sku: string;
  stock: number;
}

export interface Product {
  id: string;
  title: string;
  brandName: string;
  categoryName: string;
  description: string;
  images: string[];
  price: number;
  discountPrice?: number;
  status: ProductStatus;
  variants: ProductVariant[];
  /** Mock sold count, used for dashboard best-seller stats. */
  soldCount: number;
  createdAt: string;
  updatedAt: string;
}

/** Values submitted from the product form (no server-managed fields). */
export interface ProductFormValues {
  title: string;
  brandName: string;
  categoryName: string;
  description: string;
  images: string[];
  price: number;
  discountPrice?: number;
  status: ProductStatus;
  variants: ProductVariant[];
}

export interface ProductFilters {
  search: string;
  status: ProductStatus | "all";
  category: string | "all";
}
