import { LogCard } from "./LogCard"

export const LogsResume = () => {
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
    const counts = {
        info: logs.filter((l) => l.type === "info").length,
        warning: logs.filter((l) => l.type === "warning").length,
        error: logs.filter((l) => l.type === "error").length,
    };
    return (
        <div className="flex gap-4">
            <LogCard title="Informações" count={counts.info} type="info" />
            <LogCard title="Avisos" count={counts.warning} type="warning" />
            <LogCard title="Erros" count={counts.error} type="error" />
        </div>
    )
}