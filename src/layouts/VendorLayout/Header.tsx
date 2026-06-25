import { useNavigate } from "react-router-dom";
import type { FC } from "react";
import { Icon } from "@/shared/ui";
import { paths } from "@/routers/paths";
import { useAuth } from "@/features/auth/hooks/useAuth";
import styles from "./Header.module.css";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const getInitial = (name: string | undefined): string =>
  name?.trim().charAt(0) || "ر";

const Header: FC<HeaderProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(paths.login, { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.right}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={onToggleSidebar}
          aria-label="باز کردن منو"
        >
          <Icon name="menu" size={22} />
        </button>
        <div className={styles.search}>
          <Icon name="search" size={18} />
          <input
            type="search"
            className={styles.searchInput}
            placeholder="جستجو در پنل..."
            aria-label="جستجو"
          />
        </div>
      </div>

      <div className={styles.left}>
        <button
          type="button"
          className={styles.iconButton}
          aria-label="اعلان‌ها"
        >
          <Icon name="bell" size={20} />
          <span className={styles.dot} />
        </button>

        <span className={styles.divider} />

        <div className={styles.profile}>
          <span className={styles.avatar}>{getInitial(user?.fullName)}</span>
          <div className={styles.profileInfo}>
            <span className={styles.profileName}>
              {user?.fullName ?? "فروشنده رگال"}
            </span>
            <span className={styles.profileRole}>فروشنده</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.iconButton}
          onClick={handleLogout}
          aria-label="خروج"
          title="خروج از حساب"
        >
          <Icon name="logout" size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
