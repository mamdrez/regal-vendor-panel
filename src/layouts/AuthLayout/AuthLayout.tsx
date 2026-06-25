import type { FC } from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "@/shared/ui";
import styles from "./AuthLayout.module.css";

const AuthLayout: FC = () => (
  <div className={styles.layout}>
    <aside className={styles.cover}>
      <div className={styles.coverTop}>
        <Logo size={38} />
        <span className={styles.brandName}>رگال</span>
      </div>

      <div className={styles.coverBottom}>
        <span className={styles.eyebrow}>پنل فروشندگان</span>
        <h2 className={styles.coverTitle}>
          فروشگاه خود را حرفه‌ای مدیریت کنید
        </h2>
        <p className={styles.coverText}>
          بستری مدرن و یکپارچه برای مدیریت محصولات، سفارش‌ها و رشد برند شما در
          دنیای مد.
        </p>
      </div>

      <div className={styles.watermark} aria-hidden="true">
        <Logo size={320} color="var(--brand-cream)" accent="var(--brand-cream)" />
      </div>
    </aside>

    <main className={styles.content}>
      <div className={styles.formArea}>
        <Outlet />
      </div>
    </main>
  </div>
);

export default AuthLayout;
