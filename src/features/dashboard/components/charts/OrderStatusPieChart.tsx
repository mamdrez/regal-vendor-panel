import type { FC } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { OrderStatusSummary } from "../../types/dashboard.types";
import ChartTooltip from "./ChartTooltip";
import { categoricalPalette, faNumber } from "./chartTheme";

interface OrderStatusPieChartProps {
  data: OrderStatusSummary[];
}

const legendStyle = { fontFamily: "regular", fontSize: "0.76rem" };

/** سهم سفارش‌ها بر اساس وضعیت — distribution as a soft donut. */
const OrderStatusPieChart: FC<OrderStatusPieChartProps> = ({ data }) => {
  const chartData = data.map((item) => ({ name: item.status, value: item.count }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip
          content={
            <ChartTooltip
              hideName
              valueFormatter={(value) => `${faNumber(value)} سفارش`}
            />
          }
        />
        <Legend
          layout="vertical"
          align="left"
          verticalAlign="middle"
          iconType="circle"
          iconSize={9}
          wrapperStyle={legendStyle}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="58%"
          cy="50%"
          innerRadius="52%"
          outerRadius="80%"
          paddingAngle={2}
          stroke="var(--rg-surface)"
          strokeWidth={2}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={categoricalPalette[index % categoricalPalette.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default OrderStatusPieChart;
