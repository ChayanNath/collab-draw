"use client";

import { initDraw } from "@/app/draw";
import { Button } from "@workspace/ui/components/button";
import { useEffect, useRef } from "react";

export default function Canvas({ slug }: { slug: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, slug);
    }

    const disableScroll = (e: Event) => e.preventDefault();
    document.body.style.overflow = "hidden";
    document.addEventListener("wheel", disableScroll, { passive: false });

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("wheel", disableScroll);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-screen h-screen"
      ></canvas>
      <div className="fixed top-0 left-0 flex items-center justify-center gap-2">
        <Button>Rectangle</Button>
        <Button>Circle</Button>
      </div>
    </div>
  );
}
