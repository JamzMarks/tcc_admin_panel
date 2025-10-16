"use client";

import { LoginDto } from "@/types/interfaces/authDto";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthClient } from "@/services/auth.service";
import { useRouter } from "next/navigation";


export const SignInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LoginDto>();

  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginDto> = async (data) => {
    setServerError(null);
    try {
        await AuthClient.Login(data);
        router.push("/admin"); 
    } catch (error: unknown) {
       setServerError("Invalid credentials");
    } finally {
      reset({ password: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      
      {/* Email */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            {...register("email", { required: "Email obrigatório" })}
            className="pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full transition"
            placeholder="seu@email.com"
          />
        </div>
        {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Senha</label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Senha obrigatória" })}
            className="pl-10 pr-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full transition"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>}
      </div>

      {serverError && <p className="text-red-600 text-center text-sm">{serverError}</p>}

      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 transition-colors py-3 font-semibold rounded-lg">
        Login
      </Button>
    </form>
  );
};
