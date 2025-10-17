import { apiFetch } from "@/lib/api/client";
import { DeviceFilters, SemaforoFilters } from "@/types/devices/device.filters.type";
import { Camera, CreateSemaforo, Semaforo } from "@/types/devices/devices.interface";
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
    return await apiFetch("dv/camera", {
      method: "GET",
    });
  }

  public async GetTrafficLight(
    filters: SemaforoFilters
  ): Promise<ApiResponse<Semaforo[]>> {
    const queryString = buildQuery(filters);
    const url = queryString ? `dv/semaforo?${queryString}` : "dv/semaforo";
    return await apiFetch(url, {
      method: "GET",
    });
  }

  public async CreateTrafficLight(createUserDto: CreateSemaforo): Promise<ApiResponse<Semaforo[]>>{
    return await apiFetch('dv/semaforo', {
      method: "POST",
      body:  JSON.stringify(createUserDto)
    });
  }
}

export const DevicesClient = new DevicesService();
