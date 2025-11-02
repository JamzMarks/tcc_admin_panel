import { PageTitle } from "@/components/ui/elements/PageTitle";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { Camera } from "sigma";
import { CameraTestForm } from "./components/CameraTestForm";
import { YoloTestForm } from "./components/YoloTestForm";


const DevicesPage = () => {

  return (
    <div className=" space-y-4">
      <PageTitle>
        Devices
      </PageTitle>
    <YoloTestForm />
    
     <CameraTestForm />

    </div>
  );
}

export default DevicesPage;
