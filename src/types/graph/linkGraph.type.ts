import { SemaforoDto } from "../devices/semaforo/semaforoDto.type";

export interface LinkSemaforo {
  semaforoDeviceId: string;
  wayId: string;
  nodeId: string
}