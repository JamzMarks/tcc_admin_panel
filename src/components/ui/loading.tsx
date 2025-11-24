import { Loader2 } from "lucide-react";
import { SectionWithHeader } from "./sections/SimpleSection";

export const LoadingSection = ({ title = "Carregando..." }) => {
  return (
    <SectionWithHeader title={title}>
      <div className="flex flex-col justify-center items-center py-12 space-y-4">
        <Loader2 className="animate-spin w-12 h-12 text-primary" />
        <p className="text-lg font-medium text-muted-foreground">
          Por favor, aguarde enquanto carregamos os dados do pack...
        </p>
      </div>
    </SectionWithHeader>
  );
};
