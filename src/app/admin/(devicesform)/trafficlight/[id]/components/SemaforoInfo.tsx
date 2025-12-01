"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import {
  Cpu,
  SignalHigh,
  KeyRound,
  Wifi,
  Waypoints,
} from "lucide-react";

import { useState } from "react";
import { SemaforoDto, SemaforoInfoDto } from "@/types/devices/semaforo/semaforoDto.type";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { ActionsPanel } from "./ActionsPanel";
import { InfoItem } from "./InfoItem";
import { SemaforoLocation } from "./Location";

interface Props {
  semaforoinfo: SemaforoInfoDto;
  onUpdate?: (field: keyof SemaforoDto, value: any) => void;
  onRemovePack?: () => void;
  onToggleActive?: () => void;
}

const SemaforoInfo = ({ semaforoinfo, onUpdate, onRemovePack, onToggleActive }: Props) => {
  const { semaforo } = semaforoinfo;

  return (
    <SectionWithHeader title={`Semáforo #${semaforo.id}`} Icon={Waypoints}>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Informações do Dispositivo</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wifi className="w-5 h-5" />
                <span className="font-medium">Status</span>
              </div>

              <Badge
                variant={semaforo.isActive ? "default" : "destructive"}
                className="px-3 py-1 text-xs cursor-pointer"
                onClick={onToggleActive}
              >
                {semaforo.isActive ? "Ativo" : "Inativo"}
              </Badge>
            </div>

            {/* Dados principais */}
            <InfoItem icon={<SignalHigh />} label="Device ID" value={semaforo.deviceId} disabled />
            <InfoItem icon={<Cpu />} label="MAC Address" value={semaforo.macAddress} editable onEdit={() => {}} />
            <InfoItem icon={<KeyRound />} label="Chave do Dispositivo" value={semaforo.deviceKey} editable onEdit={() => {}} hidden={true} />

            <Separator />

            <SemaforoLocation semaforoinfo={semaforoinfo}/>
            

          </CardContent>
        </div>
        <ActionsPanel/>
      </div>
    </SectionWithHeader>
  );
};

export default SemaforoInfo;
