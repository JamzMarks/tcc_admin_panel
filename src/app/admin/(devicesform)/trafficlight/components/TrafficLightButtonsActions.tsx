import { ActionTableButton } from "@/components/ui/buttons/ActionsTableButton";
import { DeleteConfirmationModal } from "@/components/ui/modal/DeleteConfirmationModal";
import { DevicesClient } from "@/services/devices.service";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const TrafficLightButtonsActions = ({
  macAddress,
  id
}: {
  macAddress: string,
  id: number
}) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const t = useTranslations('Devices.TrafficLight.Table.Actions');

  async function handleDelete() {
    // await DevicesClient.
  }
  return (
    <div>
      <div className="space-x-1 space-y-1">
        <ActionTableButton
          Icon={Pencil}
          color="blue"
          onClick={() => setEditModal(true)}
          label={t('edit')}
        />
        <ActionTableButton
          Icon={Trash2}
          color="red"
          onClick={() => setDeleteModal(true)}
          label={t('delete')}
        />
      </div>

      <DeleteConfirmationModal
        resourceName="Traffic Light"
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => handleDelete()}
        confirmationText={`device/${macAddress}`}
        data={macAddress}
      />
    </div>
  );
};
