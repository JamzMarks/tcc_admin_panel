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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DevicesClient } from "@/services/devices.service";
import { WayProperties } from "@/types/graph/sigmaGraph.type";
import { GraphClient } from "@/services/graphService.service";
import { DeviceDto } from "@/types/devices/sensors/device.type";

interface DevicesFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ways?: WayProperties[];
  nodeId: string;
}

export const DeviceFormModal = ({
  open,
  onOpenChange,
  ways = [],
  nodeId,
}: DevicesFormModalProps) => {
  const [query, setQuery] = useState("");
  const [devices, setDevices] = useState<DeviceDto[]>([]);
  const [filtered, setFiltered] = useState<DeviceDto[]>([]);
  const [selected, setSelected] = useState<DeviceDto | null>(null);

  const [selectedWay, setSelectedWay] = useState<WayProperties | null>(null);
  const [wayQuery, setWayQuery] = useState("");

  const [siblings, setSiblings] = useState<any[]>([]);
  const [selectedNeighbor, setSelectedNeighbor] = useState<any | null>(null);
  const [neighborQuery, setNeighborQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await DevicesClient.GetCameras({
        query,
        isActive: null,
      });

      setDevices(res.data);
      setFiltered(res.data);

      const siblingsRes = await GraphClient.GetNodeSiblings(nodeId);
      setSiblings(siblingsRes);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFiltered(
      devices.filter((d) =>
        d.deviceId.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, devices]);

  const handleSubmit = async () => {
    if (!selected || !selectedWay || !selectedNeighbor) return;

    try {
      await DevicesClient.LinkDispositivo({
        deviceId: selected.deviceId,
        wayId: selectedWay.wayId,
        nodeId: nodeId,
        siblingId: selectedNeighbor.elementId,
      });
    } catch (error) {
      console.error(error);
    }

    setQuery("");
    setSelected(null);
    setSelectedWay(null);
    setSelectedNeighbor(null);
    onOpenChange(false);
  };

  const getWayLabel = (w: WayProperties) => w.name || w.highway || w.wayId;

  const filteredWays = ways.filter((w) =>
    getWayLabel(w).toLowerCase().includes(wayQuery.toLowerCase())
  );

  const filteredNeighbors = siblings.filter((n) => {
    return (n.elementId || "")
      .toLowerCase()
      .includes(neighborQuery.toLowerCase());
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[350px] sm:w-[400px] p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle>Vincular Dispositivo</SheetTitle>
          <SheetDescription>
            Selecione o dispositivo, a way e o nó vizinho.
          </SheetDescription>
        </SheetHeader>

        <div className="px-4">
          <p className="font-medium text-gray-700">NodeId: {nodeId}</p>
        </div>

        <div className="p-4 flex flex-col gap-4">
          {/* SELECT DEVICE */}
          <label className="font-medium text-gray-700">
            Escolha o Dispositivo:
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full text-left">
                {selected ? selected.deviceId : "Selecione um dispositivo"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full">
              <Command>
                <CommandInput
                  placeholder="Buscar dispositivo..."
                  value={query}
                  onValueChange={setQuery}
                  className="border-b"
                />
                <CommandEmpty>Nenhum dispositivo encontrado.</CommandEmpty>
                <CommandGroup>
                  {filtered.map((d) => (
                    <CommandItem
                      key={d.deviceId}
                      onSelect={() => {
                        setSelected(d);
                        setQuery("");
                      }}
                    >
                      {d.deviceId}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          {/* SELECT WAY */}
          <label className="font-medium text-gray-700">Escolha a Way:</label>
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

          {/* SELECT NEIGHBOR NODE */}
          <label className="font-medium text-gray-700">
            Escolha o Node vizinho:
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full text-left">
                {selectedNeighbor
                  ? selectedNeighbor.elementId
                  : "Selecione um vizinho"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-full">
              <Command>
                <CommandInput
                  placeholder="Buscar node..."
                  value={neighborQuery}
                  onValueChange={setNeighborQuery}
                  className="border-b"
                />
                <CommandEmpty>Nenhum node encontrado.</CommandEmpty>

                <CommandGroup>
                  {filteredNeighbors.map((n, i) => (
                    <CommandItem
                      key={i}
                      onSelect={() => {
                        setSelectedNeighbor(n);
                        setNeighborQuery("");
                      }}
                    >
                      {n.elementId}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          {/* SUBMIT BUTTON */}
          <Button
            className="bg-primary outline-0 cursor-pointer hover:bg-orange-600"
            onClick={handleSubmit}
            disabled={!selected || !selectedWay || !selectedNeighbor}
          >
            Vincular
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
