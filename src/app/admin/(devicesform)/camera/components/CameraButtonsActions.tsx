import { DeleteConfirmationModal } from "@/components/ui/modal/DeleteConfirmationModal";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ActionTableButton } from "@/components/ui/buttons/ActionsTableButton";
import { Pencil, Trash2 } from "lucide-react";

export const CameraButtonsActions = ({
  macAddress,
}: {
  macAddress: string;
}) => {
  const t = useTranslations("Devices.Camera");
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  return (
    <div>
      <div className="space-x-1 space-y-1">
        <ActionTableButton
          Icon={Pencil}
          color="blue"
          onClick={() => setEditModal(true)}
          label={t("Table.Actions.edit")}
        />
        <ActionTableButton
          Icon={Trash2}
          color="red"
          onClick={() => setDeleteModal(true)}
          label={t("Table.Actions.delete")}
        />
      </div>
      <DeleteConfirmationModal
        resourceName={t("resource")}
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => console.log("")}
        confirmationText={`device/${macAddress}`}
        data={macAddress}
      />
    </div>
  );
};
