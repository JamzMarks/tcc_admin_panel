import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LogCardProps {
  title: string;
  count: number;
  type?: "info" | "warning" | "error";
}

export function LogCard({ title, count, type = "info" }: LogCardProps) {
  const colorMap = {
    info: "bg-blue-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <span className="text-2xl font-bold">{count}</span>
        <Badge className={`${colorMap[type]} text-white`}>{type.toUpperCase()}</Badge>
      </CardContent>
    </Card>
  );
}
