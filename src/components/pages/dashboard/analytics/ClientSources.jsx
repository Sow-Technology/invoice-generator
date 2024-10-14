import { TooltipProvider, Tooltip } from "@radix-ui/react-tooltip";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

export default function ClientSources({ data }) {
  const COLORS = [
    "#4A90E2",
    "#50E3C2",
    "#F5A623",
    "#D0021B",
    "#BD10E0",
    "#B8E986",
  ];

  const chartData = Object.entries(data || {}).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <TooltipProvider>
      <ResponsiveContainer width="110%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          {/* <Legend layout="horizontal" verticalAlign="bottom" align="center" /> */}
        </PieChart>
      </ResponsiveContainer>
    </TooltipProvider>
  );
}
