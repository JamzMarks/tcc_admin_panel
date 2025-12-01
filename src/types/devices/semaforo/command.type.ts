export type CommandMessage = {
  deviceId: string;
    command: {
      cycle_total: number;
      green_duration: number;
      green_start: number;
  }
}