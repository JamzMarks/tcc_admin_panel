"use client";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DevicesClient } from "@/services/devices.service";
import { SemaforoDto } from "@/types/devices/semaforo/semaforoDto.type";
import { WayProperties } from "@/types/graph/sigmaGraph.type";
import { GraphClient } from "@/services/graphService.service";

interface SemaforoFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ways?: WayProperties[];
  nodeId: string;
}

export const SemaforoFormModal = ({
  open,
  onOpenChange,
  ways = [],
  nodeId,
}: SemaforoFormModalProps) => {
  const [query, setQuery] = useState("");
  const [semaforos, setSemaforos] = useState<SemaforoDto[]>([]);
  const [filtered, setFiltered] = useState<SemaforoDto[]>([]);
  const [selected, setSelected] = useState<SemaforoDto | null>(null);

  const [selectedWay, setSelectedWay] = useState<WayProperties | null>(null);
  const [wayQuery, setWayQuery] = useState("");
  useEffect(() => {
    const fetchSemaforos = async () => {
      const res = await DevicesClient.GetTrafficLight({
        query,
        isActive: null,
        pack: null,
        subPack: null,
      });
      const data = res.data;
      setSemaforos(data);
      setFiltered(data);
    };
    fetchSemaforos();
  }, []);

  useEffect(() => {
    setFiltered(
      semaforos.filter((s) =>
        s.deviceId.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, semaforos]);

  const handleSubmit = async () => {
    if (!selected || !selectedWay) return;
    try {
        await DevicesClient.LinkSemaforo({
            semaforoDeviceId: selected.deviceId,
            wayId: selectedWay.wayId,
            nodeId: nodeId
        });
    } catch (error) {
        console.error(error)
    }


    setQuery("");
    setSelected(null);
    setSelectedWay(null);
    onOpenChange(false);
  };

  const getWayLabel = (w: WayProperties) =>
    w.name || w.highway || w.wayId;

  const filteredWays = ways.filter((w) =>
    getWayLabel(w).toLowerCase().includes(wayQuery.toLowerCase())
  );
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[350px] sm:w-[400px] p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle>Vincular Semáforo</SheetTitle>
          <SheetDescription>
              Selecione um semáforo e uma way para vincular ao nó.
        </SheetDescription>
        </SheetHeader>

        <div className="px-4">
          <p className="font-medium text-gray-700">NodeId: {nodeId}</p>
        </div>

        <div className="p-4 flex flex-col gap-4">

          <label className="font-medium text-gray-700">
            Escolha o Semáforo:
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full text-left">
                {selected ? selected.deviceId : "Selecione um semáforo"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full">
              <Command>
                <CommandInput
                  placeholder="Buscar semáforo..."
                  value={query}
                  onValueChange={setQuery}
                  className="border-b"
                />
                <CommandEmpty>Nenhum semáforo encontrado.</CommandEmpty>
                <CommandGroup>
                  {filtered.map((s) => (
                    <CommandItem
                      key={s.id}
                      onSelect={() => {
                        setSelected(s);
                        setQuery("");
                      }}
                    >
                      {s.deviceId}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <label className="font-medium text-gray-700">
            Escolha a Way:
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full text-left">
                {selectedWay ? getWayLabel(selectedWay) : "Selecione uma Way"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full">
              <Command>
                <CommandInput
                  placeholder="Buscar way..."
                  value={wayQuery}
                  onValueChange={setWayQuery}
                  className="border-b"
                />
                <CommandEmpty>Nenhuma way encontrada.</CommandEmpty>
                <CommandGroup>
                  {filteredWays.map((w, i) => (
                    <CommandItem
                      key={i}
                      onSelect={() => {
                        setSelectedWay(w);
                        setWayQuery("");
                      }}
                    >
                      {getWayLabel(w)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <Button
            className="bg-primary outline-0 cursor-pointer hover:bg-orange-600"
            onClick={handleSubmit}
            disabled={!selected || !selectedWay}
          >
            Vincular
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
