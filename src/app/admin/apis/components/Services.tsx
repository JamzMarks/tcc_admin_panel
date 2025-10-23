"use client";

import { useState } from "react";
import { Shield, Activity, BarChart3, LucideIcon, Server } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { ServiceCard } from "./ServiceCard";
import { Button } from "@/components/ui/button";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { useTranslations } from "next-intl";

type Service = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};



const MSServices = () => {
  const t = useTranslations('Apis.microservices')
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const services: Service[] = [
    {
      title: t('items.0.title'),
      description: t('items.0.description'),
      href: "#",
      icon: Shield,
    },
    {
      title: t('items.1.title'),
      description: t('items.1.description'),
      href: "#",
      icon: Activity,
    },
    {
      title: t('items.2.title'),
      description: t('items.2.description'),
      href: "#",
      icon: BarChart3,
    },
  ]
  return (
    <SectionWithHeader title={t('title')} Icon={Server}>

    
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            onClick={() => setSelectedService(service)}
            className="cursor-pointer transform hover:scale-[1.02] transition"
          >
            <ServiceCard
              description={service.description}
              href={service.href}
              title={service.title}
              Icon={service.icon}
            />
          </div>
        ))}
      </div>

      {/* Drawer para exibir detalhes */}
      <Drawer
        open={!!selectedService}
        onOpenChange={() => setSelectedService(null)}
      >
        <DrawerContent
          className="fixed top-0 h-dvh w-full 
          md:max-w-lg md:rounded-t-2xl md:ml-auto 
          lg:max-w-xl right-0 bg-white dark:bg-neutral-900 shadow-xl"
        >
          <DrawerHeader className="border-b border-gray-200 dark:border-gray-700">
            <DrawerTitle className="text-lg font-semibold flex items-center gap-2">
              {selectedService?.icon &&
                <selectedService.icon className="h-5 w-5 text-primary" />}
              {selectedService?.title}
            </DrawerTitle>
            <DrawerDescription className="text-gray-600 dark:text-gray-400 text-left">
              {selectedService?.description}
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-6 space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <p>
              Este painel contém informações detalhadas sobre o microserviço{" "}
              <strong>{selectedService?.title}</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Swagger docs com endpoints disponíveis.</li>
              <li>Exemplos de request/response.</li>
              <li>Links úteis: repositório no GitHub, documentação extra.</li>
            </ul>

            <div className="flex gap-3 pt-4">
              <Button variant="default" asChild>
                <a href={selectedService?.href} target="_blank">
                  Abrir Swagger
                </a>
              </Button>
              <Button variant="outline" onClick={() => setSelectedService(null)} >
                Fechar
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
    </SectionWithHeader>
  );
};

export default MSServices;
