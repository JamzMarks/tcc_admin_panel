'use client'

import { useForm } from "react-hook-form";
import { useState } from "react";
import { SimpleSection } from "@/components/ui/sections/SimpleSection";
import { TestSteps } from "./TestSteps";

interface DeviceFormData {
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  ip: string;
  active: boolean;
}

export const DeviceForm = () => {
  const { register, handleSubmit } = useForm<DeviceFormData>();
  

  const onSubmit = (data: DeviceFormData) => {
    // if (!testPassed) {
    //   alert("Você precisa testar a conexão antes de salvar.");
    //   return;
    // }
    console.log("Dispositivo salvo:", data);
  };



  return (

    
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 space-x-4">
        <div className="flex gap-4">
            <div>
                <label className="block text-sm font-medium">Nome</label>
                <input {...register("name")} className="border border-gray-200 rounded-lg p-2 w-full outline-none" placeholder="Device name" />
            </div>

            <div>
                <label className="block text-sm font-medium">Localização</label>
                <input {...register("location")} className="border border-gray-200 rounded-lg p-2 w-full outline-none" placeholder="Street name" />
            </div>
            <div>
                <label className="block text-sm font-medium">Latitude</label>
                <input {...register("latitude")} className="border border-gray-200 rounded-lg p-2 w-full outline-none" placeholder="10.1000" />
            </div>
            <div>
                <label className="block text-sm font-medium">Longitude</label>
                <input {...register("longitude")} className="border border-gray-200 rounded-lg p-2 w-full outline-none" placeholder="-10.1000" />
            </div>
            
        </div>
        <div>

      <div>
        <label className="block text-sm font-medium">IP Address</label>
        <input {...register("ip")} className="border border-gray-200 rounded-lg p-2 w-full outline-none" placeholder="123.456.1.1"/>
      </div>
        </div>
        <TestSteps></TestSteps>
      

      {/* {message && <p className="text-sm">{message}</p>} */}

      {/* <button
        type="submit"
        disabled={!testPassed}
        className={`px-4 py-2 rounded-lg ${testPassed ? "bg-green-500 text-white" : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
      >
        Cadastrar dispositivo
      </button> */}
    </form>
  );
};
