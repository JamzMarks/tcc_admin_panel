"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { WebSocketClient } from "@/services/websocket.service";
import { CommandMessage } from "@/types/devices/semaforo/command.type";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  semaforoId: string;
  onUpdateStatus: Dispatch<SetStateAction<CommandMessage | null>>;
}

const SemaforoListener = ({ semaforoId, onUpdateStatus }: Props) => {
  const [active, setActive] = useState(false);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!active) return;

    const socket = WebSocketClient.connect();
    WebSocketClient.onConnect(() => {
      setConnected(true);
      console.log(`[WS] conectado ${semaforoId}`, socket.id);
      WebSocketClient.listenToSemaforo(semaforoId);
    });

    WebSocketClient.onStatusUpdate((data) => {
      console.log("[WS] statusUpdate:", data);
      setMessage(data);
      onUpdateStatus({
          deviceId: data.deviceId,
          command: { ...data.command },
        });
      console.log("Atualizado onUpdateStatus:", data)
      // if (data) {
      //   onUpdateStatus({
      //     deviceId: data.deviceId,
      //     command: { ...data.command },
      //   });
      // }

      setHistory((prev) => [
        {
          ts: new Date().toLocaleTimeString("pt-BR"),
          ...data,
        },
        ...prev,
      ]);
    });

    WebSocketClient.onDisconnect(() => {
      setConnected(false);
      console.log("[WS] desconectado");
    });

    return () => {
      WebSocketClient.disconnect();
      setConnected(false);
    };
  }, [semaforoId, active]);

  return (
    <div className="p-4 space-y-4 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Botão animado */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button onClick={() => setActive((prev) => !prev)}>
            {active ? "Parar de escutar" : "Escutar semáforo"}
          </Button>
        </motion.div>

        {/* Badge customizado */}
        <motion.div
          animate={{
            opacity: connected ? 1 : 0.7,
            scale: connected ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 1.2, repeat: connected ? Infinity : 0 }}
          className={`
      flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium
      ${connected ? "bg-green-600 text-white" : "bg-red-600 text-white"}
    `}
        >
          {connected ? (
            <>
              <CheckCircle size={16} />
              Conectado
            </>
          ) : (
            <>
              <XCircle size={16} />
              Desconectado
            </>
          )}
        </motion.div>
      </div>

      <Separator />

      {/* Última mensagem */}
      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          Última mensagem recebida:
        </h3>

        <div className="bg-gray-800 text-green-400 font-mono text-xs p-4 rounded-xl shadow-inner border border-gray-700">
          {message ? (
            <pre>{JSON.stringify(message, null, 2)}</pre>
          ) : (
            <span className="text-gray-500">Aguardando dados...</span>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2 text-muted-foreground">
          Histórico:
        </h3>
        <div className="max-h-48 overflow-y-auto rounded-lg border border-gray-700 bg-gray-800 p-3 text-xs font-mono text-gray-400">
          {history.length === 0 ? (
            <p className="text-gray-600">Nenhum evento recebido ainda.</p>
          ) : (
            history.map((h, i) => (
              <div key={i} className="mb-2 border-b border-gray-700 pb-1">
                <span className="text-gray-500">{h.ts}</span>
                <pre>{JSON.stringify(h, null, 2)}</pre>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SemaforoListener;
