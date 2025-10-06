import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { TrafficLightForm } from "./components/modal/TrafficLightForm";
import TrafficLightTable from "./components/TrafficLightTable";
import { PageTitle } from "@/components/ui/elements/PageTitle";
import { PlusCircle, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateTrafficLight } from "./components/modal/CreateTrafficLight";

const TrafficLightPage = () => {
  return (
    <div className="space-y-4">
      <PageTitle>Traffic Light</PageTitle>

      <SectionWithHeader title="Traffic Light Infos" Icon={PlusCircle}>
      <div className="space-y-4">
        <p>
          Device ID is the identifier in Azure IoT Hub and must be unique,
          recommend to set it with microregion prefix.
        </p>
        <p>
          IP address can change eventually, so this field is commonly updated.
        </p>

        <CreateTrafficLight />
      </div>
    </SectionWithHeader>

      <SectionWithHeader title="Registered Traffic Lights" Icon={List}>
        <TrafficLightTable />
      </SectionWithHeader>
    </div>
  );
};

export default TrafficLightPage;
