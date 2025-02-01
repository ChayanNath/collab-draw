import { CanvasWrapper } from "@/components/CanvasWrapper";

export default async function CanvasLanding({
  params,
}: {
  params: { slug: string };
}) {
  const slug = (await params).slug;

  return (
    <div className="relative">
      <CanvasWrapper roomId={slug} />
    </div>
  );
}
