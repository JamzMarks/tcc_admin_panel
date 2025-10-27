import { useDrop } from "react-dnd";
import { MiniSemaforoCard, MiniSemaforoCardType } from "./MiniSemaforoCard";
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

export interface SubPackCard {
  id: number;
  name: string;
  semaforos: MiniSemaforoCardType[];
}


export const SubPack = ({
  subPack,
  onDropSemaforo,
}: {
  subPack: SubPackCard;
  onDropSemaforo: (semaforo: MiniSemaforoCardType, subPackId: number) => void;
}) => {
  const [, drop] = useDrop<MiniSemaforoCardType, void, unknown>({
    accept: "SEMAFORO",
    drop: (item) => onDropSemaforo(item, subPack.id),
  });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) drop(ref.current);
  }, [drop]);

  return (
    <Card ref={ref} className="p-2 m-2 border-2 border-dashed w-64 bg-gray-50">
      <CardContent>
        <h3 className="font-bold mb-2">{subPack.name}</h3>
        <div className="flex flex-wrap">
          {subPack.semaforos.map((s) => (
            <MiniSemaforoCard key={s.id} semaforo={s} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};