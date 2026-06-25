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
import type { CategoryPerformanceItem } from "../../types/dashboard.types";
import ChartTooltip from "./ChartTooltip";
import { categoricalPalette, chartTokens, faAxisPrice, faPrice } from "./chartTheme";
import { useChartBreakpoint } from "./useChartBreakpoint";

interface CategoryPerformanceBarChartProps {
  data: CategoryPerformanceItem[];
}

const truncate = (value: string, max: number): string =>
  value.length > max ? `${value.slice(0, max)}…` : value;

/** عملکرد دسته‌بندی‌ها — revenue comparison across categories. */
const CategoryPerformanceBarChart: FC<CategoryPerformanceBarChartProps> = ({ data }) => {
  const isMobile = useChartBreakpoint();
  const tickFontSize = isMobile ? 10 : chartTokens.tickFontSize;

  const chartData = data.map((item) => ({
    name: item.category,
    value: item.revenue,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 8, right: 4, left: 4, bottom: 0 }}
        barCategoryGap="26%"
      >
        <CartesianGrid stroke={chartTokens.grid} vertical={false} />
        <XAxis
          dataKey="name"
          reversed
          tickLine={false}
          axisLine={false}
          interval={0}
          tick={{ fill: chartTokens.axis, fontSize: tickFontSize }}
          tickFormatter={(value: string) => truncate(value, isMobile ? 6 : 9)}
        />
        <YAxis
          orientation="right"
          width={isMobile ? 40 : 48}
          tickLine={false}
          axisLine={false}
          tick={{ fill: chartTokens.axis, fontSize: tickFontSize }}
          tickFormatter={faAxisPrice}
        />
        <Tooltip
          cursor={{ fill: "rgba(166, 160, 152, 0.08)" }}
          content={<ChartTooltip hideName valueFormatter={(value) => faPrice(value)} />}
        />
        <Bar dataKey="value" radius={chartTokens.barRadiusTop} barSize={isMobile ? 24 : 34}>
          {chartData.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={categoricalPalette[index % categoricalPalette.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CategoryPerformanceBarChart;
