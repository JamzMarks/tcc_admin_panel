import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogEntry } from "./LogTimeline";

interface LogDetailProps {
  log: LogEntry;
}

export function LogDetailModal({ log }: LogDetailProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Detalhes</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Log</DialogTitle>
        </DialogHeader>
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(log, null, 2)}</pre>
      </DialogContent>
    </Dialog>
  );
}
