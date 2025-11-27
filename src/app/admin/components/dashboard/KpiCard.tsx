import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KpiCard({ title, value }) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
