"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const dataMock = [
  { time: "08:00", events: 12 },
  { time: "09:00", events: 22 },
  { time: "10:00", events: 31 },
  { time: "11:00", events: 18 },
];

export function EventsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Eventos por hora</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <LineChart width={600} height={250} data={dataMock}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="events" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </CardContent>
    </Card>
  );
}
