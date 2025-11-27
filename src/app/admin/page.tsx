import { AlertsList } from "./components/dashboard/AlertList";
import { EventsChart } from "./components/dashboard/EventsChart";
import { KpiCard } from "./components/dashboard/KpiCard";
import { TrafficLightStatusCard } from "./components/dashboard/TrafficStatusCard";

export default function Dashboard() {
   const t = useTranslations('HomePage');
  return (
    <section className="p-6 space-y-8">
      
      <header className="mb-6">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="text-muted-foreground">
        Monitoramento em tempo real dos semáforos inteligentes
      </p>
    </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KpiCard title="Eventos Hoje" value={182} />
        <KpiCard title="Falhas Detectadas" value={7} />
        <KpiCard title="Precisão Média de Telemetria" value="98.2%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EventsChart />
        <TrafficLightStatusCard online={27} offline={2} />
      </div>

      <AlertsList />
    </section>
  );
}
