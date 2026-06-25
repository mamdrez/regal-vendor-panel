import type { FC } from "react";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import type { ConversionStat } from "../../types/dashboard.types";
import { categoricalPalette } from "./chartTheme";
import styles from "./ConversionRadialChart.module.css";

interface ConversionRadialChartProps {
  data: ConversionStat[];
}

/** نرخ تبدیل / تکمیل پروفایل / محصولات فعال — compact KPI progress rings. */
const ConversionRadialChart: FC<ConversionRadialChartProps> = ({ data }) => {
  const ringData = data.map((item, index) => ({
    ...item,
    fill: categoricalPalette[index % categoricalPalette.length],
  }));

  return (
    <div className={styles.wrap}>
      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={ringData}
            innerRadius="32%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            barSize={12}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              background={{ fill: "var(--rg-surface-muted)" }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      <ul className={styles.legend} dir="rtl">
        {ringData.map((item) => (
          <li key={item.id} className={styles.legendItem}>
            <span className={styles.dot} style={{ background: item.fill }} />
            <span className={styles.legendLabel}>{item.label}</span>
            <span className={styles.legendValue}>
              {item.value.toLocaleString("fa-IR")}٪
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversionRadialChart;
