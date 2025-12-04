"use client";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { DevicesClient } from "@/services/devices.service";
import { SemaforoDto } from "@/types/devices/semaforo/semaforoDto.type";
import { LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [trafficLights, setTrafficLights] = useState<SemaforoDto[]>([]);
  const [cameras, setCameras] = useState<any[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const semaforosRes = await DevicesClient.GetTrafficLight({
          query: null,
          isActive: null,
          pack: null,
          subPack: null,
          page: null,
          limit: 2000,
        });
        const camerasRes = await DevicesClient.GetCameras({
          query: null,
          isActive: null,
          page: null,
          limit: 2000,
        });
        setTrafficLights(semaforosRes.data || []);
        setCameras(camerasRes.data || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <SectionWithHeader title="Dashboard" Icon={LayoutDashboard}>
      <div className="mb-6">
        <h1 className="text-xl font-bold">Monitoring</h1>
        <p className="text-muted-foreground">
          General Status:
        </p>
      </div>

      <div className="space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Traffic Lights</p>
            <p className="text-2xl font-bold">{trafficLights.length}</p>
          </div>

          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Online</p>
            <p className="text-2xl font-bold">
              {trafficLights.filter((t) => t.isActive).length}
            </p>
          </div>

          <div className="rounded-2xl border p-4">
            <p className="text-sm text-muted-foreground">Devices</p>
            <p className="text-2xl font-bold">{cameras.length}</p>
          </div>
        </div>

        {/* Lista simples de semáforos */}
        <div className="rounded-2xl border p-4">
          <h2 className="font-semibold mb-4">Registered Traffic Lights</h2>
          <div className="space-y-2">
            {trafficLights.map((tl) => (
              <div
                key={tl.id}
                className="flex items-center justify-between border p-3 rounded-xl"
              >
                <div>
                  <p className="font-medium">{tl.deviceId}</p>
                  <p className="text-sm text-muted-foreground">
                    MAC: {tl.macAddress}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    tl.isActive
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {tl.isActive ? "Online" : "Offline"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Câmeras */}
        <div className="rounded-2xl border p-4">
          <h2 className="font-semibold mb-4">Devices</h2>

          {cameras.map((cam) => (
            <div
              key={cam.deviceId}
              className="flex items-center justify-between border p-3 rounded-xl"
            >
              <div>
                <p className="font-medium">{cam.deviceId}</p>
                <p className="text-sm text-muted-foreground">{cam.ip}</p>
              </div>

              <p className="text-sm text-muted-foreground">
                Confiability: {cam.confiability}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWithHeader>
  );
}
