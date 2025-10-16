import { ScrollArea } from "@/components/ui/scroll-area";

export interface LogEntry {
  id: string;
  message: string;
  type: "info" | "warning" | "error";
  timestamp: string;
}

interface LogTimelineProps {
  logs: LogEntry[];
}

export function LogTimeline({ logs }: LogTimelineProps) {
  const iconMap = {
    info: "ℹ️",
    warning: "⚠️",
    error: "❌",
  };

  return (
    <ScrollArea className="h-96">
      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="flex items-center space-x-2 p-2 border-b">
            <span>{iconMap[log.type]}</span>
            <div>
              <p className="text-sm">{log.message}</p>
              <p className="text-xs text-muted-foreground">{log.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
