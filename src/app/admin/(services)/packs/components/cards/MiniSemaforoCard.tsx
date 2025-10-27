import { Card, CardContent } from "@/components/ui/card";
import { Wifi, WifiOff } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";

export type MiniSemaforoCardType = {
  id: number;
  deviceId: string;
  isActive: boolean;
}

export const MiniSemaforoCard = ({ semaforo }: { semaforo: MiniSemaforoCardType }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "SEMAFORO",
    item: semaforo,
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) drag(ref.current);
  }, [drag]);

  return (
    <Card
      ref={ref}
      className={`p-2 m-1 cursor-move ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <CardContent>
        <div className="flex gap-2 align-middle items-center">
          <div className="text-blue-500">
            {semaforo.isActive ? <Wifi className="w-5 h-5" /> : <WifiOff  className="w-5 h-5"/>}
            
          </div>
          <div>
            <p>{semaforo.deviceId}</p>
            <div className="flex items-center gap-1">
              <span
                className={`w-2.5 h-2.5 rounded-full shadow-md ${
                  semaforo.isActive
                    ? "bg-green-500 shadow-green-500/50"
                    : "bg-red-500 shadow-red-500/50"
                }`}
                aria-label={
                  semaforo.isActive ? "Semáforo ativo" : "Semáforo inativo"
                }
                role="status"
              />
              <span
                className={`text-xs font-medium ${
                  semaforo.isActive
                    ? "text-green-700 dark:text-green-400"
                    : "text-red-700 dark:text-red-400"
                }`}
              >
                {semaforo.isActive ? "Ativo" : "Inativo"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};