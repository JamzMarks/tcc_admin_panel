import { apiFetch } from "@/lib/api/client";
import { ApiResponse } from "@/types/interfaces/apiResponse";
import { MQTTCredentials } from "@/types/mqtt/mqttCredentials";
import { ServerTime } from "@/types/mqtt/serverTime";

class MQTTService {
  constructor() {}

  public async GetPacks(): Promise<ApiResponse<MQTTCredentials>>{
    return await apiFetch('/dv/mqtt/credentials', {
      method: "GET"
    });
  } 

  public async GetServerTime(): Promise<ApiResponse<ServerTime>>{
    return await apiFetch('/dv/mqtt/time', {
      method: "GET"
    });
  } 
}

export const MQTTClient = new MQTTService();
