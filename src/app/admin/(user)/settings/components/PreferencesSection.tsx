"use client";

import { Button } from "@/components/ui/button";
import { SimpleComboBox } from "@/components/ui/combo/SimpleComboBox";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { Cog, Languages, Monitor } from "lucide-react";
import { useState } from "react";

export const PreferencesSection = () => {
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("LIGHT");

  return (
    <SectionWithHeader title="Preferences" Icon={Cog}>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className=" rounded-2xl ">
            <div className="flex items-center gap-2 mb-3">
              <Languages className="w-5 h-5 text-primary" />
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                Language
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Choose the language you prefer to use across the platform.
            </p>
            <SimpleComboBox
              description="Select language"
              resource="Language"
              placeholder="Select a preferred language..."
              options={[
                { value: "PT", label: "Portuguese" },
                { value: "EN", label: "English" },
                { value: "ES", label: "Spanish" },
              ]}
              onChange={() => console.log("change")}
            />
          </div>

          <div className="rounded-2xl ">
            <div className="flex items-center gap-2 mb-3">
              <Monitor className="w-5 h-5 text-primary" />
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                Theme
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Switch between light and dark mode for a personalized experience.
            </p>
            <SimpleComboBox
              description="Select theme"
              resource="Theme"
              placeholder="Select a preferred theme..."
              options={[
                { value: "LIGHT", label: "Light" },
                { value: "DARK", label: "Dark" },
              ]}
              onChange={() => console.log("change")}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl ">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100 flex items-center gap-2">
              <Cog className="w-5 h-5 text-gray-500" />
              Current Preferences
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Selected language:{" "}
              <strong className="text-gray-800 dark:text-gray-100">
                {language}
              </strong>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Selected theme:{" "}
              <strong className="text-gray-800 dark:text-gray-100">
                {theme}
              </strong>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your preferences are saved locally and can be updated anytime.
            </p>
          </div>
          <div className="pt-6">
            <Button
              className="w-full rounded-xl text-white max-w-40"
              onClick={() => alert("Preferences saved!")}
            >
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </SectionWithHeader>
  );
};
