import { useEffect, useState, type FC } from "react";
import { Icon, type IconName } from "@/shared/ui";
import styles from "./ProfileSectionNav.module.css";

export type ProfileSectionId =
  | "shop"
  | "branches"
  | "contact"
  | "social"
  | "brands"
  | "account"
  | "security"
  | "notifications";

export interface ProfileSectionItem {
  id: ProfileSectionId;
  label: string;
  description: string;
  icon: IconName;
  summary?: string;
}

interface ProfileSectionNavProps {
  items: ProfileSectionItem[];
  activeId: ProfileSectionId;
  onChange: (id: ProfileSectionId) => void;
  onMobileSelect: (id: ProfileSectionId) => void;
}

const useIsMobileProfileNav = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 720px)");
    const sync = () => setIsMobile(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return isMobile;
};

const ProfileSectionNav: FC<ProfileSectionNavProps> = ({
  items,
  activeId,
  onChange,
  onMobileSelect,
}) => {
  const isMobile = useIsMobileProfileNav();

  const handleSelect = (id: ProfileSectionId) => {
    if (isMobile) {
      onMobileSelect(id);
      return;
    }
    onChange(id);
  };

  return (
    <nav className={styles.nav} aria-label="بخش‌های پروفایل">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`${styles.item} ${activeId === item.id ? styles.active : ""}`}
          onClick={() => handleSelect(item.id)}
        >
          <span className={styles.icon}>
            <Icon name={item.icon} size={17} />
          </span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default ProfileSectionNav;
