"use client";

import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { DevicesClient } from "@/services/devices.service";

import { useEffect, useState } from "react";
import SemaforoInfo from "./components/SemaforoInfo";

import SemaforoListener from "./components/SemaforoListener";

import { useParams } from "next/navigation";
import { SemaforoInfoDto } from "@/types/devices/semaforo/semaforoDto.type";
import { MapPin } from "lucide-react";
import { CommandMessage } from "@/types/devices/semaforo/command.type";
import { SemaforoStatus } from "./components/SemaforoStatus";

const SemaforoPage = () => {
  const { id } = useParams();

  const [semaforo, setSemaforo] = useState<SemaforoInfoDto | null>(null);
  const [status, setStatus] = useState<CommandMessage | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await DevicesClient.GetTrafficLightById(id as string);
      setSemaforo(res.data);
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    console.log("Pai recebeu novo status:", status);
  }, [status]);


  return (
    <div className="space-y-4">
      {semaforo && <SemaforoInfo semaforoinfo={semaforo} />}

      <SectionWithHeader title="Listener de Status" Icon={MapPin}>
        <div className="space-y-6 grid grid-cols-1 md:grid-cols-[300px_1fr] items-center">
          <SemaforoStatus status={status} />
          {semaforo && (
            <div className=" gap-4">
              <SemaforoListener
                semaforoId={semaforo.semaforo.deviceId}
                onUpdateStatus={setStatus}
              />
            </div>
          )}
        </div>
      </SectionWithHeader>
    </div>
  );
};

export default SemaforoPage;
