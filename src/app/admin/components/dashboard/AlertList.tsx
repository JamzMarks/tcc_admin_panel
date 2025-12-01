import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockAlerts = [
  { id: 1, message: "Semáforo S1 sem resposta há 5 minutos." },
  { id: 2, message: "Baixa tensão detectada em S3." },
];

export function AlertsList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {mockAlerts.map(alert => (
            <li key={alert.id} className="text-sm">
              • {alert.message}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
