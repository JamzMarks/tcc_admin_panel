import { useTranslations } from "next-intl";

export const StatusBadge = ({ status }: { status?: boolean }) => {
  const t = useTranslations("Badge.Status");

  const colors = {
    true: "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-100",
    false: "bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-100",
    undefined: "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-100",
  };

  const text = status === undefined ? t("unknown") : status ? t("active") : t("inactive");

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        colors[String(status) as keyof typeof colors]
      }`}
    >
      {text}
    </span>
  );
};
