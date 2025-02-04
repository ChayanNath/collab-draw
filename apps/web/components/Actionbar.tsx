import { Tool } from "@/app/draw/Canvas";
import { Button } from "@workspace/ui/components/button";
import { Circle, Square, Minus, Pencil } from "lucide-react";

export function Actionbar({
  tool,
  setSelectedTool,
}: {
  tool: Tool;
  setSelectedTool: (tool: Tool) => void;
}) {
  const activeClass = "bg-gray-200 dark:bg-gray-800";
  const inactiveClass = "bg-gray-100 dark:bg-gray-900";
  return (
    <div className="fixed top-50 left-50 flex items-center justify-center gap-2 p-2">
      <Button
        size="icon"
        title="Circle"
        className={tool === "circle" ? activeClass : inactiveClass}
        onClick={() => setSelectedTool("circle")}
      >
        <Circle />
      </Button>
      <Button
        size="icon"
        title="Rectangle"
        className={tool === "rect" ? activeClass : inactiveClass}
        onClick={() => setSelectedTool("rect")}
      >
        <Square />
      </Button>
      <Button
        size="icon"
        title="Line"
        className={tool === "line" ? activeClass : inactiveClass}
        onClick={() => setSelectedTool("line")}
      >
        <Minus />
      </Button>
      <Button
        size="icon"
        title="Pencil"
        className={tool === "pencil" ? activeClass : inactiveClass}
        onClick={() => setSelectedTool("pencil")}
      >
        <Pencil />
      </Button>
    </div>
  );
}
