import { useQuery } from "@tanstack/react-query";
import { productsMockApi } from "../services/productsMockApi";
import type { ProductFilters } from "../types/product.types";

export const productKeys = {
  all: ["products"] as const,
  list: (filters: ProductFilters) => ["products", "list", filters] as const,
  detail: (id: string) => ["products", "detail", id] as const,
};

export const useProducts = (filters: ProductFilters) =>
  useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productsMockApi.list(filters),
  });

export const useProduct = (id: string | undefined) =>
  useQuery({
    queryKey: productKeys.detail(id ?? "new"),
    queryFn: () => productsMockApi.getById(id as string),
    enabled: Boolean(id),
  });
