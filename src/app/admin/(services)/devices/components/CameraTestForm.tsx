'use client'
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export const CameraTestForm = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultUrl(null);
    }
  };

  const handleTest = async () => {
    if (!selectedImage) return alert("Selecione uma imagem primeiro!");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await fetch("http://localhost:7676/test", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao enviar imagem");

      const blob = await response.blob();
      const resultImageUrl = URL.createObjectURL(blob);
      setResultUrl(resultImageUrl);
    } catch (err) {
      console.error(err);
      alert("Erro ao testar imagem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWithHeader title="Camera Test">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Área da Imagem */}
        <div className="rounded-2xl flex items-center justify-center border-dotted border-2 border-gray-300 dark:border-gray-600 h-96">
          <CardContent className="p-4 flex items-center justify-center w-full">
            {resultUrl ? (
              <img
                src={resultUrl}
                alt="Resultado"
                className="max-h-80 rounded-lg object-contain"
              />
            ) : previewUrl ? (
              <img
                src={previewUrl}
                alt="Pré-visualização"
                className="max-h-80 rounded-lg object-contain"
              />
            ) : (
              <div
                className="text-gray-500 text-center flex flex-col items-center gap-4"
              >
                <p>Nenhuma imagem selecionada</p>
                <div className="w-12 h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full">
                  <ImageIcon />
                </div>
              </div>
            )}
          </CardContent>
        </div>

        {/* Formulário */}
        <div>
          <CardContent className="p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Teste de Câmera</h2>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Input
              type="text"
              onChange={handleFileChange}
              
            />
            <Input
              type="text"
              onChange={handleFileChange}
              
            />

            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
              variant="outline"
            >
              Selecionar Imagem
            </Button>

            <Button
              onClick={handleTest}
              disabled={!selectedImage || loading}
              className="w-full"
            >
              {loading ? "Testando..." : "Testar"}
            </Button>
          </CardContent>
        </div>
      </div>
    </SectionWithHeader>
  );
};
