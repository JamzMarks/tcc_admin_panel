import { apiFetch } from "@/lib/api/client";

class YoloService {
  constructor() {}

  public async TestYolo(formData: FormData): Promise<any>{
    return await apiFetch('/yolo/test', {
      method: "POST",
      body: formData,
    });
  }
}

export const YoloClient = new YoloService();
