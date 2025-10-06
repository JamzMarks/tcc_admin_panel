"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { CreateUserDto, User } from "@/types/user/user.type";
import { Roles } from "@/types/user/roles.type";
import { useTranslations } from "next-intl";



type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserDto) => void;
  user?: User | null; // se tiver -> editar, se não -> criar
};

export const UserModal = ({ isOpen, onClose, onSubmit, user }: UserModalProps) => {
  const t = useTranslations('UsersPage.UsersModal');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserDto>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      role: Roles.USER,
      avatar: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset(user); 
    } else {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        role: Roles.USER,
        avatar: "",
      }); // criar -> vazio
    }
  }, [user, reset, isOpen]);

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg w-full max-w-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {user ? "Editar Usuário" : "Criar Usuário"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">Nome</label>
              <input
                type="text"
                {...register("firstName", { required: "Obrigatório" })}
                className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs">{errors.firstName.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Sobrenome</label>
              <input
                type="text"
                {...register("lastName", { required: "Obrigatório" })}
                className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs">{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Obrigatório" })}
              className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email.message}</span>
            )}
          </div>

          {!user && (
            <div>
              <label className="block text-sm font-medium">Senha</label>
              <input
                type="password"
                {...register("password", { required: "Obrigatório" })}
                className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password.message}</span>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              {...register("role", { required: "Obrigatório" })}
              className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
            >
              {Object.values(Roles).map((role) => (
                <option key={role} value={role}>
                  {t(`Roles.${role}`)}
                </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Avatar (URL)</label>
            <input
              type="text"
              {...register("avatar")}
              className="w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-neutral-700 text-sm font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition"
            >
              {user ? "Salvar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
