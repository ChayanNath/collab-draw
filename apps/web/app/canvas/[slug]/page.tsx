"use client";
import { CanvasWrapper } from "@/components/CanvasWrapper";
import { useParams } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CanvasLanding() {
  const params = useParams();
  const { slug } = params;

  return (
    <div className="relative">
      <Link href="/dashboard">
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>
      <CanvasWrapper roomId={slug as string} />
    </div>
  );
}
