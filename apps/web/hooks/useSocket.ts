import { useEffect, useState } from "react";
import { WS_URL } from "@/config";
import { getVerifiedToken } from "@/lib/cookie";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    (async () => {
      const token = await getVerifiedToken();
      const ws = new WebSocket(`${WS_URL}?token=${token}`);

      ws.onopen = () => {
        console.log("WebSocket connection established");
        setLoading(false);
      };

      setSocket(ws);
    })();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return { socket, loading };
}
