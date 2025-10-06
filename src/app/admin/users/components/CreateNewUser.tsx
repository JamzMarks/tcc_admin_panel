"use client";

import { useState } from "react";
import { UserModal } from "./modals/UserModal";
import { UsersClient } from "@/services/users.service";
import { CreateUserDto } from "@/types/user/user.type";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const CreateNewUser = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (data: CreateUserDto) => {
    try {
      await UsersClient.CreateUser(data);
    } catch (error) {
      console.log(error);
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
        onSubmit={handleSubmit}
      />
    </div>
  );
};
