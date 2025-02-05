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
  const [scale, setScale] = useState(1);

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
      c?.destroy();
    };
  }, [roomId, socket]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "h") {
        setTool("pan");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  useEffect(() => {
    const handleScaleChange = (newScale: number) => {
      setScale(newScale);
    };

    if (canvas) {
      canvas.onScaleChange = handleScaleChange;
    }
  }, [canvas]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen"
      />
      <Actionbar
        tool={tool}
        setSelectedTool={setTool}
        onResetView={() => canvas?.resetView()}
        scale={scale}
      />
    </div>
  );
}
