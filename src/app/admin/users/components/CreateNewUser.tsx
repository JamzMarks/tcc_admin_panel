"use client";

import { useState } from "react";
import { UserModal } from "./modals/UserModal";
import { UsersClient } from "@/services/users.service";
import { CreateUserDto } from "@/types/user/user.type";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import HttpModal from "@/components/ui/modal/HttpModal";

async function createUser(data: CreateUserDto) {
  try {
    const response = await UsersClient.CreateUser(data);
    return response;
  } catch (err: any) {
    throw new Error(err.message || "Erro desconhecido");
  }
}


export const CreateNewUser = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [httpModal, setHttpModal] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({ open: false, type: "success", message: "" });

  const handleCreateUser = async (data: CreateUserDto) => {
    try {
      await createUser(data);

      // Fecha o modal e mostra sucesso
      setModalOpen(false);
      setHttpModal({
        open: true,
        type: "success",
        message: "Usuário criado com sucesso!",
      });
    } catch (err: any) {
      // Mostra erro
      setHttpModal({
        open: true,
        type: "error",
        message: err.message || "Erro ao criar usuário.",
      });
    }
  };
  return (
    <div>
      <Button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2  text-white cursor-pointer"
      >
        <PlusCircle size={18} />
        Create new User
      </Button>
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateUser}
      />
      <HttpModal
        isOpen={httpModal.open}
        type={httpModal.type}
        message={httpModal.message}
        onClose={() => setHttpModal((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
};
