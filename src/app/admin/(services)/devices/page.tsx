import { PageTitle } from "@/components/ui/elements/PageTitle";
import { YoloTestForm } from "./components/YoloTestForm";


const DevicesPage = () => {

  return (
    <div className=" space-y-4">
      <PageTitle>
        Devices
      </PageTitle>
    <YoloTestForm />
    
     {/* <CameraTestForm /> */}

    </div>
  );
}

export default DevicesPage;
