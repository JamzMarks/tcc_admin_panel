import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TrafficLightStatusCard({ online, offline }) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Status dos Semáforos</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-green-600 font-semibold">Online: {online}</p>
        <p className="text-red-600 font-semibold">Offline: {offline}</p>
      </CardContent>
    </Card>
  );
}
