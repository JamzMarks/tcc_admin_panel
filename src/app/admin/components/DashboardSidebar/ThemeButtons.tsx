"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

export const ThemeButtons = () => {
  const { setTheme } = useTheme();
  const t = useTranslations("ThemeSwitcher");

  return (
    <div>
      <hr className="my-2 border-t border-gray-200 dark:border-zinc-800" />
      <div className="flex gap-4 items-center">
        <button
          onClick={() => setTheme("light")}
          aria-label={t("light")}
          className="cursor-pointer p-2 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-800 focus:outline-none transition-all"
        >
          <Sun className="text-yellow-500" />
        </button>

        <button
          onClick={() => setTheme("dark")}
          aria-label={t("dark")}
          className="cursor-pointer p-2 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-800 focus:outline-none transition-all"
        >
          <Moon className="text-gray-800 dark:text-gray-200" />
        </button>
      </div>
    </div>
  );
};
