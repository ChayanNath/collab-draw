import { CanvasWrapper } from "@/components/CanvasWrapper";

export default function CanvasLanding({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  return (
    <div className="relative">
      <CanvasWrapper roomId={slug} />
    </div>
  );
}
