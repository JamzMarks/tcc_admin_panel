import { useTranslations } from "next-intl";

export const StatusBadge = ({ status }: { status: boolean }) => {
  const t = useTranslations('Badge.Status');

  const colors = {
    true: "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-100",
    false: "bg-red-100 text-red-600 dark:bg-red-800 dark:text-red-100",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        status ? colors.true : colors.false
      }`}
    >
      {status ? t('active') : t('inactive')}
    </span>
  );
};
