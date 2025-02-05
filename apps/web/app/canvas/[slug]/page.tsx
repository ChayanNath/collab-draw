"use client";
import { CanvasWrapper } from "@/components/CanvasWrapper";
import { useParams } from "next/navigation";
export default function CanvasLanding() {
  const params = useParams();
  const { slug } = params;

  return (
    <div className="relative">
      <CanvasWrapper roomId={slug as string} />
    </div>
  );
}
