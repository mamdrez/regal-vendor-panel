import type { FC } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PerformancePoint } from "../../types/dashboard.types";
import ChartTooltip, { type ChartTooltipEntry } from "./ChartTooltip";
import {
  brandSoft,
  brandSoftStroke,
  chartColors,
  chartStrokes,
  chartTokens,
  faAxisNumber,
  faAxisPrice,
  faNumber,
  faPrice,
} from "./chartTheme";
import { useChartBreakpoint } from "./useChartBreakpoint";

interface VendorPerformanceComposedChartProps {
  data: PerformancePoint[];
}

const legendStyle = { fontFamily: "regular", fontSize: "0.74rem", paddingTop: "0.5rem" };

const formatValue = (value: number, entry: ChartTooltipEntry): string =>
  entry.dataKey === "revenue" ? faPrice(value) : `${faNumber(value)} بازدید`;

/** بازدید و فروش — revenue bars compared with the visits line (dual axis). */
const VendorPerformanceComposedChart: FC<VendorPerformanceComposedChartProps> = ({
  data,
}) => {
  const isMobile = useChartBreakpoint();
  const tickFontSize = isMobile ? 10 : chartTokens.tickFontSize;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
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
          yAxisId="revenue"
          orientation="right"
          width={isMobile ? 40 : 48}
          tickLine={false}
          axisLine={false}
          tick={{ fill: chartTokens.axis, fontSize: tickFontSize }}
          tickFormatter={faAxisPrice}
        />
        <YAxis
          yAxisId="visits"
          orientation="left"
          width={36}
          tickLine={false}
          axisLine={false}
          hide={isMobile}
          tick={{ fill: chartTokens.axis, fontSize: tickFontSize }}
          tickFormatter={faAxisNumber}
        />
        <Tooltip
          cursor={{ fill: "rgba(143, 180, 239, 0.08)" }}
          content={<ChartTooltip valueFormatter={formatValue} />}
        />
        <Legend wrapperStyle={legendStyle} iconType="circle" iconSize={9} />
        <Bar
          yAxisId="revenue"
          name="فروش"
          dataKey="revenue"
          fill={brandSoft}
          stroke={brandSoftStroke}
          strokeWidth={0}
          radius={chartTokens.barRadiusTop}
          barSize={isMobile ? 18 : 26}
        />
        <Line
          yAxisId="visits"
          type="monotone"
          name="بازدید"
          dataKey="visits"
          stroke={chartStrokes.blue}
          strokeWidth={2.5}
          dot={{ r: 3, fill: chartColors.blue, strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default VendorPerformanceComposedChart;
