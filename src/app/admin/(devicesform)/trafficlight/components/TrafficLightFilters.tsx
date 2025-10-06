"use client";

import { StatusFilter } from "@/components/ui/filters/StatusFilter";
import { Input } from "@/components/ui/input";
import { SemaforoFilters } from "@/types/devices/device.filters.type";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

type TrafficLightFiltersProps = {
  onFilter: Dispatch<SetStateAction<SemaforoFilters>>;
  filters: SemaforoFilters
};

export const TrafficLightFilters = ({ onFilter, filters }: TrafficLightFiltersProps) => {
  const t = useTranslations("Devices.TrafficLight");

  const handleChange = (
    key: keyof SemaforoFilters,
    value: string | number | boolean | null
  ) => {
    const newFilters = { ...filters, [key]: value };
    onFilter(newFilters);
  };

  const resetFilters = () => {
    const reset: SemaforoFilters = {
      query: null,
      status: null,
      pack: null,
      subpack: null,
    };
    onFilter(reset);
  };

  return (
    <div className="space-y-2 overflow-x-auto">
      <div>
        <h3 className="font-semibold">{t("filters.title")}</h3>
      </div>

      <div className="flex flex-wrap md:flex-nowrap gap-3 items-center">
        <Input
          type="text"
          value={filters.query ?? ""}
          onChange={(e) => handleChange("query", e.target.value || null)}
          placeholder={t("filters.searchPlaceholder")}
        />
        <Input
          type="number"
          min="0"
          value={filters.pack ?? ""}
          onChange={(e) =>
            handleChange("pack", e.target.value ? Number(e.target.value) : null)
          }
          placeholder={t("filters.pack")}
        />
        <Input
          type="number"
          min="0"
          value={filters.subpack ?? ""}
          onChange={(e) =>
            handleChange(
              "subpack",
              e.target.value ? Number(e.target.value) : null
            )
          }
          placeholder={t("filters.subpack")}
        />
        <StatusFilter
          resource={t("filters.Combobox.Resource")}
          description={t("filters.Combobox.Description")}
          filters={filters}
          setFilters={onFilter}
          field={"status"}    
          
        />
        <button
          onClick={resetFilters}
          className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-neutral-700 text-sm font-medium 
                     hover:bg-gray-300 dark:hover:bg-neutral-600"
        >
          {t("filters.clear")}
        </button>
      </div>
    </div>
  );
};
