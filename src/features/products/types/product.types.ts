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
  /** Optional per-variant price override set by the seller. */
  priceOverride?: number;
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
  /** Source catalog item this vendor product was created from (catalog flow). */
  catalogItemId?: string;
  /** Brand id from the Regal catalog (catalog flow). */
  brandId?: string;
  /** Whether the source was a catalog or journal item. */
  source?: CatalogItemSource;
  /** Optional seller note shown on the product. */
  sellerNote?: string;
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
  sellerNote?: string;
  catalogItemId?: string;
  brandId?: string;
  source?: CatalogItemSource;
}

export interface ProductFilters {
  search: string;
  status: ProductStatus | "all";
  category: string | "all";
}

/* ------------------------------------------------------------------ */
/* Regal global catalog (brands + catalog/journal products)           */
/* ------------------------------------------------------------------ */

/** Where a catalog item originates inside Regal. */
export type CatalogItemSource = "catalog" | "journal";

/** A brand in the Regal catalog the vendor can sell products from. */
export interface Brand {
  id: string;
  name: string;
  /** Optional logo image; when empty the UI renders the brand initials. */
  logo: string;
  categoryName: string;
  description: string;
  /** Number of catalog items available for this brand (for display). */
  itemCount: number;
}

/**
 * A global Regal catalog product. This is the shared brand product the
 * vendor selects from — NOT the vendor's own (sellable) product yet.
 */
export interface BrandCatalogItem {
  id: string;
  brandId: string;
  brandName: string;
  title: string;
  categoryName: string;
  images: string[];
  description?: string;
  availableColors: string[];
  availableSizes: string[];
  source: CatalogItemSource;
}

/** Query params for browsing a brand's catalog. */
export interface CatalogQuery {
  brandId: string;
  search: string;
  category: string | "all";
}

/**
 * Seller-specific selling configuration applied on top of a catalog item.
 * This is the only data the vendor edits — the catalog identity stays
 * read-only.
 */
export interface SellingSetupValues {
  price: number;
  discountPrice?: number;
  status: ProductStatus;
  variants: ProductVariant[];
  sellerNote?: string;
}

/** Payload to add a catalog product to the vendor's shop. */
export interface AddVendorProductPayload {
  catalogItem: BrandCatalogItem;
  selling: SellingSetupValues;
}
