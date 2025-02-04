import { useEffect, useState } from "react";
import { WS_URL } from "@/config";
import { getVerifiedToken } from "@/lib/cookie";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    let wsInstance: WebSocket | null = null;

    (async () => {
      try {
        const token = await getVerifiedToken();
        const ws = new WebSocket(`${WS_URL}?token=${token}`);
        wsInstance = ws;

        ws.onopen = () => {
          console.log("WebSocket connection established");
          setLoading(false);
          setSocket(ws);
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          setLoading(false);
        };
      } catch (error) {
        console.error("Failed to initialize WebSocket:", error);
        setLoading(false);
      }
    })();

    return () => {
      if (wsInstance) {
        wsInstance.close();
      }
    };
  }, []);

  return { socket, loading };
}
