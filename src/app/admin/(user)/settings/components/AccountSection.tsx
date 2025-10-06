"use client";

import { DeleteConfirmationModal } from "@/components/ui/modal/DeleteConfirmationModal";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { User, Mail, Calendar, Key, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { UpdateEmailModal } from "./modal/UpdateEmailModal";
import { UpdatePasswordModal } from "./modal/UpdatePasswordModal";
import { useSession } from "next-auth/react";
import { get } from "http";
import { UsersClient } from "@/services/users.service";
import { UserDto } from "@/types/user/user.type";

export const AccountSection = () => {
  const t = useTranslations("Settings.AccountSection");

  const session = useSession().data?.user;
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
  async function getUser() {
    if (!session?.id) return; 
    const res = await UsersClient.GetUsersById(session.id);
    setUser(res.data);
    console.log(res.data);
  }

  getUser();
}, [session?.id]);

  const [email, setEmail] = useState("user@example.com");
  const createdAt = "2024-01-15";
  const userId = "usr_1234567890";

  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isPasswordOpen, setPasswordOpen] = useState(false);
  const [isEmailOpen, setEmailOpen] = useState(false);

  const handleDelete = () => {
    alert(t("delete.successMock"));
  };




  return (
    <SectionWithHeader title={t("title")} Icon={User}>
      {/* Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("email.label")}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{email}</p>
          <button
            onClick={() => setEmailOpen(true)}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            {t("email.changeButton")}
          </button>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("password.label")}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            **************
          </p>
          <button
            onClick={() => setPasswordOpen(true)}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            {t("password.changeButton")}
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-600 space-y-2 mt-6">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          <p>
            <span className="font-semibold">{t("metadata.userId")}:</span>{" "}
            {userId}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <p>
            <span className="font-semibold">{t("metadata.createdAt")}:</span>{" "}
            {createdAt}
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-100 mt-6">
        <button
          onClick={() => setDeleteOpen(true)}
          className="flex items-center gap-2 text-red-600 text-sm hover:underline font-medium cursor-pointer"
        >
          <Trash className="w-4 h-4" />
          {t("delete.title")}
        </button>
        <p className="text-xs text-gray-500 mt-1">{t("delete.description")}</p>
      </div>

      <UpdatePasswordModal
        isOpen={isPasswordOpen}
        onClose={() => setPasswordOpen(false)}
        onConfirm={(newPassword) => alert("Password updated: " + newPassword)}
      />

      <UpdateEmailModal
        isOpen={isEmailOpen}
        onClose={() => setEmailOpen(false)}
        onConfirm={(newEmail) => {
          setEmail(newEmail);
          alert("Email updated: " + newEmail);
        }}
      />

      <DeleteConfirmationModal
        resourceName={t("delete.resourceName")}
        data={email}
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        confirmationText={email}
        onConfirm={handleDelete}
      />
    </SectionWithHeader>
  );
};
