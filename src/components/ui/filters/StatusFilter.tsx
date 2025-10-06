import { useTranslations } from "next-intl";
import { SimpleComboBox } from "../combo/SimpleComboBox";

interface StatusFilterProps<T> {
  resource: string;
  description: string;
  filters: T;
  setFilters: (filters: T) => void;
  field?: keyof T;
}

export const StatusFilter = <T extends object>({
  resource,
  description,
  filters,
  setFilters,
  field = "status" as keyof T,
}: StatusFilterProps<T>) => {
  const t = useTranslations("CommonFilters.StatusFilter");

  const handleChange = (value: string) => {
    const parsedValue = value === "true" ? true : value === "false" ? false : null;
    const newFilters = { ...filters, [field]: parsedValue };
    setFilters(newFilters);
  };

  return (
    <SimpleComboBox
      placeholder={t("Placeholder")}
      resource={resource}
      description={description}
      onChange={handleChange}
      options={[
        { label: t("ActiveOption"), value: "true" },
        { label: t("InactiveOption"), value: "false" },
      ]}
    />
  );
};
