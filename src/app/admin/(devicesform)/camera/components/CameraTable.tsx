"use client";
import { BaseTable } from "@/components/ui/table/BaseTable";
import { DevicesClient } from "@/services/devices.service";
import { DeviceFilters } from "@/types/devices/device.filters.type";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CameraButtonsActions } from "./CameraButtonsActions";
import { CameraFilters } from "./CameraFilters";
import { useFormatter, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/ui/badge/StatusBadge";
import { DeviceDto } from "@/types/devices/sensors/device.type";

export default function CamerasTable() {
  const t = useTranslations("Devices.Camera");
  const format = useFormatter();
  const [filters, setFilters] = useState<DeviceFilters>({
    query: null,
    isActive: null,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cameras", filters],
    queryFn: () => DevicesClient.GetCameras(filters),
  });

  const cameras: DeviceDto[] = data?.data ?? [];

  return (
    <div className="space-y-4">
      <CameraFilters onFilter={setFilters} filters={filters} />
      <BaseTable<DeviceDto>
        loading={isLoading}
        error={isError}
        columns={[
          { key: "deviceId", label: t("Table.device") },
          { key: "confiability", label: t("Table.confiability") },
          { key: "flow", label: t("Table.flow") },
          { key: "ip", label: t("Table.ip") },
          {
            key: "createdAt",
            label: t("Table.createAt"),
            render: (s) =>
              s.createdAt ? (
                format.dateTime(new Date(s.createdAt), {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              ) : (
                <p className="text-sm">{t("Table.dateNot")}</p>
              ),
          },
          {
            key: "updatedAt",
            label: t("Table.updatedAt"),
            render: (s) =>
              s.createdAt ? (
                format.dateTime(new Date(s.createdAt), {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              ) : (
                <p className="text-sm">{t("Table.dateNot")}</p>
              ),
          },
          {
            key: "status",
            label: t("Table.status"),
            render: (u) => <StatusBadge status={u.isActive} />,
          },
          {
            key: "actions",
            label: t("Table.Actions.actionsTable"),
            render: (c) => <CameraButtonsActions macAddress={c.deviceId} />,
          },
        ]}
        data={cameras}
        emptyMessage={t("notFound")}
      />
    </div>
  );
}
