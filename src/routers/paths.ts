/** Centralised route paths so links and route definitions never drift. */
export const paths = {
  login: "/login",
  signup: "/signup",
  onboarding: "/onboarding",
  dashboard: "/",
  products: "/products",
  /** Guided, catalog-based add product flow. */
  productNew: "/products/new",
  /** Secondary manual product creation (product not in the catalog). */
  productNewManual: "/products/new/manual",
  /** Route pattern used in route definitions. */
  productEditPattern: "/products/:productId/edit",
  /** Builds an edit link for a specific product. */
  productEdit: (productId: string): string =>
    `/products/${productId}/edit`,
  orders: "/orders",
  inventory: "/inventory",
  collections: "/collections",
  discounts: "/discounts",
  shopProfile: "/shop-profile",
  analytics: "/analytics",
  notifications: "/notifications",
  settings: "/settings",
} as const;
