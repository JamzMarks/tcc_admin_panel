import { ActionTableButton } from "@/components/ui/buttons/ActionsTableButton";
import { DeleteConfirmationModal } from "@/components/ui/modal/DeleteConfirmationModal";
import { DevicesClient } from "@/services/devices.service";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const TrafficLightButtonsActions = ({
  macAddress,
  id,
}: {
  macAddress: string;
  id: string;
}) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const t = useTranslations("Devices.TrafficLight.Table.Actions");

  async function handleDelete() {
    try {
      await DevicesClient.deleteTrafficLight(id);
    } catch (error) {
      console.error("Error deleting traffic light:", error);
    }
  }
  const router = useRouter();

  const goToUserPage = (id: string) => {
    router.push(`trafficlight/${id}`);
  };
  return (
    <div>
      <div className="space-x-1 space-y-1">
        <ActionTableButton
          Icon={Pencil}
          color="blue"
          onClick={() => goToUserPage(id)}
          label={t("edit")}
        />
        <ActionTableButton
          Icon={Trash2}
          color="red"
          onClick={() => setDeleteModal(true)}
          label={t("delete")}
        />
      </div>

      <DeleteConfirmationModal
        resourceName={t("resource")}
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={() => handleDelete()}
        confirmationText={`device/${macAddress}`}
        data={macAddress}
      />
    </div>
  );
};
