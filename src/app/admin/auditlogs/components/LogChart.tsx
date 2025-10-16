import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface LogChartProps {
  data: { day: string; info: number; warning: number; error: number }[];
}

export function LogChart({ data }: LogChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="info" stackId="a" fill="#3b82f6" />
        <Bar dataKey="warning" stackId="a" fill="#facc15" />
        <Bar dataKey="error" stackId="a" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  );
}
