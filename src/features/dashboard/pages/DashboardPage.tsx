import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
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
import { useDashboardAnalytics } from "../hooks/useDashboardAnalytics";
import type { ChartPoint, DashboardMetric } from "../types/dashboard.types";
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

const BarChart: FC<{ title: string; data: ChartPoint[]; format?: "number" | "price" }> = ({
  title,
  data,
  format = "number",
}) => {
  const max = Math.max(...data.map((point) => point.value), 1);

  return (
    <Card padding="lg" className={styles.chartCard}>
      <div className={styles.sectionHead}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <Icon name="trending-up" size={18} />
      </div>
      <div className={styles.chart}>
        {data.map((point) => (
          <div key={point.label} className={styles.barItem}>
            <span className={styles.barValue}>
              {format === "price" ? formatPrice(point.value) : formatNumber(point.value)}
            </span>
            <span
              className={styles.bar}
              style={{ blockSize: `${Math.max(12, (point.value / max) * 100)}%` }}
            />
            <span className={styles.barLabel}>{point.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

const HorizontalBars: FC<{ title: string; data: ChartPoint[] }> = ({ title, data }) => {
  const max = Math.max(...data.map((point) => point.value), 1);

  return (
    <Card padding="lg" className={styles.section}>
      <div className={styles.sectionHead}>
        <h3 className={styles.sectionTitle}>{title}</h3>
        <Icon name="analytics" size={18} />
      </div>
      <div className={styles.horizontalBars}>
        {data.map((point) => (
          <div key={point.label} className={styles.horizontalRow}>
            <div className={styles.horizontalMeta}>
              <span>{point.label}</span>
              <strong>{formatNumber(point.value)}</strong>
            </div>
            <div className={styles.horizontalTrack}>
              <span style={{ inlineSize: `${(point.value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
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
            <BarChart title="روند بازدید ۷ روز اخیر" data={data.visitTrend} />
            <BarChart title="روند فروش mock" data={data.revenueTrend} format="price" />
          </div>

          <div className={styles.sections}>
            <HorizontalBars title="کانال‌های بازدید" data={data.channelViews} />

            <Card padding="lg" className={styles.section}>
              <div className={styles.sectionHead}>
                <h3 className={styles.sectionTitle}>وضعیت سفارش‌ها</h3>
                <Icon name="orders" size={18} />
              </div>
              <div className={styles.statusGrid}>
                {data.orderStatusSummary.map((item) => (
                  <div key={item.status} className={styles.statusCard}>
                    <span>{item.status}</span>
                    <strong>{formatNumber(item.count)}</strong>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className={styles.sections}>
            <Card padding="lg" className={styles.section}>
              <div className={styles.sectionHead}>
                <h3 className={styles.sectionTitle}>محصولات پربازدید</h3>
                <Icon name="eye" size={18} />
              </div>
              <ul className={styles.list}>
                {data.mostViewedProducts.map((product, index) => (
                  <li key={product.id} className={styles.listRow}>
                    <span className={styles.rank}>{formatNumber(index + 1)}</span>
                    <div className={styles.rowInfo}>
                      <span className={styles.rowTitle}>{product.title}</span>
                      <span className={styles.rowMeta}>
                        {formatNumber(product.views ?? 0)} بازدید، {formatNumber(product.soldCount ?? 0)} فروش
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card padding="lg" className={styles.section}>
              <div className={styles.sectionHead}>
                <h3 className={styles.sectionTitle}>محصولات پرفروش</h3>
                <Icon name="trending-up" size={18} />
              </div>
              <ul className={styles.list}>
                {data.bestSellingProducts.map((product, index) => (
                  <li key={product.id} className={styles.listRow}>
                    <span className={styles.rank}>{formatNumber(index + 1)}</span>
                    <div className={styles.rowInfo}>
                      <span className={styles.rowTitle}>{product.title}</span>
                      <span className={styles.rowMeta}>
                        {formatNumber(product.soldCount ?? 0)} فروش، {formatPrice(product.revenue ?? 0)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

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
