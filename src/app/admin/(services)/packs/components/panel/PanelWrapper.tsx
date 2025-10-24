"use client";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { PackPanel } from "./PackPanel";
import SemaforoPanel from "./SemaforosPanel";
import { PackConfig } from "../PackConfig";

export const PannelWrapper = () => {
  return (
    <>
      
      <div className="space-y-4">
        <SectionWithHeader title="Pack Orchestrator">
          <div className="w-full flex gap-4">
          <SemaforoPanel></SemaforoPanel>
          <PackPanel></PackPanel>
        </div>
          
        </SectionWithHeader>
      </div>
      <div className="space-y-4">
        <SectionWithHeader title="Pack Config">
          <PackConfig />
        </SectionWithHeader>
      </div>
    </>
  );
};
