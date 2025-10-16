"use client";
import { PageTitle } from "@/components/ui/elements/PageTitle";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { List, Logs } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LogEntry, LogTimeline } from "./components/LogTimeline";
import { LogCard } from "./components/LogCard";
import { LogFilterSidebar } from "./components/LogFilterSideBar";
import { LogChart } from "./components/LogChart";
import { LogDetailModal } from "./components/LogDetailModal";

const AuditLogsPage = () => {
  const t = useTranslations("UsersPage");
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "1",
      message: "Usuário logou com sucesso",
      type: "info",
      timestamp: "2025-10-11 10:00",
    },
    {
      id: "2",
      message: "Erro ao processar pagamento",
      type: "error",
      timestamp: "2025-10-11 11:20",
    },
    {
      id: "3",
      message: "Atenção: limite de requisições excedido",
      type: "warning",
      timestamp: "2025-10-11 12:00",
    },
    {
      id: "4",
      message: "Usuário atualizou perfil",
      type: "info",
      timestamp: "2025-10-11 12:30",
    },
  ]);

  const chartData = [
    { day: "Seg", info: 5, warning: 2, error: 1 },
    { day: "Ter", info: 8, warning: 1, error: 0 },
    { day: "Qua", info: 4, warning: 0, error: 2 },
    { day: "Qui", info: 6, warning: 3, error: 1 },
    { day: "Sex", info: 7, warning: 1, error: 0 },
  ];

  const counts = {
    info: logs.filter((l) => l.type === "info").length,
    warning: logs.filter((l) => l.type === "warning").length,
    error: logs.filter((l) => l.type === "error").length,
  };
  return (
    <div className="space-y-4">
      <PageTitle>{t("title")}</PageTitle>

      <SectionWithHeader title={t("UsersList.userList")} Icon={Logs}>
        <div className="p-6 space-y-6">
          {/* 1️⃣ Cards Resumidos */}
          <div className="grid gap-4 md:grid-cols-3 grid-cols-1">
            <LogCard title="Informações" count={counts.info} type="info" />
            <LogCard title="Avisos" count={counts.warning} type="warning" />
            <LogCard title="Erros" count={counts.error} type="error" />
          </div>

          {/* 2️⃣ Layout principal */}
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-64">
              <LogFilterSidebar />
            </div>

            {/* Timeline + tabela */}
            <div className="flex-1 space-y-6">
              <h2 className="text-lg font-semibold">Timeline de Logs</h2>
              <LogTimeline logs={logs} />

              <h2 className="text-lg font-semibold">Gráfico de Logs</h2>
              <LogChart data={chartData} />

              <h2 className="text-lg font-semibold">Detalhes do Log</h2>
              <div className="flex flex-wrap gap-2">
                {logs.map((log) => (
                  <LogDetailModal key={log.id} log={log} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWithHeader>
    </div>
  );
};

export default AuditLogsPage;
