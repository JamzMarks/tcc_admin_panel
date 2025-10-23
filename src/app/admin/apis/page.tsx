import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import MSServices from "./components/Services";
import { PageTitle } from "@/components/ui/elements/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, GitBranch, Terminal, FileCode2, SquareChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SumoService } from "./components/SumoService";
import { DatabasesService } from "./components/Databases";

const ApisPage = () => {
  const t = useTranslations('Apis')
  return (
    <div className="w-full space-y-4">
      <PageTitle>{t('title')}</PageTitle>
      <SectionWithHeader title={t('sectionTitle')} Icon={SquareChevronRight}>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t.rich('sectionDescription', {
            strong: (chunks) => <strong className="font-semibold">{chunks}</strong>,
          })}
        </p>
      </SectionWithHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition dark:bg-foreground-dark">
          <CardHeader>
            <BookOpen className="h-6 w-6 text-blue-500 mb-2" />
            <CardTitle>{t('swagger.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 dark:text-gray-300">
            {t('swagger.description')}
            <div className="mt-4">
              <Button variant="outline" asChild>
                <a href="/api-docs" target="_blank">{t('swagger.button')}</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition dark:bg-foreground-dark">
          <CardHeader>
            <GitBranch className="h-6 w-6 text-green-500 mb-2" />
            <CardTitle>{t('repositories.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 dark:text-gray-300">
            {t('repositories.description')}
            <div className="mt-4">
              <Button variant="outline" asChild>
                <a href="https://github.com/JamzMarks/tailfox" target="_blank">{t('repositories.button')}</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition dark:bg-foreground-dark">
          <CardHeader>
            <Terminal className="h-6 w-6 text-purple-500 mb-2" />
            <CardTitle>{t('scripts.title')}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-600 dark:text-gray-300">
            {t('scripts.description')}
            <ul className="list-disc pl-4 mt-2 space-y-1">
              <li><FileCode2 className="inline h-4 w-4 mr-1" /> Setup & Deploy</li>
              <li><FileCode2 className="inline h-4 w-4 mr-1" /> DB Migration</li>
              <li><FileCode2 className="inline h-4 w-4 mr-1" /> Monitoring</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <MSServices />
      <DatabasesService/>
      <SumoService/>
    </div>
  );
};

export default ApisPage;
