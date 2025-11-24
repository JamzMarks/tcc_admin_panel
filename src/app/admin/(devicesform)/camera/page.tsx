import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { CameraForm } from "./components/modal/CameraForm";
import CamerasTable from "./components/CameraTable";
import { PageTitle } from "@/components/ui/elements/PageTitle";
import { List, PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { CreateNewCamera } from "./components/modal/CreateNewCamera";

const CameraPage = () => {
  const t = useTranslations("");
  return (
    <div className="space-y-4">
      <PageTitle>Camera</PageTitle>
      <SectionWithHeader title="Yolo Camera Infos" Icon={PlusCircle}>
        <div className="space-y-4">
          <p>
            Device ID is the identifier in Azure IoT Hub and must be unique,
            recommend to set it with microregion prefix.
          </p>
          <p>
            IP address can change eventually, so this field is commonly updated.
          </p>

          <CreateNewCamera />
        </div>
      </SectionWithHeader>
      <SectionWithHeader title="Registered Cameras" Icon={List}>
        <CamerasTable />
      </SectionWithHeader>
    </div>
  );
};

export default CameraPage;
