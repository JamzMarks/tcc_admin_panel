// app/packs/sections/PacksTableSection.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { BaseTable } from "@/components/ui/table/BaseTable";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";

type Pack = {
  id: string;
  name: string;
  type: "pack" | "subpack";
  items: number;
};

const mockData: Pack[] = [
  { id: "1", name: "Pack Central", type: "pack", items: 3 },
  { id: "2", name: "Subpack Zona Norte", type: "subpack", items: 5 },
];

export function PacksTableSection() {
  const [selectedTab, setSelectedTab] = useState<"packs" | "subpacks">("packs");

  return (
    <SectionWithHeader title="Packs and Subs Table">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Choose between them</h2>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create {selectedTab === "packs" ? "Pack" : "Subpack"}
        </Button>
      </div>

      <Tabs
        defaultValue="packs"
        onValueChange={(v) => setSelectedTab(v as "packs" | "subpacks")}
      >
        <TabsList>
          <TabsTrigger value="packs">Packs</TabsTrigger>
          <TabsTrigger value="subpacks">Subpacks</TabsTrigger>
        </TabsList>

        <TabsContent value="packs">
          <BaseTable
            columns={[
              { key: "name", label: "Name" },
              { key: "items", label: "Items" },
            ]}
            data={mockData.filter((d) => d.type === "pack")}
          />
        </TabsContent>

        <TabsContent value="subpacks">
          <BaseTable
            columns={[
              { key: "name", label: "Name" },
              { key: "items", label: "Semaphores" },
            ]}
            data={mockData.filter((d) => d.type === "subpack")}
          />
        </TabsContent>
      </Tabs>
    </SectionWithHeader>
  );
}
