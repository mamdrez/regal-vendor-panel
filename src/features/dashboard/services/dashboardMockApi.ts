import { delay } from "@/shared/utils/delay";
import { productsMockApi } from "@/features/products/services/productsMockApi";
import { getTotalStock } from "@/features/products/constants/productMeta";
import type { Product } from "@/features/products/types/product.types";
import type { DashboardStats } from "../types/dashboard.types";

const LOW_STOCK_THRESHOLD = 5;

const effectivePrice = (product: Product): number =>
  product.discountPrice ?? product.price;

/**
 * Derives dashboard stats from the products mock data, plus a couple of mock
 * sales/orders figures. No real analytics in this phase.
 */
export const dashboardMockApi = {
  async getStats(): Promise<DashboardStats> {
    await delay(600);
    const products = await productsMockApi.listAll();

    const totalProducts = products.length;
    const activeProducts = products.filter((p) => p.status === "active").length;
    const draftProducts = products.filter((p) => p.status === "draft").length;

    const outOfStockProducts = products.filter(
      (p) => p.status === "out_of_stock" || getTotalStock(p) === 0,
    ).length;

    const lowStock = products.filter((p) => {
      const stock = getTotalStock(p);
      return stock > 0 && stock < LOW_STOCK_THRESHOLD;
    });

    const totalSales = products.reduce(
      (sum, p) => sum + p.soldCount * effectivePrice(p),
      0,
    );
    const totalOrders = Math.round(
      products.reduce((sum, p) => sum + p.soldCount, 0) * 0.6,
    );

    const bestSellingProducts = [...products]
      .sort((a, b) => b.soldCount - a.soldCount)
      .slice(0, 4)
      .filter((p) => p.soldCount > 0)
      .map((p) => ({
        id: p.id,
        title: p.title,
        soldCount: p.soldCount,
        revenue: p.soldCount * effectivePrice(p),
      }));

    return {
      totalProducts,
      activeProducts,
      outOfStockProducts,
      draftProducts,
      totalSales,
      totalOrders,
      lowStockProducts: lowStock.length,
      bestSellingProducts,
      lowStockItems: lowStock.map((p) => ({
        id: p.id,
        title: p.title,
        stock: getTotalStock(p),
      })),
    };
  },
};
