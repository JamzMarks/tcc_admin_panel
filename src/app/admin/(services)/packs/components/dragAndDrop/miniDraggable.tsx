import { useDraggable } from "@dnd-kit/core";


import { SemaforoDto } from "@/types/devices/semaforo/semaforoDto.type";
import { MiniSemaforoCard } from "../cards/MiniSemaforoCard";

  export const MiniDraggable = ({ semaforo }: { semaforo: SemaforoDto }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: semaforo.id.toString() });
    const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;

    return (
      <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
        <MiniSemaforoCard semaforo={semaforo} />
      </div>
    );
  };