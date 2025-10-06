'use client'
import { CreateCamera } from "@/types/devices/devices.interface";
import { useForm } from "react-hook-form";

export const CameraForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCamera>();

  const onSubmit = (data: CreateCamera) => {
    console.log("📸 Camera criada:", data);
    // aqui você faria a chamada da API (fetch/axios)
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md p-4 border rounded-lg shadow"
    >
      {/* MAC Address */}
      <div>
        <label className="block mb-1 font-medium">MAC Address</label>
        <input
          type="text"
          {...register("macAddress", {
            required: "MAC Address é obrigatório",
            pattern: {
              value: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
              message: "MAC Address inválido",
            },
          })}
          className="w-full p-2 border rounded"
          placeholder="00:1A:2B:3C:4D:5E"
        />
        {errors.macAddress && (
          <p className="text-red-500 text-sm">{errors.macAddress.message}</p>
        )}
      </div>

      {/* IP */}
      <div>
        <label className="block mb-1 font-medium">IP</label>
        <input
          type="text"
          {...register("ip", {
            required: "IP é obrigatório",
            pattern: {
              value:
                /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
              message: "IP inválido",
            },
          })}
          className="w-full p-2 border rounded"
          placeholder="192.168.0.10"
        />
        {errors.ip && (
          <p className="text-red-500 text-sm">{errors.ip.message}</p>
        )}
      </div>

      {/* Device ID */}
      <div>
        <label className="block mb-1 font-medium">Device ID</label>
        <input
          type="text"
          {...register("deviceId", { required: "Device ID é obrigatório" })}
          className="w-full p-2 border rounded"
          placeholder="CAM-001"
        />
        {errors.deviceId && (
          <p className="text-red-500 text-sm">{errors.deviceId.message}</p>
        )}
      </div>

      {/* Botão */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Criar Camera
      </button>
    </form>
  );
};
