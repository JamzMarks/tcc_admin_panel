import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { PageTitle } from "@/components/ui/elements/PageTitle";
import { GraphWrapper } from "./components/GraphWrapper";


const GraphPage = () => {
  return (
    <div className="space-y-4">
        <PageTitle>Graph Map</PageTitle>
        <SectionWithHeader title="Graph Map">
            <GraphWrapper/>
        </SectionWithHeader>
    </div>
  )
};

export default GraphPage;
