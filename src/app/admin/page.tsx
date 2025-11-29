import { useTranslations } from "next-intl";
import { AlertsList } from "./components/dashboard/AlertList";
import { EventsChart } from "./components/dashboard/EventsChart";
import { KpiCard } from "./components/dashboard/KpiCard";
import { TrafficLightStatusCard } from "./components/dashboard/TrafficStatusCard";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  const t = useTranslations("HomePage");
  return (
    <SectionWithHeader title="Dashboard" Icon={LayoutDashboard}>
      <div className="mb-6">
        <h1 className="text-xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">
          Monitoramento dos semáforos inteligentes
        </p>
      </div>
    <div className="space-y-4">

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
    </div>
    </SectionWithHeader>
  );
}
