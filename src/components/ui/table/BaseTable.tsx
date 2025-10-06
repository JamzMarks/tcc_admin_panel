import { useTranslations } from "next-intl";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

type BaseTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  loading?: boolean;
  error?: boolean;
};

export function BaseTable<T>({
  columns,
  data,
  emptyMessage = "Nenhum dado encontrado",
  loading = false,
  error = false,
}: BaseTableProps<T>) {
  const t = useTranslations("BaseTable");

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-neutral-800">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-neutral-800">
            {columns.map((col, i) => (
              <th key={i} className="p-4">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {!loading && !error && data.length > 0 && 
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-gray-100 dark:border-neutral-800"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-4">
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          }

          {/* Estado de loading */}
          {loading && (
            <tr>
              <td
                colSpan={columns.length}
                className="p-6 text-center text-gray-500"
              >
                <div className="flex items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
                  <span className="ml-2 text-sm">{t("loading")}</span>
                </div>
              </td>
            </tr>
          )}

          {/* Estado de erro */}
          {error && (
            <tr>
              <td
                colSpan={columns.length}
                className="p-6 text-center text-red-500"
              >
                {t("error")}
              </td>
            </tr>
          )}
          {!loading && !error && data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="p-6 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
