import styles from "./styles.module.css";
import { useNavigate } from "react-router";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: "chevron" | "slash" | "arrow";
  size?: "small" | "medium" | "large";
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = "chevron",
  size = "small",
}) => {
  const navigate = useNavigate();

  const getSeparatorIcon = () => {
    switch (separator) {
      case "slash":
        return "/";
      case "arrow":
        return "→";
      case "chevron":
      default:
        return "›";
    }
  };

  const handleBreadRoute = (href: string | undefined) => {
    if (href) navigate(href);
  };

  return (
    <nav className={`${styles.breadcrumb} ${styles[size]}`}>
      <ol className={styles.breadcrumb__list}>
        {items.map((item, index) => (
          <li key={index} className={styles.breadcrumb__item}>
            {item.href && !item.isActive ? (
              <span
                className={styles.breadcrumb__link}
                onClick={() => handleBreadRoute(item?.href)}
              >
                {item.label}
              </span>
            ) : (
              <span
                className={`${styles.breadcrumb__text} ${
                  item.isActive ? styles.active : ""
                }`}
              >
                {item.label}
              </span>
            )}

            {index < items.length - 1 && (
              <span className={styles.breadcrumb__separator} aria-hidden="true">
                {getSeparatorIcon()}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
