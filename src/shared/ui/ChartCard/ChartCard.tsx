import type { FC, ReactNode } from "react";
import Card from "../Card/Card";
import Icon, { type IconName } from "../Icon/Icon";
import styles from "./ChartCard.module.css";

export type ChartCardSize = "sm" | "md" | "lg";

interface ChartCardProps {
  title: string;
  description?: string;
  icon?: IconName;
  /** Optional element rendered on the leading side of the header (filters, badges). */
  action?: ReactNode;
  /** Short helpful insight rendered under the chart. */
  insight?: string;
  /** Controls the chart area height (responsive via CSS). */
  size?: ChartCardSize;
  className?: string;
  /** The Recharts ResponsiveContainer (or any chart markup). */
  children: ReactNode;
}

/**
 * Generic premium chart container: Persian title + description, a responsive
 * chart area, and an optional insight footer. Chart rendering stays with the
 * caller; this only owns layout, spacing and responsive sizing via CSS Modules.
 */
const ChartCard: FC<ChartCardProps> = ({
  title,
  description,
  icon,
  action,
  insight,
  size = "md",
  className,
  children,
}) => (
  <Card
    padding="lg"
    className={[styles.card, className ?? ""].filter(Boolean).join(" ")}
  >
    <div className={styles.head}>
      <div className={styles.heading}>
        {icon && (
          <span className={styles.iconBox}>
            <Icon name={icon} size={18} />
          </span>
        )}
        <div className={styles.titles}>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>

    {/* Charts render left-to-right; keep the SVG canvas LTR while the panel stays RTL. */}
    <div className={`${styles.chartArea} ${styles[size]}`} dir="ltr">
      {children}
    </div>

    {insight && <p className={styles.insight}>{insight}</p>}
  </Card>
);

export default ChartCard;
