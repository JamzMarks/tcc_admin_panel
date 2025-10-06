"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SimpleComboBox } from "@/components/ui/combo/SimpleComboBox";
import { CreateSemaforo } from "@/types/devices/devices.interface";
import { DevicesClient } from "@/services/devices.service";

type TrafficLightFormProps = {
  onSuccess?: () => void;
};

interface TrafficLightFormValues extends CreateSemaforo {
  region?: string;
}

export function TrafficLightForm({ onSuccess }: TrafficLightFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<TrafficLightFormValues>({
    defaultValues: {
      deviceId: "",
      ip: "",
      macAddress: "",
      region: "",
    },
  });

  const onSubmit = async (values: TrafficLightFormValues) => {
    try {
      const regionPrefix = values.region ?? "XX";
      const deviceIdWithPrefix = `${regionPrefix}-${values.deviceId}`;

      await DevicesClient.CreateTrafficLight({
        ip: values.ip,
        macAddress: values.macAddress,
        deviceId: deviceIdWithPrefix,
      });

      if (onSuccess) onSuccess();
      reset();
    } catch (error) {
      console.error("Error creating traffic light:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Region</label>
        <SimpleComboBox
          resource="Region"
          placeholder="Select a region..."
          description="Select a traffic region"
          options={[
            {
              value: "AB",
              label: "Aldeia de Barueri",
            },
            {
              value: "AL",
              label: "Alphaville",
            },
          ]}
          onChange={(value) => setValue("region", value)}
        />
      </div>
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

      <div className="flex flex-col">
        <label className="mb-1 font-medium">IP Address</label>
        <Input placeholder="192.168.1.1" {...register("ip")} />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-medium">MAC</label>
        <Input placeholder="192.168.1.1" {...register("macAddress")} />
      </div>

      <div className="flex space-x-2">
        <Button
          type="button"
          className="bg-gray-800 text-red-500 cursor-pointer hover:bg-white"
          onClick={() => reset()}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="bg-primary hover:bg-orange-600 text-white cursor-pointer"
        >
          Create Traffic Light
        </Button>
      </div>
    </form>
  );
}
