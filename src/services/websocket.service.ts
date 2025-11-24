import { io, Socket } from "socket.io-client";

export class WebSocketService {
  private socket: Socket | null = null;

  constructor(private url: string) {}

  connect() {
    if (this.socket && this.socket.connected) return this.socket;

    this.socket = io(this.url, { transports: ["websocket"] });
    return this.socket;
  }

  listenToSemaforo(semaforoId: string) {
    this.socket?.emit("listen", { deviceId: semaforoId });
  }

  onStatusUpdate(callback: (data: any) => void) {
    this.socket?.on("statusUpdate", callback);
  }

  onConnect(callback: () => void) {
    this.socket?.on("connect", callback);
  }

  onDisconnect(callback: () => void) {
    this.socket?.on("disconnect", callback);
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

export const WebSocketClient = new WebSocketService("https://ws.tailfox.cloud");
