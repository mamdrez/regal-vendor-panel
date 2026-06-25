import type { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ProductPerformanceItem } from "../../types/dashboard.types";
import ChartTooltip from "./ChartTooltip";
import { chartTokens, faAxisNumber } from "./chartTheme";
import { useChartBreakpoint } from "./useChartBreakpoint";

type ProductMetric = "views" | "soldCount" | "revenue";

interface ProductBarChartProps {
  data: ProductPerformanceItem[];
  metric: ProductMetric;
  /** Bar fill color (soft palette). */
  color: string;
  /** Tooltip/value formatter (Persian numbers or price). */
  valueFormatter: (value: number) => string;
}

const truncate = (value: string, max: number): string =>
  value.length > max ? `${value.slice(0, max)}…` : value;

/**
 * پرفروش‌ترین / پربازدیدترین محصولات — horizontal comparison bars with
 * rounded corners and Persian product labels on the (right) category axis.
 */
const ProductBarChart: FC<ProductBarChartProps> = ({
  data,
  metric,
  color,
  valueFormatter,
}) => {
  const isMobile = useChartBreakpoint();
  const tickFontSize = isMobile ? 10 : chartTokens.tickFontSize;
  const labelWidth = isMobile ? 68 : 96;
  const labelMax = isMobile ? 9 : 14;

  const chartData = data.map((item) => ({
    name: item.title,
    value: item[metric] ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={chartData}
        margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
        barCategoryGap="28%"
      >
        <CartesianGrid stroke={chartTokens.grid} horizontal={false} />
        <XAxis
          type="number"
          reversed
          tickLine={false}
          axisLine={false}
          tick={{ fill: chartTokens.axis, fontSize: tickFontSize }}
          tickFormatter={faAxisNumber}
        />
        <YAxis
          type="category"
          dataKey="name"
          orientation="right"
          width={labelWidth}
          tickLine={false}
          axisLine={false}
          tick={{ fill: chartTokens.axis, fontSize: tickFontSize }}
          tickFormatter={(value: string) => truncate(value, labelMax)}
        />
        <Tooltip
          cursor={{ fill: "rgba(166, 160, 152, 0.08)" }}
          content={<ChartTooltip hideName valueFormatter={(value) => valueFormatter(value)} />}
        />
        <Bar dataKey="value" radius={[8, 8, 8, 8]} barSize={16}>
          {chartData.map((entry) => (
            <Cell key={entry.name} fill={color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProductBarChart;
