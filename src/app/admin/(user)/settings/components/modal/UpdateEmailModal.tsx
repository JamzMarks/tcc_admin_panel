"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type UpdateEmailForm = {
  newEmail: string;
  confirmEmail: string;
};

export const UpdateEmailModal = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newEmail: string) => void;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateEmailForm>();

  const newEmail = watch("newEmail");
  const confirmEmail = watch("confirmEmail");

  const onSubmit = (data: UpdateEmailForm) => {
    if (data.newEmail === data.confirmEmail) {
      onConfirm(data.newEmail);
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Update Email
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter new email"
              {...register("newEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.newEmail && (
              <p className="text-sm text-red-500 mt-1">
                {errors.newEmail.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type="email"
              placeholder="Confirm new email"
              {...register("confirmEmail", {
                required: "Please confirm your email",
                validate: (value) =>
                  value === newEmail || "Emails do not match",
              })}
            />
            {errors.confirmEmail && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmEmail.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg bg-gray-200 dark:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded-lg bg-primary text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
