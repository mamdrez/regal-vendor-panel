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
  channelViews: ChartPoint[];
  orderStatusSummary: OrderStatusSummary[];
  recentOrders: RecentOrder[];
  mostViewedProducts: ProductPerformanceItem[];
  bestSellingProducts: ProductPerformanceItem[];
  lowStockItems: ProductPerformanceItem[];
  outOfStockItems: ProductPerformanceItem[];
  insights: OperationalInsight[];
}
