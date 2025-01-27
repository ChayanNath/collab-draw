import { useEffect, useState } from "react";
import { WS_URL } from "@/config";

export function useSocket() {
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    setSocket(socket);

    socket.onopen = () => {
      console.log("WebSocket connection established");
      setLoading(false);
      setSocket(socket);
    };
  }, []);

  return { socket, loading };
}
