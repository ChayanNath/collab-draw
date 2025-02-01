"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, Tool } from "@/app/draw/Canvas";
import { Actionbar } from "./Actionbar";

export default function CanvasRenderer({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<Canvas>();
  const [tool, setTool] = useState<Tool>("rect");

  useEffect(() => {
    canvas?.setTool(tool);
  }, [tool, canvas]);

  useEffect(() => {
    let c: Canvas;
    if (canvasRef.current) {
      c = new Canvas(canvasRef.current, roomId, socket);
      setCanvas(c);
    }

    const disableScroll = (e: Event) => e.preventDefault();
    document.body.style.overflow = "hidden";
    document.addEventListener("wheel", disableScroll, { passive: false });

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("wheel", disableScroll);
      c.destroy();
    };
  }, [canvasRef, roomId, socket]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen"
      ></canvas>
      <Actionbar setSelectedTool={setTool} tool={tool} />
    </div>
  );
}
