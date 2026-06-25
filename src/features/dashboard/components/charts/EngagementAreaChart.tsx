import type { FC } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { EngagementPoint } from "../../types/dashboard.types";
import ChartTooltip from "./ChartTooltip";
import { chartColors, chartStrokes, chartTokens, faAxisNumber, faNumber } from "./chartTheme";
import { useChartBreakpoint } from "./useChartBreakpoint";

interface EngagementAreaChartProps {
  data: EngagementPoint[];
}

const legendStyle = { fontFamily: "regular", fontSize: "0.74rem", paddingTop: "0.5rem" };

/**
 * روند تعامل با فروشگاه — soft stacked areas for product views,
 * profile views and shop-link clicks.
 */
const EngagementAreaChart: FC<EngagementAreaChartProps> = ({ data }) => {
  const isMobile = useChartBreakpoint();
  const tickFontSize = isMobile ? 10 : chartTokens.tickFontSize;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
        <defs>
          <linearGradient id="engProduct" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColors.blue} stopOpacity={0.4} />
            <stop offset="100%" stopColor={chartColors.blue} stopOpacity={0.04} />
          </linearGradient>
          <linearGradient id="engProfile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColors.purple} stopOpacity={0.4} />
            <stop offset="100%" stopColor={chartColors.purple} stopOpacity={0.04} />
          </linearGradient>
          <linearGradient id="engLink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColors.pink} stopOpacity={0.4} />
            <stop offset="100%" stopColor={chartColors.pink} stopOpacity={0.04} />
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
          width={isMobile ? 34 : 42}
          tickLine={false}
          axisLine={false}
          tick={{ fill: chartTokens.axis, fontSize: tickFontSize }}
          tickFormatter={faAxisNumber}
        />
        <Tooltip
          cursor={{ stroke: chartColors.purple, strokeWidth: 1, strokeDasharray: "4 4" }}
          content={<ChartTooltip valueFormatter={(value) => faNumber(value)} />}
        />
        <Legend wrapperStyle={legendStyle} iconType="circle" iconSize={9} />
        <Area
          type="monotone"
          name="بازدید محصولات"
          dataKey="productViews"
          stroke={chartStrokes.blue}
          strokeWidth={2}
          fill="url(#engProduct)"
        />
        <Area
          type="monotone"
          name="بازدید پروفایل"
          dataKey="profileViews"
          stroke={chartStrokes.purple}
          strokeWidth={2}
          fill="url(#engProfile)"
        />
        <Area
          type="monotone"
          name="کلیک لینک فروشگاه"
          dataKey="linkClicks"
          stroke={chartStrokes.pink}
          strokeWidth={2}
          fill="url(#engLink)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default EngagementAreaChart;
