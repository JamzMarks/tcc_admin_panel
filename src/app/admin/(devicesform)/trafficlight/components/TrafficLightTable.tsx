"use client";
import { BaseTable } from "@/components/ui/table/BaseTable";
import { DevicesClient } from "@/services/devices.service";
import { SemaforoFilters } from "@/types/devices/device.filters.type";
import { Semaforo } from "@/types/devices/devices.interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TrafficLightFilters } from "./TrafficLightFilters";
import { TrafficLightButtonsActions } from "./TrafficLightButtonsActions";
import { useFormatter, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/ui/badge/StatusBadge";

export default function TrafficLightTable() {
  const t = useTranslations("Devices.TrafficLight");
  const format = useFormatter();
  const [filters, setFilters] = useState<SemaforoFilters>({
    query: null,
    isActive: null,
    pack: null,
    subPack: null,
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["semaforo", filters],
    queryFn: () => DevicesClient.GetTrafficLight(filters),
  });
  const semaforos: Semaforo[] = data?.data ?? [];

  return (
    <div className="space-y-4">
      <TrafficLightFilters onFilter={setFilters} filters={filters}/>
      <BaseTable<Semaforo>
        columns={[
          { key: "deviceId", label: t("Table.device") },
          { key: "macAddress", label: t("Table.mac") },
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
            key: "packId",
            label: t("Table.packId"),
            render: (s) =>
              s.packId ? (
                s.packId
              ) : (
                <p className="text-sm">{t("Table.notlinked")}</p>
              ),
          },
          {
            key: "subPackId",
            label: t("Table.subpackId"),
            render: (s) =>
              s.subPackId ? (
                s.subPackId
              ) : (
                <p className="text-sm">{t("Table.notlinked")}</p>
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
            render: (s) => (
              <TrafficLightButtonsActions macAddress={s.macAddress} id={s.id} />
            ),
          },
        ]}
        data={semaforos}
        emptyMessage={t("notFound")}
        error={isError}
        loading={isLoading}
      />
    </div>
  );
}
