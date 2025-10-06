import { DeleteConfirmationModal } from "@/components/ui/modal/DeleteConfirmationModal"
import { useTranslations } from "next-intl";
import { useState } from "react"

export const CameraButtonsActions = ({ macAddress }: { macAddress: string }) => {
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const t = useTranslations('Devices.Camera')
    return (
        <div>
            <div  className="space-x-1">
                <button>
                    {macAddress}
                </button>
            </div>
            <DeleteConfirmationModal
                resourceName={t('resource')}
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                onConfirm={() => console.log('')}
                confirmationText={`device/${macAddress}`}
                data={macAddress}
            />
        </div>
    )
}