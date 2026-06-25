import { delay } from "@/shared/utils/delay";
import { getTotalStock } from "@/features/products/constants/productMeta";
import { productsMockApi } from "@/features/products/services/productsMockApi";
import type { Product } from "@/features/products/types/product.types";
import type {
  ChartPoint,
  DashboardAnalytics,
  DashboardMetric,
  OperationalInsight,
  ProductPerformanceItem,
} from "../types/dashboard.types";

const LOW_STOCK_THRESHOLD = 5;

const effectivePrice = (product: Product): number =>
  product.discountPrice ?? product.price;

const visitTrend: ChartPoint[] = [
  { label: "شنبه", value: 420 },
  { label: "یکشنبه", value: 510 },
  { label: "دوشنبه", value: 480 },
  { label: "سه‌شنبه", value: 620 },
  { label: "چهارشنبه", value: 710 },
  { label: "پنجشنبه", value: 760 },
  { label: "جمعه", value: 690 },
];

const revenueTrend: ChartPoint[] = [
  { label: "شنبه", value: 18_600_000 },
  { label: "یکشنبه", value: 21_400_000 },
  { label: "دوشنبه", value: 19_800_000 },
  { label: "سه‌شنبه", value: 26_200_000 },
  { label: "چهارشنبه", value: 31_500_000 },
  { label: "پنجشنبه", value: 35_100_000 },
  { label: "جمعه", value: 29_700_000 },
];

const createProductViews = (product: Product, index: number): number =>
  product.soldCount * 8 + 240 - index * 18;

const mapBestSelling = (products: Product[]): ProductPerformanceItem[] =>
  [...products]
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 5)
    .filter((product) => product.soldCount > 0)
    .map((product) => ({
      id: product.id,
      title: product.title,
      soldCount: product.soldCount,
      revenue: product.soldCount * effectivePrice(product),
    }));

const mapMostViewed = (products: Product[]): ProductPerformanceItem[] =>
  [...products]
    .map((product, index) => ({
      id: product.id,
      title: product.title,
      views: createProductViews(product, index),
      soldCount: product.soldCount,
    }))
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, 5);

const getLowStock = (products: Product[]): ProductPerformanceItem[] =>
  products
    .map((product) => ({
      id: product.id,
      title: product.title,
      stock: getTotalStock(product),
    }))
    .filter((product) => (product.stock ?? 0) > 0 && (product.stock ?? 0) < LOW_STOCK_THRESHOLD);

const getOutOfStock = (products: Product[]): ProductPerformanceItem[] =>
  products
    .map((product) => ({
      id: product.id,
      title: product.title,
      stock: getTotalStock(product),
    }))
    .filter((product) => product.stock === 0);

const createInsights = (
  lowStockCount: number,
  outOfStockCount: number,
  conversionRate: number,
): OperationalInsight[] => [
  {
    id: "low-stock",
    title: "موجودی نیازمند توجه",
    description:
      lowStockCount > 0
        ? `${lowStockCount.toLocaleString("fa-IR")} محصول به شارژ موجودی نزدیک شده است.`
        : "موجودی محصولات در وضعیت مناسبی قرار دارد.",
    tone: lowStockCount > 0 ? "warning" : "success",
  },
  {
    id: "conversion",
    title: "نرخ تبدیل mock",
    description: `نرخ تبدیل فعلی ${conversionRate.toLocaleString("fa-IR")}% است؛ محصولات پربازدید را برای فروش بهتر بررسی کنید.`,
    tone: conversionRate >= 3 ? "success" : "primary",
  },
  {
    id: "out-of-stock",
    title: "محصولات ناموجود",
    description:
      outOfStockCount > 0
        ? `${outOfStockCount.toLocaleString("fa-IR")} محصول ناموجود در لیست دیده می‌شود.`
        : "محصول ناموجود مهمی در حال حاضر ثبت نشده است.",
    tone: outOfStockCount > 0 ? "danger" : "success",
  },
];

export const dashboardMockApi = {
  async getAnalytics(): Promise<DashboardAnalytics> {
    await delay(600);
    const products = await productsMockApi.listAll();

    const activeProducts = products.filter((product) => product.status === "active").length;
    const lowStockItems = getLowStock(products);
    const outOfStockItems = getOutOfStock(products);
    const totalSales = products.reduce(
      (sum, product) => sum + product.soldCount * effectivePrice(product),
      0,
    );
    const totalOrders = Math.max(
      1,
      Math.round(products.reduce((sum, product) => sum + product.soldCount, 0) * 0.6),
    );
    const totalVisits = visitTrend.reduce((sum, point) => sum + point.value, 0);
    const productViews = Math.round(totalVisits * 0.68);
    const profileViews = Math.round(totalVisits * 0.24);
    const shopLinkClicks = Math.round(totalVisits * 0.08);
    const conversionRate = Number(((totalOrders / totalVisits) * 100).toFixed(1));
    const averageOrderValue = Math.round(totalSales / totalOrders);

    const overviewMetrics: DashboardMetric[] = [
      { id: "totalVisits", label: "بازدید کل", value: totalVisits, change: 12, format: "number" },
      { id: "todayVisits", label: "بازدید امروز", value: visitTrend.at(-1)?.value ?? 0, change: 6, format: "number" },
      { id: "totalSales", label: "فروش کل", value: totalSales, change: 9, format: "price" },
      { id: "totalOrders", label: "تعداد سفارش‌ها", value: totalOrders, change: 5, format: "number" },
      { id: "activeProducts", label: "محصولات فعال", value: activeProducts, format: "number" },
      { id: "lowStockProducts", label: "محصولات کم‌موجودی", value: lowStockItems.length, format: "number" },
      { id: "conversionRate", label: "نرخ تبدیل mock", value: conversionRate, change: 1.4, format: "percent" },
      { id: "averageOrderValue", label: "میانگین ارزش سفارش", value: averageOrderValue, format: "price" },
    ];

    return {
      totalVisits,
      todayVisits: visitTrend.at(-1)?.value ?? 0,
      profileViews,
      productViews,
      shopLinkClicks,
      totalSales,
      totalOrders,
      activeProducts,
      lowStockProducts: lowStockItems.length,
      outOfStockProducts: outOfStockItems.length,
      conversionRate,
      averageOrderValue,
      overviewMetrics,
      visitTrend,
      revenueTrend,
      channelViews: [
        { label: "بازدید محصولات", value: productViews },
        { label: "بازدید پروفایل", value: profileViews },
        { label: "کلیک لینک فروشگاه", value: shopLinkClicks },
      ],
      orderStatusSummary: [
        { status: "در انتظار بررسی", count: 9 },
        { status: "در حال آماده‌سازی", count: 14 },
        { status: "ارسال شده", count: 26 },
        { status: "تکمیل شده", count: Math.max(12, totalOrders - 49) },
      ],
      recentOrders: [
        { id: "ord-1024", customerName: "مریم احمدی", amount: 4_280_000, status: "در حال آماده‌سازی" },
        { id: "ord-1023", customerName: "علی رضایی", amount: 2_650_000, status: "ارسال شده" },
        { id: "ord-1022", customerName: "سارا کریمی", amount: 6_100_000, status: "در انتظار بررسی" },
      ],
      mostViewedProducts: mapMostViewed(products),
      bestSellingProducts: mapBestSelling(products),
      lowStockItems,
      outOfStockItems,
      insights: createInsights(lowStockItems.length, outOfStockItems.length, conversionRate),
    };
  },
};
