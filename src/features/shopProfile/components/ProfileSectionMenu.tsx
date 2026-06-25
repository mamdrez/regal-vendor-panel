import { useEffect, useState, type FC } from "react";
import { Icon } from "@/shared/ui";
import type { ProfileSectionConfig } from "../constants/profileSections";
import type { ProfileSectionId } from "../types/shopProfile.types";
import styles from "./ProfileSectionMenu.module.css";

export interface ProfileSectionMenuItem extends ProfileSectionConfig {
  /** Optional short status/summary shown on the right of the row. */
  summary?: string;
}

interface ProfileSectionMenuProps {
  items: ProfileSectionMenuItem[];
  activeId: ProfileSectionId;
  /** Desktop: switch the visible section content. */
  onChange: (id: ProfileSectionId) => void;
  /** Mobile: open the section preview as a bottom sheet. */
  onMobileSelect: (id: ProfileSectionId) => void;
}

const useIsMobileMenu = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const sync = () => setIsMobile(mediaQuery.matches);

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return isMobile;
};

/**
 * Vertical, icon-led section menu used on both desktop (side list that drives
 * the visible content) and mobile (tappable rows that open a bottom sheet).
 */
const ProfileSectionMenu: FC<ProfileSectionMenuProps> = ({
  items,
  activeId,
  onChange,
  onMobileSelect,
}) => {
  const isMobile = useIsMobileMenu();

  const handleSelect = (id: ProfileSectionId) => {
    if (isMobile) {
      onMobileSelect(id);
      return;
    }
    onChange(id);
  };

  return (
    <nav className={styles.menu} aria-label="بخش‌های پروفایل">
      {items.map((item) => {
        const isActive = !isMobile && activeId === item.id;
        return (
          <button
            key={item.id}
            type="button"
            className={`${styles.item} ${isActive ? styles.active : ""}`}
            aria-current={isActive ? "true" : undefined}
            onClick={() => handleSelect(item.id)}
          >
            <span className={styles.itemIcon}>
              <Icon name={item.icon} size={18} />
            </span>
            <span className={styles.itemText}>
              <span className={styles.itemLabel}>{item.label}</span>
              <span className={styles.itemDescription}>{item.description}</span>
            </span>
            {item.summary && (
              <span className={styles.itemSummary}>{item.summary}</span>
            )}
            <span className={styles.itemChevron}>
              <Icon name="chevron-left" size={18} />
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default ProfileSectionMenu;
