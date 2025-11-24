import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SemaforoInfoDto } from "@/types/devices/semaforo/semaforoDto.type";
import { Gauge, Layers, LineSquiggle, MapPin } from "lucide-react";

interface SemaforoLocationProps {
  semaforoinfo: SemaforoInfoDto;
}

const isEmpty = (obj: any) => !obj || Object.keys(obj).length === 0;

export const SemaforoLocation = ({ semaforoinfo }: SemaforoLocationProps) => {
  const { nodes, packs, ways } = semaforoinfo;

  return (
    <div className="space-y-6">
      {/* Localização */}
      <Card className="bg-transparent border border-border shadow-none rounded-xl">
        <CardHeader className="flex items-center gap-2 pb-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">Localização</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">
          {isEmpty(nodes) ? (
            <p className="text-muted-foreground text-sm italic">
              Não vinculado
            </p>
          ) : (
            <div className="space-y-2 pt-3 border-t border-border">
              <Field label="ID" value={nodes.id} />
              <Field label="Latitude" value={nodes.lat} />
              <Field label="Longitude" value={nodes.lon} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Packs */}
      <Card className="bg-transparent border border-border shadow-none rounded-xl">
        <CardHeader className="flex items-center gap-2 pb-2">
          <Layers className="w-4 h-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">
            Pack & SubPack
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">
          {isEmpty(packs) ? (
            <p className="text-muted-foreground italic">Não vinculado</p>
          ) : (
            <div className="space-y-2 pt-3 border-t border-border">
              <Field label="ID" value={packs.id} />
              <Field label="Nome" value={packs.name} />
              <Field label="Ciclo" value={packs.cicle} />
              <Field
                label="SubPack"
                value={
                  packs.subPacks && !isEmpty(packs.subPacks)
                    ? packs.subPacks.id
                    : "Nenhum"
                }
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ruas */}
      <Card className="bg-transparent border border-border shadow-none rounded-xl">
        <CardHeader className="flex items-center gap-2 pb-2">
          <LineSquiggle className="w-4 h-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">
            Rua Controlada
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">
          {isEmpty(ways) ? (
            <p className="text-muted-foreground italic">
              Nenhuma rua vinculada
            </p>
          ) : (
            <div className="space-y-2 pt-3 border-t border-border">
              <Field label="Nome" value={ways.name} />
              <Field label="Surface" value={ways.surface} />
              <Field label="Velocidade Máxima" value={ways.maxspeed} />
              <Field label="Highway" value={ways.highway} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const Field = ({ label, value }: { label: string; value: any }) => (
  <div className="flex gap-3">
    <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground min-w-[70px] text-center">
      {label}
    </span>
    <span className="font-medium">{value ?? "—"}</span>
  </div>
);

const FieldSmall = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: any;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center gap-2 text-xs text-muted-foreground">
    <span className="w-3 h-3">{icon}</span>
    <span>
      {label}: {value ?? "—"}
    </span>
  </div>
);
