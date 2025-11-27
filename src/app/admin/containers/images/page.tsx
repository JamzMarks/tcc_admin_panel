"use client";

import { useEffect, useState } from "react";
import { PageTitle } from "@/components/ui/elements/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, RefreshCw, Trash2 } from "lucide-react";

export default function ImagesPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadImages() {
    setLoading(true);
    const res = await fetch("/api/docker/images");
    const data = await res.json();
    setImages(data);
    setLoading(false);
  }

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="w-full space-y-4">
      <PageTitle>Imagens Docker</PageTitle>

      <Card className="dark:bg-foreground-dark">
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-6 w-6" /> Imagens
          </CardTitle>

          <Button variant="outline" size="sm" onClick={loadImages}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {loading && <p>Carregando imagens...</p>}

          {!loading && images.length === 0 && (
            <p>Nenhuma imagem encontrada.</p>
          )}

          <div className="space-y-3 mt-4">
            {images.map((img) => (
              <div
                key={img.Id}
                className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center dark:border-gray-700"
              >
                <div>
                  <p className="font-semibold">
                    {img.RepoTags?.[0] || "<none>:<none>"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {img.Id.substring(7, 19)} — {Math.round(img.Size / 1024 / 1024)}MB
                  </p>
                </div>

                <div className="flex gap-2 mt-3 md:mt-0">
                  <Button size="sm" variant="destructive">
                    <Trash2 className="h-4 w-4" /> Remover
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
