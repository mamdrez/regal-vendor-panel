import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  ChartCard,
  EmptyState,
  Icon,
  LoadingState,
  PageHeader,
  type IconName,
} from "@/shared/ui";
import { paths } from "@/routers/paths";
import { formatNumber, formatPrice } from "@/shared/utils/format";
import { useAuth } from "@/features/auth/hooks/useAuth";
import StatCard, { type StatTone } from "../components/StatCard";
import {
  AverageOrderValueChart,
  CategoryPerformanceBarChart,
  ConversionRadialChart,
  EngagementAreaChart,
  OrderStatusPieChart,
  ProductBarChart,
  RevenueAreaChart,
  VendorPerformanceComposedChart,
  VisitsLineChart,
} from "../components/charts";
import { chartColors } from "../components/charts/chartTheme";
import { useDashboardAnalytics } from "../hooks/useDashboardAnalytics";
import type { DashboardMetric } from "../types/dashboard.types";
import styles from "./DashboardPage.module.css";

const metricIcons: Record<string, IconName> = {
  totalVisits: "eye",
  todayVisits: "calendar",
  totalSales: "wallet",
  totalOrders: "orders",
  activeProducts: "check",
  lowStockProducts: "alert-triangle",
  conversionRate: "trending-up",
  averageOrderValue: "percent",
};

const metricTone = (metric: DashboardMetric): StatTone => {
  if (metric.id === "lowStockProducts") return "warning";
  if (metric.id === "totalSales" || metric.id === "conversionRate") return "success";
  if (metric.id === "todayVisits" || metric.id === "totalOrders") return "primary";
  return "info";
};

const formatMetricValue = (metric: DashboardMetric): string => {
  if (metric.format === "price") return formatPrice(metric.value);
  if (metric.format === "percent") return `${metric.value.toLocaleString("fa-IR")}٪`;
  return formatNumber(metric.value);
};

