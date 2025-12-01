import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KpiProps {
  title: string;
  value: string | number;
}

export function KpiCard({ title, value }: KpiProps) {
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
