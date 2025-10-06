"use client";

import { SimpleComboBox } from "@/components/ui/combo/SimpleComboBox";
import { Input } from "@/components/ui/input";
import { UserFilter } from "@/types/user/user-filters.type";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useState } from "react";

type UserFiltersProps = {
  onFilter: Dispatch<SetStateAction<UserFilter>>;
};

export const UserFilters = ({ onFilter }: UserFiltersProps) => {
  const t = useTranslations("UsersPage.filters");
  const [filters, setFilters] = useState<UserFilter>({
    query: null,
    role: null,
    status: null,
  });

  const handleChange = (
    key: keyof UserFilter,
    value: string | boolean | null
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };
  
  const handleStatus = (value: string) => {
    if (value == "true") {
      setFilters((prev) => ({
        ...prev,
        status: true,
      }));
      handleChange("status", true);
    } else if (value == "false") {
      setFilters((prev) => ({
        ...prev,
        status: false,
      }));
      handleChange("status", false);
    } else {
      setFilters((prev) => ({
        ...prev,
        status: null,
      }));
      handleChange("status", null);
    }
  };
  return (
    <div className=" space-y-2 overflow-x-auto ">
      <div>
        <h3 className="font-semibold">{t("filters")}</h3>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-3 items-center">
        <Input
          type="text"
          value={filters.query ?? ""}
          onChange={(e) => handleChange("query", e.target.value || null)}
          placeholder="Filtrar por nome ou email"
        />

        <SimpleComboBox
          placeholder={t("RolesCombobox.Placeholder")}
          resource={t("RolesCombobox.Resource")}
          description={t("RolesCombobox.Description")}
          onChange={handleStatus}
          options={[
            { label: t("filters.Combobox.ActiveOption"), value: "admin" },
            { label: t("filters.Combobox.InactiveOption"), value: "manager" },
            { label: t("filters.Combobox.InactiveOption"), value: "user" },
            { label: t("filters.Combobox.InactiveOption"), value: "auditor" },
          ]}
        />
        <SimpleComboBox
          placeholder={t("StatusCombobox.Placeholder")}
          resource={t("StatusCombobox.Resource")}
          description={t("StatusCombobox.Description")}
          onChange={handleStatus}
          options={[
            { label: t("StatusCombobox.ActiveOption"), value: "true" },
            { label: t("StatusCombobox.InactiveOption"), value: "false" },
          ]}
        />


        <button
          onClick={() => {
            const reset: UserFilter = { query: null, role: null, status: null };
            setFilters(reset);
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
