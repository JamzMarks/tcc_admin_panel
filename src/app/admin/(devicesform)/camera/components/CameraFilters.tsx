"use client";

import { StatusFilter } from "@/components/ui/filters/StatusFilter";
import { Input } from "@/components/ui/input";
import { DeviceFilters } from "@/types/devices/device.filters.type";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

type CameraFiltersProps = {
  onFilter: Dispatch<SetStateAction<DeviceFilters>>;
  filters: DeviceFilters;
};

export const CameraFilters = ({ onFilter, filters }: CameraFiltersProps) => {
  const t = useTranslations("Devices.Camera");

  const handleChange = (
    key: keyof DeviceFilters,
    value: string | boolean | null
  ) => {
    const newFilters = { ...filters, [key]: value };
    onFilter(newFilters);
  };

  return (
    <div className=" space-y-2 overflow-x-auto ">
      <div >
        <h3>{t("filters.title")}</h3>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-3 items-center">
        <Input
          type="text"
          value={filters.query ?? ""}
          onChange={(e) => handleChange("query", e.target.value || null)}
          placeholder="Filtrar por endereco MAC ou DecideId"
        />

        <StatusFilter
          description="asdsa"
          resource="asdasd"
          filters={filters}
          setFilters={onFilter}
          field={"isActive"}
        />
        <button
          onClick={() => {
            const reset: DeviceFilters = { query: null, isActive: null };
            onFilter(reset);
          }}
          className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-neutral-700 text-sm font-medium 
                   hover:bg-gray-300 dark:hover:bg-neutral-600"
        >
          Limpar
        </button>
      </div>
    </div>
  );
};
