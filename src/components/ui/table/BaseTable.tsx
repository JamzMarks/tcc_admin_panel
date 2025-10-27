"use client";
import { useTranslations } from "next-intl";
import React from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

type PaginationProps = {
  total: number | null | undefined;
  page: number | null | undefined;
  limit: number | null | undefined;
  onPageChange: (page: number) => void;
};

type BaseTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  loading?: boolean;
  error?: boolean;

  pagination?: PaginationProps;
};

export function BaseTable<T>({
  columns,
  data,
  emptyMessage = "Nenhum dado encontrado",
  loading = false,
  error = false,
  pagination,
}: BaseTableProps<T>) {
  const t = useTranslations("BaseTable");

  const hasValidPagination =
    pagination &&
    typeof pagination.total === "number" &&
    typeof pagination.page === "number" &&
    typeof pagination.limit === "number" &&
    pagination.total > 0 &&
    pagination.limit > 0;

  const totalPages =
  hasValidPagination && pagination
    ? Math.ceil(
        (pagination.total as number) / (pagination.limit as number)
      )
    : 0;

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
          {!loading &&
            !error &&
            data.length > 0 &&
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
            ))}

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

  
      {hasValidPagination && totalPages > 1 && (
        <div className="flex justify-between items-center gap-2 p-4 border-t border-gray-200">
          <div>
          <p>Total: <span>{pagination.total}</span></p>
            <p></p>
          </div>
          <div className="flex items-center gap-2">

          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => pagination.onPageChange(page)}
              className={`cursor-pointer w-7 h-7 flex items-center justify-center rounded-full text-sm transition-colors ${
                pagination.page === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              }`}
            >
              {page}
            </button>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}
