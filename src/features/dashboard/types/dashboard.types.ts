export interface BestSellingProduct {
  id: string;
  title: string;
  soldCount: number;
  revenue: number;
}

export interface LowStockItem {
  id: string;
  title: string;
  stock: number;
}

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  outOfStockProducts: number;
  draftProducts: number;
  totalSales: number;
  totalOrders: number;
  lowStockProducts: number;
  bestSellingProducts: BestSellingProduct[];
  /** Detailed low-stock items for the dashboard section. */
  lowStockItems: LowStockItem[];
}
