import type { FC } from "react";
import { Icon } from "@/shared/ui";
import styles from "./CatalogThumb.module.css";

interface CatalogThumbProps {
  images: string[];
  alt: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Renders the first catalog image, or a clean placeholder tile when no
 * image is available (the mock catalog ships without real images).
 */
const CatalogThumb: FC<CatalogThumbProps> = ({ images, alt, size = "md" }) => {
  const src = images[0];
  return (
    <div className={`${styles.thumb} ${styles[size]}`}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <Icon name="image" size={size === "sm" ? 20 : 26} />
      )}
    </div>
  );
};

export default CatalogThumb;
