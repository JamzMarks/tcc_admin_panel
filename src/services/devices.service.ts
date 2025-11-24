import { apiFetch } from "@/lib/api/client";
import { DeviceFilters, SemaforoFilters } from "@/types/devices/device.filters.type";
import { Camera } from "@/types/devices/devices.interface";
import { CreateSemaforo, SemaforoDto, SemaforoInfoDto, UpdateSemaforo } from "@/types/devices/semaforo/semaforoDto.type";
import { LinkSemaforo } from "@/types/graph/linkGraph.type";
import { ApiResponse } from "@/types/interfaces/apiResponse";
import { buildQuery } from "@/utils/queryBuild";

class DevicesService {
  constructor() {}

  async trafficLightTester() {
    const eventSource = new EventSource(
      "http://localhost:3000/semaforo/test?ids=123,124"
    );
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Resultado parcial:", data);
    };
  }
  public async GetCameras(
    filters: DeviceFilters
  ): Promise<ApiResponse<Camera[]>> {
    return await apiFetch("/dv/camera", {
      method: "GET",
    });
  }

  public async GetTrafficLight(
    filters: SemaforoFilters
  ): Promise<ApiResponse<SemaforoDto[]>> {
    const queryString = buildQuery(filters);
    const url = queryString ? `/dv/semaforo?${queryString}` : "dv/semaforo";
    return await apiFetch(url, {
      method: "GET",
    });
  }

  public async GetTrafficLightById(id: string): Promise<ApiResponse<SemaforoInfoDto>>{
    return await apiFetch(`/dv/semaforo/${id}`, {
      method: "GET",
    });
  }

  public async CreateTrafficLight(createUserDto: CreateSemaforo): Promise<ApiResponse<SemaforoDto[]>>{
    return await apiFetch('/dv/semaforo', {
      method: "POST",
      body:  JSON.stringify(createUserDto)
    });
  }

  public async UpdateTrafficLight(id: number, UpdateSemaforoDto: UpdateSemaforo): Promise<ApiResponse<SemaforoDto>>{
    return await apiFetch(`/dv/semaforo/${id}`, {
      method: "PUT",
      body:  JSON.stringify(UpdateSemaforoDto)
    });
  }

  public async deleteTrafficLight(id: string): Promise<ApiResponse<void>>{
    return await apiFetch(`/dv/semaforo/${id}`, {
      method: "DELETE",
    });
  }

  public async LinkSemaforo(data: LinkSemaforo): Promise<ApiResponse<void>> {
    console.log(data)
    return await apiFetch(`/dv/semaforo/${data.semaforoDeviceId}/link`, {
      method: "POST",
      body: JSON.stringify({
        wayId: data.wayId,
        nodeId: data.nodeId
      })
    });
  }
  // public async GetTrafficLightById(id: number): Promise<ApiResponse<Semaforo>> {
  //   await new Promise((r) => setTimeout(r, 300)); // simular delay
  //   return {
  //     sucess: true,
  //     message: `Semáforo ${id} encontrado com sucesso.`,
  //     data:{
  //       id,
  //       macAddress: "AA:BB:CC:DD:EE:11",
  //       deviceId: "SEMAFORO_001",
  //       ip: "192.168.0.50",
  //       deviceKey: "MOCK-KEY-123",
  //       isActive: true,
  //       createdAt: new Date().toString(),
  //       updatedAt: new Date().toString(),
  //       packId: 1,
  //       subPackId: null,
  //     }
  //   }
  // }

  // Mock de WebSocket/SSE artificial
  public listenToTrafficLight(deviceId: string, onMessage: (msg: any) => void) {
    // Simula eventos chegando a cada 4 segundos
    let t = 0;
    setInterval(() => {
      const mockMsg = {
        green_start: t % 3 === 0,
        green_duration: 3000,
        yellow_start: t % 3 === 1,
        yellow_duration: 2000,
        red_start: t % 3 === 2,
        red_duration: 4000,
        cicle_total: 9000,
      };
      onMessage(mockMsg);
      t++;
    }, 4000);
  }
};


export const DevicesClient = new DevicesService();
