"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { BaseTable } from "@/components/ui/table/BaseTable";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import Link from "next/link";
import { PackClient } from "@/services/pack.service";
import { Pack } from "@/types/pack/pack.dto";
import { PackActions } from "./PackActions";


export function PacksTableSection() {

  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPacks() {
      try {
        const res = await PackClient.GetPacks() 

        setPacks(res.data);
      } catch (err) {
        console.error("Error fetching packs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPacks();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <SectionWithHeader title="Packs and SubPacks Table">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Choose between them</h2>
        <Button>
          <Link href="/admin/packs/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Pack
          </Link>
        </Button>
      </div>
      <BaseTable
            columns={[
              { key: "name", label: "Name" },
              { key: "cicle", label: "Cicle" },
              {
                key: "actions",
                label: "Actions",
                render: (p) => (
                  <PackActions name={p.name} id={p.id} />
                ),
              },
            ]}
            data={packs}
          />
    </SectionWithHeader>
  );
}
