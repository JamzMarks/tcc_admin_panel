import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Command,
  KeyRound,
  Link2Off,
  Pencil,
  Trash2,
  Wifi,
} from "lucide-react";
import { DeleteConfirmationModal } from "@/components/ui/modal/DeleteConfirmationModal";
import { Separator } from "@/components/ui/separator";

export const ActionsPanel = () => {
  // Modal States

  const [deleteModal, setDeleteModal] = useState(false);
  const [removePackModal, setRemovePackModal] = useState(false);
  const [editMacModal, setEditMacModal] = useState(false);
  const [updateKeyModal, setUpdateKeyModal] = useState(false);

  // Simulação de dado
  const macAddress = "AA:BB:CC:DD:EE:FF";

  // Handlers
  const handleToggleActive = () => {
    console.log("Ativar/Desativar semáforo");
  };

  const handleEditMac = () => {
    console.log("Editar MAC Address");
    setEditMacModal(true);
  };

  const handleUpdateKey = () => {
    console.log("Atualizar DeviceKey");
    setUpdateKeyModal(true);
  };

  const handleRemovePack = () => {
    console.log("Remover vínculo do Pack");
    setRemovePackModal(true);
  };

  const handleDeleteSemaforo = () => {
    console.log("Excluir semáforo");
    setDeleteModal(true);
  };

  return (
    <>
      {/* Painel */}
      <Card className="p-5 rounded-xl border border-border gap-1">
        <CardTitle className="text-base font-semibold mb-2 flex items-center gap-2">
          <Command className="w-4 h-4 text-muted-foreground" />
          Ações
        </CardTitle>
        <div className="space-y-4">
          <Separator></Separator>
          {/* Grupo principal */}
          <div className="space-y-3">
            <Button
              className="w-full justify-start gap-2"
              variant="default"
              onClick={handleToggleActive}
            >
              <Wifi className="w-4 h-4" />
              <span>Ativar / Desativar</span>
            </Button>

            <Button
              className="w-full justify-start gap-2"
              onClick={handleEditMac}
              variant="outline"
            >
              <Pencil className="w-4 h-4" />
              <span>Editar MAC Address</span>
            </Button>

            <Button
              className="w-full justify-start gap-2"
              variant="outline"
              onClick={handleUpdateKey}
            >
              <KeyRound className="w-4 h-4" />
              <span>Atualizar DeviceKey</span>
            </Button>
          </div>

          {/* Divisor elegante */}
          <div className="border-t border-border" />

          {/* Ações destrutivas */}
          <div className="space-y-3">
            <Button
              className="w-full justify-start gap-2"
              variant="destructive"
              onClick={handleRemovePack}
            >
              <Link2Off className="w-4 h-4" />
              <span>Remover vínculo Pack</span>
            </Button>

            <Button
              className="w-full justify-start gap-2"
              variant="destructive"
              onClick={handleDeleteSemaforo}
            >
              <Trash2 className="w-4 h-4" />
              <span>Excluir Semáforo</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Excluir Semáforo */}
      <DeleteConfirmationModal
        resourceName="Semáforo"
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => {
          console.log("Confirmado: excluir semáforo");
          setDeleteModal(false);
        }}
        confirmationText={`device/${macAddress}`}
        data={macAddress}
      />

      {/* Remover vínculo Pack */}
      <DeleteConfirmationModal
        resourceName="Vínculo do Pack"
        isOpen={removePackModal}
        onClose={() => setRemovePackModal(false)}
        onConfirm={() => {
          console.log("Confirmado: remover vínculo do Pack");
          setRemovePackModal(false);
        }}
        confirmationText={`pack/${macAddress}`}
        data={macAddress}
      />

      {/* Editar MAC Address */}
      <DeleteConfirmationModal
        resourceName="Editar MAC Address"
        isOpen={editMacModal}
        onClose={() => setEditMacModal(false)}
        onConfirm={() => {
          console.log("Confirmado: atualizar MAC");
          setEditMacModal(false);
        }}
        confirmationText={`novo-mac`}
        data={macAddress}
      />

      {/* Atualizar DeviceKey */}
      <DeleteConfirmationModal
        resourceName="Atualizar DeviceKey"
        isOpen={updateKeyModal}
        onClose={() => setUpdateKeyModal(false)}
        onConfirm={() => {
          console.log("Confirmado: atualizar DeviceKey");
          setUpdateKeyModal(false);
        }}
        confirmationText={`device-key`}
        data={macAddress}
      />
    </>
  );
};
