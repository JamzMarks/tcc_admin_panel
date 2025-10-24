"use client";

import { Button } from "@/components/ui/button";
import { SimpleComboBox } from "@/components/ui/combo/SimpleComboBox";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { Cog, Languages, Monitor } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Language, Theme, UpdateUserConfigDto, UserConfigDto } from "@/types/user/config/user-config.dto";
import { useEffect, useState } from "react";
import { UsersConfigClient } from "@/services/usersConfig.service";

export const PreferencesSection = () => {
  const t = useTranslations("Settings.PreferencesSection");
  const [myConfigs, setMyConfigs] = useState<UserConfigDto | null>(null);

  const { handleSubmit, control, watch, reset } = useForm<UpdateUserConfigDto>({
    defaultValues: {
      userId: "",
      language: Language.EN,
      theme: Theme.LIGHT,
    },
  });

  const currentValues = watch();

  useEffect(() => {
    const getPreferences = async () => {
      try {
        const res = await UsersConfigClient.GetMyConfigs();
        if (res?.data) {
          setMyConfigs(res.data);
          reset({
            userId: res.data.userId,
            language: res.data.language ?? "EN",
            theme: res.data.theme ?? "LIGHT",
          });
        }
      } catch (err) {
        console.error("Error fetching user preferences:", err);
      }
    };
    getPreferences();
  }, [reset]);

  const onSubmit = async (data: UpdateUserConfigDto) => {
    try {
      await UsersConfigClient.UpdateUserConfig(data);

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <SectionWithHeader title={t("title")} Icon={Cog}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          {/* Language Selector */}
          <div className="rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Languages className="w-5 h-5 text-primary" />
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                {t("language")}
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {t("languageDescription")}
            </p>
            <Controller
              control={control}
              name="language"
              render={({ field }) => (
                <SimpleComboBox
                  {...field}
                  description={t("languageInputDescription")}
                  resource="Language"
                  placeholder={t("languagePlaceholder")}
                  options={[
                    { value: "PTBR", label: "Portuguese" },
                    { value: "EN", label: "English" },
                    { value: "ES", label: "Spanish" },
                  ]}
                />
              )}
            />
          </div>

          {/* Theme Selector */}
          <div className="rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Monitor className="w-5 h-5 text-primary" />
              <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                {t("theme")}
              </h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {t("themeDescription")}
            </p>
            <Controller
              control={control}
              name="theme"
              render={({ field }) => (
                <SimpleComboBox
                  {...field}
                  description={t("themeInputDescription")}
                  resource="Theme"
                  placeholder={t("themePlaceholder")}
                  options={[
                    { value: "LIGHT", label: "Light" },
                    { value: "DARK", label: "Dark" },
                  ]}
                />
              )}
            />
          </div>
        </div>

        {/* Current Preferences Panel */}
        <div className="flex flex-col justify-between rounded-2xl">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100 flex items-center gap-2">
              <Cog className="w-5 h-5 text-gray-500" />
              {t("currentPreferences")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("selectedLanguage")}:{" "}
              <strong className="text-gray-800 dark:text-gray-100">{currentValues.language}</strong>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("selectedTheme")}:{" "}
              <strong className="text-gray-800 dark:text-gray-100">{currentValues.theme}</strong>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t("note")}</p>
          </div>
          <div className="pt-6">
            <Button type="submit" className="w-full rounded-xl text-white max-w-40">
              {t("saveButton")}
            </Button>
          </div>
        </div>
      </form>
    </SectionWithHeader>
  );
};