const DashboardPage: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useDashboardAnalytics();

  return (
    <div className={styles.page}>
      <PageHeader
        title="داشبورد"
        description="نمای تحلیلی فروشگاه، بازدیدها، سفارش‌ها و محصولاتی که نیاز به توجه دارند."
        actions={
          <Button
            leadingIcon={<Icon name="plus" size={18} />}
            onClick={() => navigate(paths.productNew)}
          >
            افزودن محصول
          </Button>
        }
      />

      {isLoading && (
        <LoadingState fullHeight label="در حال بارگذاری تحلیل فروشگاه..." />
      )}

      {isError && (
        <EmptyState
          title="خطا در دریافت آمار"
          description="داده‌های داشبورد بارگذاری نشد. دوباره تلاش کنید."
          action={
            <Button variant="outline" onClick={() => refetch()}>
              تلاش مجدد
            </Button>
          }
        />
      )}

      {data && (
        <>
          <Card padding="lg" className={styles.hero}>
            <div className={styles.heroText}>
              <span className={styles.heroEyebrow}>مرکز تحلیل فروشنده</span>
              <h2 className={styles.heroTitle}>
                {user?.fullName
                  ? `${user.fullName} عزیز، عملکرد فروشگاه آماده بررسی است`
                  : "عملکرد فروشگاه آماده بررسی است"}
              </h2>
              <p className={styles.heroDescription}>
                امروز {formatNumber(data.todayVisits)} بازدید ثبت شده و نرخ تبدیل mock
                فروشگاه {data.conversionRate.toLocaleString("fa-IR")}٪ است.
              </p>
            </div>
            <div className={styles.heroStats}>
              <div>
                <span>بازدید پروفایل</span>
                <strong>{formatNumber(data.profileViews)}</strong>
              </div>
              <div>
                <span>کلیک لینک فروشگاه</span>
                <strong>{formatNumber(data.shopLinkClicks)}</strong>
              </div>
            </div>
          </Card>

          <div className={styles.statsGrid}>
            {data.overviewMetrics.map((metric) => (
              <StatCard
                key={metric.id}
                icon={metricIcons[metric.id] ?? "dashboard"}
                label={metric.label}
                value={formatMetricValue(metric)}
                tone={metricTone(metric)}
                hint={
                  typeof metric.change === "number"
                    ? `${metric.change.toLocaleString("fa-IR")}٪ نسبت به هفته قبل`
                    : metric.description
                }
              />
            ))}
          </div>

          <div className={styles.chartGrid}>
            <ChartCard
              title="روند بازدید روزانه"
              description="بازدید فروشگاه در ۷ روز اخیر"
              icon="eye"
              insight="بازدیدها در نیمه دوم هفته رشد محسوسی داشته است."
            >
              <VisitsLineChart data={data.visitTrend} />
            </ChartCard>

            <ChartCard
              title="روند فروش"
              description="درآمد روزانه فروشگاه (mock)"
              icon="wallet"
              insight="بیشترین فروش در روز پنجشنبه ثبت شده است."
            >
              <RevenueAreaChart data={data.revenueTrend} />
            </ChartCard>
          </div>

          <ChartCard
            title="بازدید و فروش"
            description="مقایسهٔ بازدید روزانه با درآمد فروشگاه"
            icon="analytics"
            size="lg"
            insight="رشد بازدید با افزایش فروش همسو بوده است."
          >
            <VendorPerformanceComposedChart data={data.performanceTrend} />
          </ChartCard>

          <div className={styles.chartGrid}>
            <ChartCard
              title="روند تعامل با فروشگاه"
              description="بازدید محصولات، بازدید پروفایل و کلیک روی لینک فروشگاه"
              icon="trending-up"
              insight="بازدید محصولات نسبت به هفته گذشته رشد داشته است."
            >
              <EngagementAreaChart data={data.engagementTrend} />
            </ChartCard>

            <ChartCard
              title="سهم سفارش‌ها بر اساس وضعیت"
              description="توزیع سفارش‌ها در مراحل مختلف پردازش"
              icon="orders"
              insight="بیشتر سفارش‌ها در مرحلهٔ ارسال شده قرار دارند."
            >
              <OrderStatusPieChart data={data.orderStatusSummary} />
            </ChartCard>
          </div>

          <div className={styles.chartGrid}>
            <ChartCard
              title="پرفروش‌ترین محصولات"
              description="پنج محصول برتر بر اساس تعداد فروش"
              icon="trending-up"
            >
              <ProductBarChart
                data={data.bestSellingProducts}
                metric="soldCount"
                color={chartColors.purple}
                valueFormatter={(value) => `${formatNumber(value)} فروش`}
              />
            </ChartCard>

            <ChartCard
              title="پربازدیدترین محصولات"
              description="پنج محصول برتر بر اساس بازدید"
              icon="eye"
            >
              <ProductBarChart
                data={data.mostViewedProducts}
                metric="views"
                color={chartColors.blue}
                valueFormatter={(value) => `${formatNumber(value)} بازدید`}
              />
            </ChartCard>
          </div>

          <div className={styles.chartGrid}>
            <ChartCard
              title="عملکرد دسته‌بندی‌ها"
              description="مقایسهٔ درآمد بر اساس دسته‌بندی محصولات"
              icon="dashboard"
              insight="دسته‌بندی برتر بیشترین سهم درآمد را به خود اختصاص داده است."
            >
              <CategoryPerformanceBarChart data={data.categoryPerformance} />
            </ChartCard>

            <ChartCard
              title="شاخص‌های کلیدی"
              description="نرخ تبدیل، تکمیل پروفایل و درصد محصولات فعال"
              icon="percent"
              insight="تکمیل پروفایل فروشگاه به بهبود اعتماد خریداران کمک می‌کند."
            >
              <ConversionRadialChart data={data.conversionStats} />
            </ChartCard>
          </div>

          <ChartCard
            title="میانگین ارزش سفارش"
            description="روند میانگین ارزش هر سفارش در هفته‌های اخیر (mock)"
            icon="wallet"
            size="sm"
            insight="میانگین ارزش سفارش روندی صعودی داشته است."
          >
            <AverageOrderValueChart data={data.averageOrderTrend} />
          </ChartCard>

          <div className={styles.sections}>
            <Card padding="lg" className={styles.section}>
              <div className={styles.sectionHead}>
                <h3 className={styles.sectionTitle}>محصولات نیازمند توجه</h3>
                <Icon name="alert-triangle" size={18} />
              </div>
              <ul className={styles.list}>
                {[...data.lowStockItems, ...data.outOfStockItems].slice(0, 5).map((product) => (
                  <li key={product.id} className={styles.listRow}>
                    <div className={styles.rowInfo}>
                      <span className={styles.rowTitle}>{product.title}</span>
                      <span className={styles.rowMeta}>
                        موجودی: {formatNumber(product.stock ?? 0)}
                      </span>
                    </div>
                    <Badge tone={(product.stock ?? 0) === 0 ? "danger" : "warning"}>
                      {(product.stock ?? 0) === 0 ? "ناموجود" : "کم‌موجودی"}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Card>

            <Card padding="lg" className={styles.section}>
              <div className={styles.sectionHead}>
                <h3 className={styles.sectionTitle}>اقدام‌های پیشنهادی</h3>
                <Icon name="check" size={18} />
              </div>
              <div className={styles.insights}>
                {data.insights.map((insight) => (
                  <div key={insight.id} className={styles.insight}>
                    <Badge tone={insight.tone}>{insight.title}</Badge>
                    <p>{insight.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card padding="lg" className={styles.section}>
            <div className={styles.sectionHead}>
              <h3 className={styles.sectionTitle}>سفارش‌های اخیر</h3>
              <Icon name="calendar" size={18} />
            </div>
            <div className={styles.ordersTable}>
              {data.recentOrders.map((order) => (
                <div key={order.id} className={styles.orderRow}>
                  <strong>{order.id}</strong>
                  <span>{order.customerName}</span>
                  <span>{formatPrice(order.amount)}</span>
                  <Badge tone="primary">{order.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
