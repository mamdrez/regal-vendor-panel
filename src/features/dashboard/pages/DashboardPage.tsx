import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Icon,
  LoadingState,
  Logo,
  PageHeader,
} from "@/shared/ui";
import { paths } from "@/routers/paths";
import { formatNumber, formatPrice } from "@/shared/utils/format";
import { useAuth } from "@/features/auth/hooks/useAuth";
import StatCard from "../components/StatCard";
import { useDashboardStats } from "../hooks/useDashboardStats";
import styles from "./DashboardPage.module.css";

const DashboardPage: FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: stats, isLoading, isError, refetch } = useDashboardStats();

  return (
    <div className={styles.page}>
      <PageHeader
        title="داشبورد"
        description="نمای کلی فعالیت فروشگاه شما در رگال."
        actions={
          <Button
            leadingIcon={<Icon name="plus" size={18} />}
            onClick={() => navigate(paths.productNew)}
          >
            افزودن محصول
          </Button>
        }
      />

      <Card padding="lg" className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.heroEyebrow}>پنل فروشندگان رگال</span>
          <h2 className={styles.heroTitle}>
            {user?.fullName ? `${user.fullName} عزیز، خوش آمدید` : "خوش آمدید"}
          </h2>
          <p className={styles.heroDescription}>
            وضعیت فروشگاه خود را در یک نگاه ببینید و محصولاتتان را مدیریت کنید.
          </p>
        </div>
        <div className={styles.heroMark}>
          <Logo size={84} />
        </div>
      </Card>

      {isLoading && (
        <LoadingState fullHeight label="در حال بارگذاری آمار..." />
      )}

      {isError && (
        <EmptyState
          title="خطا در دریافت آمار"
          description="آمار داشبورد بارگذاری نشد. دوباره تلاش کنید."
          action={
            <Button variant="outline" onClick={() => refetch()}>
              تلاش مجدد
            </Button>
          }
        />
      )}

      {stats && (
        <>
          <div className={styles.statsGrid}>
            <StatCard
              icon="products"
              label="کل محصولات"
              value={formatNumber(stats.totalProducts)}
              tone="primary"
            />
            <StatCard
              icon="check"
              label="محصولات فعال"
              value={formatNumber(stats.activeProducts)}
              tone="success"
            />
            <StatCard
              icon="alert-triangle"
              label="ناموجود"
              value={formatNumber(stats.outOfStockProducts)}
              tone="danger"
            />
            <StatCard
              icon="edit"
              label="پیش‌نویس"
              value={formatNumber(stats.draftProducts)}
              tone="info"
            />
            <StatCard
              icon="wallet"
              label="فروش کل (مجازی)"
              value={formatPrice(stats.totalSales)}
              tone="success"
            />
            <StatCard
              icon="orders"
              label="سفارش‌ها (مجازی)"
              value={formatNumber(stats.totalOrders)}
              tone="primary"
            />
            <StatCard
              icon="inventory"
              label="موجودی کم"
              value={formatNumber(stats.lowStockProducts)}
              tone="warning"
            />
            <StatCard
              icon="trending-up"
              label="پرفروش‌ها"
              value={formatNumber(stats.bestSellingProducts.length)}
              tone="info"
            />
          </div>

          <div className={styles.sections}>
            <Card padding="lg" className={styles.section}>
              <div className={styles.sectionHead}>
                <h3 className={styles.sectionTitle}>محصولات پرفروش</h3>
                <Icon name="trending-up" size={18} />
              </div>
              {stats.bestSellingProducts.length === 0 ? (
                <p className={styles.muted}>هنوز فروشی ثبت نشده است.</p>
              ) : (
                <ul className={styles.list}>
                  {stats.bestSellingProducts.map((product, index) => (
                    <li key={product.id} className={styles.listRow}>
                      <span className={styles.rank}>{formatNumber(index + 1)}</span>
                      <div className={styles.rowInfo}>
                        <span className={styles.rowTitle}>{product.title}</span>
                        <span className={styles.rowMeta}>
                          {formatNumber(product.soldCount)} فروش •{" "}
                          {formatPrice(product.revenue)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card padding="lg" className={styles.section}>
              <div className={styles.sectionHead}>
                <h3 className={styles.sectionTitle}>موجودی رو به اتمام</h3>
                <Icon name="alert-triangle" size={18} />
              </div>
              {stats.lowStockItems.length === 0 ? (
                <p className={styles.muted}>
                  موجودی همه محصولات در وضعیت مناسبی است.
                </p>
              ) : (
                <ul className={styles.list}>
                  {stats.lowStockItems.map((item) => (
                    <li key={item.id} className={styles.listRow}>
                      <div className={styles.rowInfo}>
                        <span className={styles.rowTitle}>{item.title}</span>
                      </div>
                      <Badge tone="warning">
                        {formatNumber(item.stock)} عدد باقی‌مانده
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
