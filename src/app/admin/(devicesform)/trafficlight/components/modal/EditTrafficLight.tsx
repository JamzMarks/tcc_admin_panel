"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DevicesClient } from "@/services/devices.service";
import { use, useEffect, useState } from "react";
import { UpdateSemaforo } from "@/types/devices/devices.interface";
import HttpModal from "@/components/ui/modal/HttpModal";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  deviceId: z.string().min(1, "Device ID é obrigatório"),
  macAddress: z.string().min(1, "MAC Address é obrigatório"),
  ip: z.string().min(1, "IP é obrigatório"),
  isActive: z.boolean(),
  packId: z.string().nullable().optional(),
  subPackId: z.string().nullable().optional(),
});

export type EditTrafficLightForm = z.infer<typeof formSchema>;

interface EditTrafficLightModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  onSuccess?: () => void;
}

export function EditTrafficLightModal({
  isOpen,
  onClose,
  onSuccess,
  id,
}: EditTrafficLightModalProps) {
    const t = useTranslations('Devices.TrafficLight.EditTrafficLightModal');
  const [data, setData] = useState<UpdateSemaforo | null>(null);
  const [loading, setLoading] = useState(false);
  const [httpModal, setHttpModal] = useState<{
    open: boolean;
    type: "success" | "error";
    message: string;
  }>({ open: false, type: "success", message: "" });
  const form = useForm<UpdateSemaforo>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      macAddress: data?.macAddress ?? "",
      ip: data?.ip ?? "",
      isActive: data?.isActive ?? false,
    },
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await DevicesClient.GetTrafficLightById(id);
        if (response.data) {
          setData(response.data);
          form.reset(response.data);
          
        }
      } catch (error: any) {
        setHttpModal({
          open: true,
          message: error.message || t("defaultError"),
          type: "error",
        });
      }
    }

    if (isOpen) fetchData();
  }, [id, isOpen]);

  async function onSubmit(values: EditTrafficLightForm) {
    setLoading(true);
    try {
      await DevicesClient.UpdateTrafficLight(id, values);
      onSuccess?.();
      onClose();
      setHttpModal({
            open: true,
            message: t("successMessage"),
            type: "success",
          });
    } catch (error: any) {
      setHttpModal({
          open: true,
          message: error.message || t("defaultError"),
          type: "error",
        });
    } finally {
      setLoading(false);
      
    }
  }
  if (!data) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
        <DialogTitle>{t("title")}</DialogTitle>
          <p>{t("loading")}</p>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg">
        
          <DialogHeader>
            <DialogTitle>{t("title")}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="macAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("macAddress")}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t("macPlaceholder")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("ip")}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={t("ipPlaceholder")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>{t("isActive")}</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={onClose}>
                  {t("cancel")}
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? t("saving") : t("saveChanges")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <HttpModal
        isOpen={httpModal.open}
        onClose={() => setHttpModal((prev) => ({ ...prev, open: false }))}
        type={httpModal.type}
        onConfirm={() => setHttpModal((prev) => ({ ...prev, open: false }))}
        title={httpModal.type === "error" ? t('errorTitle') : t('successTitle')}
        message={httpModal.message}
      />
    </>
  );
}
