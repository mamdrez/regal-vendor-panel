import { useQuery } from "@tanstack/react-query";
import { brandCatalogMockApi } from "../services/brandCatalogMockApi";
import type { CatalogQuery } from "../types/product.types";

export const catalogKeys = {
  all: ["brand-catalog"] as const,
  brands: (search: string) => ["brand-catalog", "brands", search] as const,
  items: (query: CatalogQuery) => ["brand-catalog", "items", query] as const,
};

/** Brands available in the Regal catalog, optionally filtered by search. */
export const useBrands = (search: string) =>
  useQuery({
    queryKey: catalogKeys.brands(search),
    queryFn: () => brandCatalogMockApi.getBrands(search),
  });

/** Catalog products for a selected brand. */
export const useBrandCatalogItems = (query: CatalogQuery | null) =>
  useQuery({
    queryKey: catalogKeys.items(
      query ?? { brandId: "", search: "", category: "all" },
    ),
    queryFn: () => brandCatalogMockApi.getCatalogItems(query as CatalogQuery),
    enabled: Boolean(query?.brandId),
  });
