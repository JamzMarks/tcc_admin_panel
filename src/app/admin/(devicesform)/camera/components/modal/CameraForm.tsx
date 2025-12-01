"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SimpleComboBox } from "@/components/ui/combo/SimpleComboBox";
import HttpModal from "@/components/ui/modal/HttpModal";
import { DevicesClient } from "@/services/devices.service";
import { useState } from "react";


type CreateCameraForm = {
  deviceId: string;
  ip: string;
  type: DeviceType;
};
type DeviceType = "cam" | "mock" | "temperature" | "proximity";

export function CameraForm({ onSuccess }: { onSuccess?: () => void }) {
  
  const [modal, setModal] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({
    open: false,
    type: "success",
    message: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateCameraForm>({
    defaultValues: {
      deviceId: "",
      ip: "",
      type: "cam",
    },
  });

  const onSubmit = async (values: CreateCameraForm) => {
    try {
      await DevicesClient.CreateDevice({
        deviceId: values.deviceId,
        ip: values.ip,
        type: values.type,
      });

      setModal({
        open: true,
        type: "success",
        message: `Camera ${values.deviceId} criada com sucesso!`,
      });

      reset();
      onSuccess?.();
    } catch (error: any) {
      console.error("Error creating camera:", error);

      setModal({
        open: true,
        type: "error",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Falha ao criar câmera.",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Type */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Camera Type</label>
          <SimpleComboBox
            placeholder="Select type..."
            resource="deviceType"
            description="Select device type"
            options={deviceTypeOptions}
            onChange={(v) => setValue("type", v as DeviceType)}
          />
          {errors.type && (
            <span className="text-red-500 text-sm mt-1">
              {errors.type.message}
            </span>
          )}
        </div>

        {/* Device ID */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Device ID</label>
          <Input
            placeholder="Enter device ID"
            {...register("deviceId", { required: "Device ID is required" })}
          />
          {errors.deviceId && (
            <span className="text-red-500 text-sm mt-1">
              {errors.deviceId.message}
            </span>
          )}
        </div>

        {/* IP */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">IP Address</label>
          <Input
            placeholder="192.168.0.10"
            {...register("ip", {
              required: "IP Address is required",
              pattern: {
                value:
                  /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
                message: "IP inválido",
              },
            })}
          />
          {errors.ip && (
            <span className="text-red-500 text-sm mt-1">
              {errors.ip.message}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-2">
          <Button type="button" variant="destructive" onClick={() => reset()}>
            Cancel
          </Button>

          <Button
            type="submit"
            className="bg-primary hover:bg-orange-600 text-white cursor-pointer"
          >
            Create Camera
          </Button>
        </div>
      </form>

      <HttpModal
        isOpen={modal.open}
        type={modal.type}
        message={modal.message}
        onClose={() => setModal((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
}

export const deviceTypeOptions: { value: DeviceType; label: string }[] = [
  { value: "cam", label: "Camera" },
  { value: "mock", label: "Mock Device" },
  { value: "temperature", label: "Temperature Sensor" },
  { value: "proximity", label: "Proximity Sensor" },
];
