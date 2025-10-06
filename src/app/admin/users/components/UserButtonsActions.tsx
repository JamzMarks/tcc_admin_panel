"use client";

import { UserButtonActions } from "@/components/ui/buttons/SimpleButton";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { UserModal } from "./modals/UserModal";
import { useTranslations } from "next-intl";
import { DeleteConfirmationModal } from "@/components/ui/modal/DeleteConfirmationModal";
import { UsersClient } from "@/services/users.service";

export const UserButtonsActions = ({ userEmail, id }: { userEmail: string, id: string }) => {
  const t = useTranslations('UsersPage')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

 async function  handleConfirm() {
    const teste = await UsersClient.DeleteUser(id);
    console.log(teste)
  }

  return (
    <div className="space-x-1">
      <UserButtonActions Icon={Pencil} color="blue" 
        onClick={() => setIsUserModalOpen(true)}
      />
      <UserButtonActions
        Icon={Trash2}
        color="red"
        onClick={() => setIsDeleteModalOpen(true)}
      />

      {/* <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSubmit={(data) => console.log(data)}
      /> */}
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
