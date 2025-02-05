import { Tool } from "@/app/draw/Canvas";
import { Button } from "@workspace/ui/components/button";
import { Circle, Square, Minus, Pencil, Hand, RotateCcw } from "lucide-react";

export function Actionbar({
  tool,
  setSelectedTool,
  onResetView,
  scale,
}: {
  tool: Tool;
  setSelectedTool: (tool: Tool) => void;
  onResetView: () => void;
  scale: number;
}) {
  const activeClass = "bg-accent text-accent-foreground shadow-inner";
  const inactiveClass = "hover:bg-accent/50 text-foreground/80";

  return (
    <div className="fixed left-1/2 top-4 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 p-1.5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg border shadow-lg">
        <Button
          size="icon"
          variant="ghost"
          title="Hand Tool (H)"
          className={`h-9 w-9 rounded-md transition-colors ${
            tool === "pan" ? activeClass : inactiveClass
          }`}
          onClick={() => setSelectedTool("pan")}
        >
          <Hand className="h-5 w-5" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          size="icon"
          variant="ghost"
          title="Pencil (P)"
          className={`h-9 w-9 rounded-md transition-colors ${
            tool === "pencil" ? activeClass : inactiveClass
          }`}
          onClick={() => setSelectedTool("pencil")}
        >
          <Pencil className="h-5 w-5" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          size="icon"
          variant="ghost"
          title="Rectangle (R)"
          className={`h-9 w-9 rounded-md transition-colors ${
            tool === "rect" ? activeClass : inactiveClass
          }`}
          onClick={() => setSelectedTool("rect")}
        >
          <Square className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          title="Circle (C)"
          className={`h-9 w-9 rounded-md transition-colors ${
            tool === "circle" ? activeClass : inactiveClass
          }`}
          onClick={() => setSelectedTool("circle")}
        >
          <Circle className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          title="Line (L)"
          className={`h-9 w-9 rounded-md transition-colors ${
            tool === "line" ? activeClass : inactiveClass
          }`}
          onClick={() => setSelectedTool("line")}
        >
          <Minus className="h-5 w-5" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <div className="text-xs text-muted-foreground font-mono">
          {Math.round(scale * 100)}%
        </div>
        <Button
          size="icon"
          variant="ghost"
          title="Reset View"
          className="h-9 w-9 rounded-md transition-colors hover:bg-accent/50"
          onClick={onResetView}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
