"use client";

import { SimpleComboBox } from "@/components/ui/combo/SimpleComboBox";
import { StatusFilter } from "@/components/ui/filters/StatusFilter";
import { Input } from "@/components/ui/input";
import { Roles } from "@/types/user/roles.type";
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
    isActive: null,
  });

  const handleChange = (
    key: keyof UserFilter,
    value: string | boolean | null
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const userRoles = Object.entries(Roles).map(([key, value]) => ({
    label: t(`RolesCombobox.Roles.${key}`),
    value,
  }));

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
          onChange={(e) => handleChange("role", e)}
          options={userRoles}
        />

        <StatusFilter
          description={t("StatusCombobox.Description")}
          filters={filters}
          resource={t("StatusCombobox.Resource")}
          setFilters={setFilters}
          field={"isActive"} 
        />


        <button
          onClick={() => {
            const reset: UserFilter = { query: null, role: null, isActive: null };
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
