import Canvas from "@/components/Canvas";

export default async function CanvasWrapper({
  params,
}: {
  params: { slug: string };
}) {
  const slug = (await params).slug;

  return (
    <div className="relative">
      <Canvas slug={slug} />
    </div>
  );
}
