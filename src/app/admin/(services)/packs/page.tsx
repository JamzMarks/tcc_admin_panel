import { PageTitle } from "@/components/ui/elements/PageTitle";
import { PacksInfoSection } from "./components/PacksInfo";
import { PacksTableSection } from "./components/PacksTable";


export default function PackPage() {

  return (
    <div className="space-y-4">
      <PageTitle>Pack Manager</PageTitle>
      <PacksInfoSection/>
          
      <PacksTableSection/>
    </div>
  );
}
