import { MQTTClient } from '@/services/mqtt.service';
import { useEffect, useRef, useState } from 'react';

export function useServerTime(syncIntervalMs = 30_000) {
  const offsetRef = useRef(0);         
  const [ready, setReady] = useState(false);

  async function sync() {
    try {
        const {data} = await MQTTClient.GetServerTime();
        
        const clientNow = Date.now();
        offsetRef.current = data.epoch_ms - clientNow;
        setReady(true);
    } catch (err) {
      console.error("Erro ao sincronizar horário:", err);
    }
  }

  useEffect(() => {
    sync();
    const id = setInterval(sync, syncIntervalMs);
    return () => clearInterval(id);
  }, []);

  /**
   * Data baseada no relógio do servidor.
   */
  function now() {
    return new Date(Date.now() + offsetRef.current);
  }

  return { now, offset: offsetRef.current, ready };
}
