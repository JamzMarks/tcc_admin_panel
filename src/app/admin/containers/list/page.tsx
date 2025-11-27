"use client";

import { useEffect, useState } from "react";
import { PageTitle } from "@/components/ui/elements/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Server,
  Play,
  StopCircle,
  RefreshCw,
  Terminal,
} from "lucide-react";

export default function ContainersListPage() {
  const [containers, setContainers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadContainers() {
    setLoading(true);
    const res = await fetch("/api/docker/containers");
    const data = await res.json();
    setContainers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadContainers();
  }, []);

  return (
    <div className="w-full space-y-4">
      <PageTitle>Containers</PageTitle>

      <Card className="dark:bg-foreground-dark">
        <CardHeader className="flex flex-row justify-between">
          <CardTitle className="flex items-center gap-2">
            <Server className="h-6 w-6" /> Containers Docker
          </CardTitle>

          <Button variant="outline" size="sm" onClick={loadContainers}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {loading && <p>Carregando containers...</p>}

          {!loading && containers.length === 0 && (
            <p>Nenhum container encontrado.</p>
          )}

          <div className="space-y-3 mt-4">
            {containers.map((c) => (
              <div
                key={c.Id}
                className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center dark:border-gray-700"
              >
                <div>
                  <p className="font-semibold">{c.Names?.[0] || c.Id}</p>
                  <p className="text-xs text-gray-500">
                    {c.Image} — {c.State} ({c.Status})
                  </p>
                </div>
