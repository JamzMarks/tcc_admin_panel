"use client";

import { Input } from "@/components/ui/input";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { UpdateUserPasswordDto } from "@/types/user/update-user-password.type";
import { AuthClient } from "@/services/auth.service";

export const UpdatePasswordModal = ({
  isOpen,
  onClose,
  userId,
}: {
  isOpen: boolean;
  onClose: () => void;
  userId: string | undefined;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateUserPasswordDto>();

  const [showPassword, setShowPassword] = useState(false);
  const [confirmationPassword, setConfirmation] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  if (!isOpen) return null;

  const newPassword = watch("newPassword");

  const onSubmit = async (data: UpdateUserPasswordDto) => {
    try {
      await AuthClient.UpdateUserPassword(userId!, data);

      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        onClose();
        reset();
        setConfirmation("");
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Error updating password. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Update Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your last password"
              {...register("oldPassword", { required: "Required" })}
            />
            {errors.oldPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              {...register("newPassword", {
                required: "Required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirmationPassword}
              onChange={(e) => setConfirmation(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {newPassword && confirmationPassword && newPassword !== confirmationPassword && (
            <p className="text-xs text-red-500">
              New password and confirmation do not match.
            </p>
          )}

          <div className="flex justify-end gap-3 pt-4">
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
              Confirm
            </button>
          </div>
        </form>

        {/* Mensagem de sucesso */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-100 px-4 py-2 rounded-lg text-sm font-medium shadow-md"
            >
              <CheckCircle className="w-4 h-4" />
              Password updated successfully!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
