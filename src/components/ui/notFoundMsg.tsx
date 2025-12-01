
import { AlertCircle } from "lucide-react";
import { SectionWithHeader, SectionWithHeaderProps } from "./sections/SimpleSection";

interface NotFoundSectionProps extends Partial<Omit<SectionWithHeaderProps, "title" | "Icon">> {
  title?: string;
  message?: string;
}

export const NotFoundSection = ({
  title = "404 - Não encontrado",
  message = "O conteúdo que você está procurando não existe.",
  className,
  children,
}: NotFoundSectionProps) => {
  return (
    <SectionWithHeader
      title={title}
      Icon={AlertCircle}
      className={`border-red-400 bg-red-50  ${className || ""}`}
    >
      <div className="flex flex-col justify-center items-center py-8 space-y-4 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 dark:text-red-400" />
        <p className="text-lg font-semibold">{message}</p>
        {children && <div className="mt-2">{children}</div>}
      </div>
    </SectionWithHeader>
  );
};
