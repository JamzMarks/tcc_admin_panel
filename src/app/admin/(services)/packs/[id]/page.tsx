"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PageTitle } from "@/components/ui/elements/PageTitle";
import { PackClient } from "@/services/pack.service";
import { PackWithInfos } from "@/types/pack/pack.dto";
import { NotFoundSection } from "@/components/ui/notFoundMsg";
import { LoadingSection } from "@/components/ui/loading";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";


export default function PackPage() {
  const params = useParams();
  const { id } = params;
  const [pack, setPack] = useState<PackWithInfos | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPack() {
      try {
        const res = await PackClient.GetPack(id as string);
        setPack(res.data);
      } catch (err) {
        console.error("Erro ao buscar pack:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPack();
    }
  }, [id]);

  if (loading) return <LoadingSection />;
  if (!pack)
    return (
      <NotFoundSection
        message="O pack que você está procurando não existe."
        title="404"
      />
    );

  return (
    <div className="space-y-6">
      <PageTitle>Pack Manager: {pack.name}</PageTitle>

      {/* Seção de Informações do Pack */}
      <SectionWithHeader title="Informações do Pack">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><strong>ID:</strong> {pack.packId}</p>
          <p><strong>Ciclo:</strong> {pack.cicle}</p>
          <p><strong>Semáforos:</strong> {pack.semaforos.join(", ")}</p>
        </div>
      </SectionWithHeader>

      {/* Seção de Subpacks */}
      {pack.subpacks.length > 0 && (
        <SectionWithHeader title="Subpacks">
          <div className="space-y-4">
            {pack.subpacks.map((sp) => (
              <SectionWithHeader
                key={sp.subpackId}
                title={`Subpack: ${sp.subpackId}`}
                className="bg-secondary/10 dark:bg-secondary/20"
              >
                <p className="text-sm text-muted-foreground">
                  <strong>Semáforos:</strong> {sp.semaforos.join(", ")}
                </p>
              </SectionWithHeader>
            ))}
          </div>
        </SectionWithHeader>
      )}
    </div>
  );
}
