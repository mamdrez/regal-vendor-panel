/** Shared product catalog options used by onboarding, products, and profile. */

export interface CatalogCategory {
  id: string;
  label: string;
}

export interface CatalogBrand {
  id: string;
  name: string;
}

export const CATEGORIES: CatalogCategory[] = [
  { id: "women-clothing", label: "لباس زنانه" },
  { id: "men-clothing", label: "لباس مردانه" },
  { id: "bags", label: "کیف" },
  { id: "shoes", label: "کفش" },
  { id: "accessories", label: "اکسسوری" },
  { id: "jewelry", label: "زیورآلات" },
  { id: "perfume-beauty", label: "عطر و زیبایی" },
  { id: "sport", label: "ورزشی" },
];

export const BRANDS: CatalogBrand[] = [
  { id: "zara", name: "Zara" },
  { id: "nike", name: "Nike" },
  { id: "adidas", name: "Adidas" },
  { id: "mango", name: "Mango" },
  { id: "hm", name: "H&M" },
  { id: "dior", name: "Dior" },
  { id: "gucci", name: "Gucci" },
  { id: "prada", name: "Prada" },
  { id: "balenciaga", name: "Balenciaga" },
];

export const getCategoryLabel = (id: string): string =>
  CATEGORIES.find((category) => category.id === id)?.label ?? id;

export const getBrandName = (id: string): string =>
  BRANDS.find((brand) => brand.id === id)?.name ?? id;
