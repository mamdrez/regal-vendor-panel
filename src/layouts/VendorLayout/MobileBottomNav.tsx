import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@/shared/ui";
import { paths } from "@/routers/paths";
import { mobileNavItems } from "./navItems";
import styles from "./MobileBottomNav.module.css";

const MobileBottomNav: FC = () => (
  <nav className={styles.nav} aria-label="ناوبری اصلی موبایل">
    {mobileNavItems.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.path === paths.dashboard}
        className={({ isActive }) =>
          `${styles.item} ${isActive ? styles.active : ""}`
        }
      >
        <Icon name={item.icon} size={20} />
        <span>{item.label}</span>
      </NavLink>
    ))}
  </nav>
);

export default MobileBottomNav;
