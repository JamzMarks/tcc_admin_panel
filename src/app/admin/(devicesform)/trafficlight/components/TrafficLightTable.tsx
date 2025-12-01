"use client";
import { BaseTable } from "@/components/ui/table/BaseTable";
import { DevicesClient } from "@/services/devices.service";
import { SemaforoFilters } from "@/types/devices/device.filters.type";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { TrafficLightFilters } from "./TrafficLightFilters";
import { TrafficLightButtonsActions } from "./TrafficLightButtonsActions";
import { useFormatter, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/ui/badge/StatusBadge";
import { SemaforoDto } from "@/types/devices/semaforo/semaforoDto.type";

export default function TrafficLightTable() {
  const t = useTranslations("Devices.TrafficLight");
  const format = useFormatter();
  const [filters, setFilters] = useState<SemaforoFilters>({
    query: null,
    isActive: null,
    pack: null,
    subPack: null,
    limit: 10,
    page: null
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["semaforo", filters],
    queryFn: () => DevicesClient.GetTrafficLight(filters),
  });
  const semaforos: SemaforoDto[] = data?.data ?? [];
  function changePage(page: number) {
  setFilters((prev) => ({
    ...prev,
    page,
  }));
}
  return (
    <div className="space-y-4">
      <TrafficLightFilters onFilter={setFilters} filters={filters}/>
      <BaseTable<SemaforoDto>
        columns={[
          { key: "deviceId", label: t("Table.device") },
          { key: "macAddress", label: t("Table.mac") },
          { key: "green_start", label: t("Table.green_start") },
          { key: "green_duration", label: t("Table.green_duration") },
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
        pagination={{
          total: data?.total,
          limit: data?.limit,
          page: data?.page,
          onPageChange: changePage
        }}
      />
    </div>
  );
}
