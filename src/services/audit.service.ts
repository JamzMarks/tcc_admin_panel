import { apiFetch } from "@/lib/api/client";
import { ApiResponse } from "@/types/interfaces/apiResponse";
import { MQTTCredentials } from "@/types/mqtt/mqttCredentials";
import { ServerTime } from "@/types/mqtt/serverTime";

class AuditService {
  constructor() {}

  public async GetPacks(): Promise<ApiResponse<MQTTCredentials>>{
    return await apiFetch('/mt/mqtt/credentials', {
      method: "GET"
    });
  } 

  public async GetServerTime(): Promise<ServerTime>{
    return await apiFetch('/mt/mqtt/time', {
      method: "GET"
    });
  } 
}

export const AuditClient = new AuditService();
