export interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  change?: number;
  description?: string;
  format?: "number" | "price" | "percent";
}

export interface ChartPoint {
  label: string;
  value: number;
}

/** Daily engagement trend with multiple soft-area series. */
export interface EngagementPoint {
  label: string;
  productViews: number;
  profileViews: number;
  linkClicks: number;
}

/** Combined visits + revenue point for the composed performance chart. */
export interface PerformancePoint {
  label: string;
  visits: number;
  revenue: number;
}

/** Revenue/orders comparison per product category. */
export interface CategoryPerformanceItem {
  category: string;
  revenue: number;
  orders: number;
}

/** Compact KPI value (0–100) rendered as a radial progress ring. */
export interface ConversionStat {
  id: string;
  label: string;
  value: number;
}

export interface ProductPerformanceItem {
  id: string;
  title: string;
  views?: number;
  soldCount?: number;
  revenue?: number;
  stock?: number;
}

export interface OrderStatusSummary {
  status: string;
  count: number;
}

export interface RecentOrder {
  id: string;
  customerName: string;
  amount: number;
  status: string;
}

export interface OperationalInsight {
  id: string;
  title: string;
  description: string;
  tone: "success" | "warning" | "danger" | "primary";
}

export interface DashboardAnalytics {
  totalVisits: number;
  todayVisits: number;
  profileViews: number;
  productViews: number;
  shopLinkClicks: number;
  totalSales: number;
  totalOrders: number;
  activeProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  conversionRate: number;
  averageOrderValue: number;
  overviewMetrics: DashboardMetric[];
  visitTrend: ChartPoint[];
  revenueTrend: ChartPoint[];
  engagementTrend: EngagementPoint[];
  performanceTrend: PerformancePoint[];
  averageOrderTrend: ChartPoint[];
  categoryPerformance: CategoryPerformanceItem[];
  conversionStats: ConversionStat[];
  channelViews: ChartPoint[];
  orderStatusSummary: OrderStatusSummary[];
  recentOrders: RecentOrder[];
  mostViewedProducts: ProductPerformanceItem[];
  bestSellingProducts: ProductPerformanceItem[];
  lowStockItems: ProductPerformanceItem[];
  outOfStockItems: ProductPerformanceItem[];
  insights: OperationalInsight[];
}
