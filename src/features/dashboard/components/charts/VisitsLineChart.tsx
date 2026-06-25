import type { FC } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartPoint } from "../../types/dashboard.types";
import ChartTooltip from "./ChartTooltip";
import { chartColors, chartStrokes, chartTokens, faAxisNumber, faNumber } from "./chartTheme";
import { useChartBreakpoint } from "./useChartBreakpoint";

interface VisitsLineChartProps {
  data: ChartPoint[];
}

/** روند بازدید روزانه — trend over time rendered as a smooth line. */
const VisitsLineChart: FC<VisitsLineChartProps> = ({ data }) => {
  const isMobile = useChartBreakpoint();
  const tickFontSize = isMobile ? 10 : chartTokens.tickFontSize;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
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
          cursor={{ stroke: chartColors.blue, strokeWidth: 1, strokeDasharray: "4 4" }}
          content={
            <ChartTooltip hideName valueFormatter={(value) => `${faNumber(value)} بازدید`} />
          }
        />
        <Line
          type="monotone"
          name="بازدید"
          dataKey="value"
          stroke={chartStrokes.blue}
          strokeWidth={2.5}
          dot={{ r: 3, fill: chartColors.blue, strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default VisitsLineChart;
