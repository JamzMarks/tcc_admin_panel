"use client";

import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { PageTitle } from "@/components/ui/elements/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

import {
  Server,
  Layers,
  TerminalSquare,
  Play,
  SquareChevronRight,
  RefreshCw,
  BugPlay,
} from "lucide-react";
import Link from "next/link";

const ContainersPage = () => {
  const t = useTranslations("Containers");

  return (
    <div className="w-full space-y-4">
      <PageTitle>{t("title")}</PageTitle>

      <SectionWithHeader title={t("sectionTitle")} Icon={SquareChevronRight}>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t.rich("sectionDescription", {
            strong: (chunks) => <strong className="font-semibold">{chunks}</strong>,
          })}
        </p>
      </SectionWithHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Containers ativos */}
        <Card className="hover:shadow-lg transition dark:bg-foreground-dark">
          <CardHeader>
            <Server className="h-6 w-6 text-blue-500 mb-2" />
            <CardTitle>{t("containers.title")}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 dark:text-gray-300">
            {t("containers.description")}
            <div className="mt-4 flex gap-2">
              <Button variant="outline" asChild>
                <Link href="admin/containers/list">{t("containers.button")}</Link>
              </Button>
              <Button variant="secondary" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Imagens docker */}
        <Card className="hover:shadow-lg transition dark:bg-foreground-dark">
          <CardHeader>
            <Layers className="h-6 w-6 text-orange-500 mb-2" />
            <CardTitle>{t("images.title")}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 dark:text-gray-300">
            {t("images.description")}
            <div className="mt-4">
              <Button variant="outline" asChild>
                <Link href="containers/images">{t("images.button")}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comandos rápidos */}
        <Card className="hover:shadow-lg transition dark:bg-foreground-dark">
          <CardHeader>
            <TerminalSquare className="h-6 w-6 text-purple-500 mb-2" />
            <CardTitle>{t("quickActions.title")}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 dark:text-gray-300">
            {t("quickActions.description")}
            <ul className="list-disc pl-4 mt-2 space-y-1">
              <li>docker ps</li>
              <li>docker images</li>
              <li>docker logs</li>
              <li>docker stats</li>
            </ul>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4" /> {t("quickActions.run")}
              </Button>
              <Button variant="outline" size="sm">
                <BugPlay className="h-4 w-4" /> {t("quickActions.debug")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContainersPage;
