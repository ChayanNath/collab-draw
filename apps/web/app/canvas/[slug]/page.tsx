"use client";
import { CanvasWrapper } from "@/components/CanvasWrapper";
import { useParams } from "next/navigation";

export default function CanvasPage() {
  const params = useParams();
  const slug = params.slug;

  return (
    <div className="relative">
      <CanvasWrapper roomId={slug as string} />
    </div>
  );
}
