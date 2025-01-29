"use client";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (!ctx) return;

      let startX = 0;
      let startY = 0;
      let clicked = false;
      canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
      });

      canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
          const width = e.clientX - startX;
          const height = e.clientY - startY;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeRect(startX, startY, width, height);
        }
      });

      canvas.addEventListener("mouseup", (e) => {
        clicked = false;
      });
    }

    const disableScroll = (e: Event) => e.preventDefault();
    document.body.style.overflow = "hidden";
    document.addEventListener("wheel", disableScroll, { passive: false });

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("wheel", disableScroll);
    };
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen"
    ></canvas>
  );
}
