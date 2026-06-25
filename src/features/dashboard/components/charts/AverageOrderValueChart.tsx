import type { FC } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartPoint } from "../../types/dashboard.types";
import ChartTooltip from "./ChartTooltip";
import {
  chartColors,
  chartStrokes,
  chartTokens,
  faAxisPrice,
  faPrice,
} from "./chartTheme";
import { useChartBreakpoint } from "./useChartBreakpoint";

interface AverageOrderValueChartProps {
  data: ChartPoint[];
}

/** میانگین ارزش سفارش mock — soft champagne area trend. */
const AverageOrderValueChart: FC<AverageOrderValueChartProps> = ({ data }) => {
  const isMobile = useChartBreakpoint();
  const tickFontSize = isMobile ? 10 : chartTokens.tickFontSize;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
        <defs>
          <linearGradient id="aovFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColors.champagne} stopOpacity={0.5} />
            <stop offset="100%" stopColor={chartColors.champagne} stopOpacity={0.04} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={chartTokens.grid} vertical={false} />
        <XAxis
          dataKey="label"
          reversed
          tickLine={false}
          axisLine={false}
          interval="preserveStartEnd"
          minTickGap={isMobile ? 16 : 8}
          tick={{ fill: chartTokens.axis, fontSize: tickFontSize }}
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
          cursor={{ stroke: chartColors.champagne, strokeWidth: 1, strokeDasharray: "4 4" }}
          content={<ChartTooltip hideName valueFormatter={(value) => faPrice(value)} />}
        />
        <Area
          type="monotone"
          name="میانگین ارزش سفارش"
          dataKey="value"
          stroke={chartStrokes.champagne}
          strokeWidth={2.5}
          fill="url(#aovFill)"
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AverageOrderValueChart;
