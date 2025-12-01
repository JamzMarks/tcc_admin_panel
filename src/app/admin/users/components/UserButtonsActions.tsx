"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import { useTranslations } from "next-intl";
import { DeleteConfirmationModal } from "@/components/ui/modal/DeleteConfirmationModal";
import { UsersClient } from "@/services/users.service";
import { ActionTableButton } from "@/components/ui/buttons/ActionsTableButton";
import { useRouter } from "next/navigation";

export const UserButtonsActions = ({ userEmail, id }: { userEmail: string, id: string }) => {
  const t = useTranslations('UsersPage')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


 async function  handleConfirm() {
    const teste = await UsersClient.DeleteUser(id);
    console.log(teste)
  }
  const router = useRouter();

  const goToUserPage = (id: string) => {
    router.push(`users/${id}`);
  };
  return (
    <div className="space-x-1">
      <ActionTableButton
          Icon={Pencil}
          color="blue"
          onClick={() => goToUserPage(id)}
          label={t("UserTable.Actions.edit")}
        />
        <ActionTableButton
          Icon={Trash2}
          color="red"
          onClick={() => setIsDeleteModalOpen(true)}
          label={t("UserTable.Actions.delete")}
        />

      <DeleteConfirmationModal
        resourceName={t('resource')}
        confirmationText={t('UserTable.delete')}
        data={userEmail}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};


