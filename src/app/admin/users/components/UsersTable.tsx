"use client";
import { User as UserIcon } from "lucide-react";
import Image from "next/image";
import { UserButtonsActions } from "./UserButtonsActions";
import { useEffect, useState } from "react";
import { UsersClient } from "@/services/users.service";
import { User, UserDto } from "@/types/user/user.type";
import { useFormatter, useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { UserFilters } from "./UsersFilters";
import { UserFilter } from "@/types/user/user-filters.type";
import { BaseTable } from "@/components/ui/table/BaseTable";
import { StatusBadge } from "@/components/ui/badge/StatusBadge";



export default function UsersTable() {
  const t = useTranslations("UsersPage");
  const format = useFormatter();
  const [filters, setFilters] = useState<UserFilter>({
    query: null,
    role: null,
    status: null,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", filters],
    queryFn: () => UsersClient.GetUsers(filters)    
  });

  const users: UserDto[] = data?.data ?? [];
  return (
    <div className="space-y-4">
      <UserFilters onFilter={setFilters} />
      <BaseTable<UserDto>
        columns={[
          {
            key: "user",
            label: t("UserTable.user"),
            render: (u) => <UserAvatarTable u={u} />,
          },
          {
            key: "role",
            label: t("UserTable.role"),
            render: (u) => t(`Roles.${u.role}`),
          },
          { key: "email", label: t("UserTable.email") },
          {
            key: "createdAt",
            label: t("UserTable.createdAt"),
            render: (s) =>
              s.createdAt ? (
                format.dateTime(new Date(s.createdAt), {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              ) : (
                <p className="text-sm">{t("Table.dateNot")}</p>
              ),
          },
          {
            key: "status",
            label: t("UserTable.status"),
            render: (u) => <StatusBadge status={u.isActive} />,
          },
          {
            key: "actions",
            label: t("UserTable.actions"),
            render: (u) => <UserButtonsActions userEmail={u.email} id={u.id} />,
          },
        ]}
        data={users}
        emptyMessage="Nenhum usuário encontrado"
        error={isError}
        loading={isLoading}
      />
    </div>
  );
}

const UserAvatarTable = ({ u }: { u: User }) => {
  const t = useTranslations("UsersPage");
  return (
    <div className="flex items-center gap-3">
      {u.avatar ? (
        <Image
          src={u.avatar}
          alt={u.firstName}
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          <UserIcon />
        </div>
      )}
      <div>
        <p className="font-medium text-gray-800 dark:text-gray-200">
          {u.firstName} {u.lastName}
        </p>
        <p className="text-sm text-gray-500">{t(`Roles.${u.role}`)}</p>
      </div>
    </div>
  );
};
