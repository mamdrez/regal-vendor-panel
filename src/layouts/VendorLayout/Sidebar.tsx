import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { Icon, Logo } from "@/shared/ui";
import { paths } from "@/routers/paths";
import { navItems } from "./navItems";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  /** Whether the mobile drawer is open. */
  isOpen: boolean;
  /** Called when a nav item is chosen (to close the mobile drawer). */
  onNavigate: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onNavigate }) => (
  <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
    <div className={styles.brand}>
      <Logo size={34} />
      <span className={styles.brandName}>رگال</span>
    </div>

    <nav className={styles.nav}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === paths.dashboard}
          onClick={onNavigate}
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <span className={styles.navIcon}>
            <Icon name={item.icon} size={19} />
          </span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>

    <div className={styles.footer}>
      <span className={styles.footerText}>پنل فروشندگان رگال</span>
      <span className={styles.version}>نسخه ۱.۰</span>
    </div>
  </aside>
);

export default Sidebar;
