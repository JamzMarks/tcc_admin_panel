// app/packs/sections/PacksInfoSection.tsx
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { Package, Layers, Siren } from "lucide-react";

export function PacksInfoSection() {
  return (
    <SectionWithHeader
      title="Packs and Subs Infos"
      Icon={Package}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center p-6 rounded-2xl border shadow-sm">
          <Package className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-3" />
          <h3 className="font-semibold text-lg">Packs</h3>
          <p className="text-sm text-center text-gray-700 dark:text-gray-300">
            Maior agrupador. Pode conter{" "}
            <strong>semáforos diretamente</strong> ou{" "}
            <strong>Subpacks</strong>.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 rounded-2xl border shadow-sm">
          <Siren className="h-10 w-10 text-green-600 mb-3" />
          <h3 className="font-semibold text-lg">Ciclo</h3>
          <p className="text-sm text-center text-gray-700 dark:text-gray-300">
            No ciclo de um Pack, <strong>todos os semáforos</strong> ficam{" "}
            <span className="text-green-600 font-semibold">verdes</span>{" "}
            ao menos uma vez antes de reiniciar.
          </p>
        </div>

        <div className="flex flex-col items-center p-6 rounded-2xl border shadow-sm ">
          <Layers className="h-10 w-10 text-purple-600 dark:text-purple-400 mb-3" />
          <h3 className="font-semibold text-lg">Subpacks</h3>
          <p className="text-sm text-center text-gray-700 dark:text-gray-300">
            Sempre dentro de um Pack. Os semáforos ficam{" "}
            <strong>alinhados</strong>: todos{" "}
            <span className="text-green-600 font-semibold">verdes</span> ou
            todos <span className="text-red-600 font-semibold">vermelhos</span>.
          </p>
        </div>
      </div>
    </SectionWithHeader>
  );
}
