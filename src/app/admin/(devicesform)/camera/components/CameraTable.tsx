"use client";
import { BaseTable } from "@/components/ui/table/BaseTable";
import { DevicesClient } from "@/services/devices.service";
import { DeviceFilters } from "@/types/devices/device.filters.type";
import { Camera } from "@/types/devices/devices.interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CameraButtonsActions } from "./CameraButtonsActions";
import { CameraFilters } from "./CameraFilters";

export default function CamerasTable() {
  const [filters, setFilters] = useState<DeviceFilters>({
    query: null,
    isActive: null,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cameras", filters],
    queryFn: () => DevicesClient.GetCameras(filters),
  });

  const cameras: Camera[] = data?.data ?? [];

  return (
    <div className="space-y-4">
      <CameraFilters onFilter={setFilters} filters={filters}/>
        <BaseTable<Camera>
          loading={isLoading}
          error={isError}
          columns={[
            { key: "deviceId", label: "Device ID" },
            { key: "macAddress", label: "MAC" },
            { key: "ip", label: "IP" },
            { key: "createdAt", label: "Criado em" },
            {
              key: "actions",
              label: "Ações",
              render: (c) => <CameraButtonsActions macAddress={c.macAddress} />,
            },
          ]}
          data={cameras}
          emptyMessage="Nenhuma câmera cadastrada"
        />
    </div>
  );
}
