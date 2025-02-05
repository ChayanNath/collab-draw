import { getExistingShapes } from "./api";

export type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }
  | {
      type: "pencil";
      points: { x: number; y: number }[];
    };

export type Tool =
  | "rect"
  | "circle"
  | "eraser"
  | "pencil"
  | "line"
  | "text"
  | "color";

export class Canvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private socket: WebSocket;
  private clicked: boolean;
  private startX: number;
  private startY: number;
  private selectedTool: Tool;
  private userId: string;

  private pencilPoints: { x: number; y: number }[] = [];
  constructor(
    canvas: HTMLCanvasElement,
    roomId: string,
    socket: WebSocket,
    userId: string
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.startX = 0;
    this.startY = 0;
    this.selectedTool = "rect";
    this.userId = userId;
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  async init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.existingShapes = await getExistingShapes(this.roomId);
    this.drawExistingShapes();
  }

  drawExistingShapes() {
    this.existingShapes.forEach((shape) => {
      this.ctx.strokeStyle = "white";
      if (shape.type === "rect") {
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          shape.radius,
          0,
          Math.PI * 2
        );
        this.ctx.stroke();
      } else if (shape.type === "line") {
        this.ctx.beginPath();
        this.ctx.moveTo(shape.startX, shape.startY);
        this.ctx.lineTo(shape.endX, shape.endY);
        this.ctx.stroke();
      } else if (shape.type === "pencil") {
        this.ctx.beginPath();
        shape.points.forEach((point, index) => {
          if (index === 0) {
            this.ctx.moveTo(point.x, point.y);
          } else {
            this.ctx.lineTo(point.x, point.y);
          }
        });
        this.ctx.stroke();
      }
    });
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawExistingShapes();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setTool(tool: Tool) {
    this.selectedTool = tool;
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "shape_update") {
          const parsedShape = JSON.parse(message.message);
          this.existingShapes.push(parsedShape);
          this.clearCanvas();
        }
      } catch (error) {
        console.error("Error handling WebSocket message:", error);
      }
    };
  }

  mouseDownHandler = (e: MouseEvent) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;

    if (this.selectedTool === "pencil") {
      this.pencilPoints = [{ x: e.clientX, y: e.clientY }];
      this.ctx.beginPath();
      this.ctx.moveTo(e.clientX, e.clientY);
      this.ctx.strokeStyle = "white";
      this.ctx.lineCap = "round";
    }
  };

  mouseUpHandler = (e: MouseEvent) => {
    this.clicked = false;

    if (this.selectedTool === "pencil") {
      const shape: Shape = {
        type: "pencil",
        points: this.pencilPoints,
      };
      this.existingShapes.push(shape);
      this.socket.send(
        JSON.stringify({
          type: "shape_update",
          message: JSON.stringify(shape),
          roomId: Number(this.roomId),
        })
      );
      this.pencilPoints = [];
    } else {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      let shape: Shape | null = null;
      if (this.selectedTool === "rect") {
        shape = {
          type: "rect",
          x: this.startX,
          y: this.startY,
          width,
          height,
        };
      } else if (this.selectedTool === "circle") {
        const radius = Math.max(width, height) / 2;
        const centerX = this.startX + radius;
        const centerY = this.startY + radius;
        shape = {
          type: "circle",
          radius: Math.abs(radius),
          centerX,
          centerY,
        };
      } else if (this.selectedTool === "line") {
        shape = {
          type: "line",
          startX: this.startX,
          startY: this.startY,
          endX: e.clientX,
          endY: e.clientY,
        };
      }

      if (shape) {
        this.existingShapes.push(shape);
        this.socket.send(
          JSON.stringify({
            type: "shape_update",
            message: JSON.stringify(shape),
            roomId: Number(this.roomId),
          })
        );
      }
    }
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.clicked) {
      if (this.selectedTool === "pencil") {
        const point = { x: e.clientX, y: e.clientY };
        this.pencilPoints.push(point);
        this.ctx.lineTo(point.x, point.y);
        this.ctx.stroke();
      } else {
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;
        this.clearCanvas();
        this.ctx.strokeStyle = "white";

        if (this.selectedTool === "rect") {
          this.ctx.strokeRect(this.startX, this.startY, width, height);
        } else if (this.selectedTool === "circle") {
          const radius = Math.max(width, height) / 2;
          const centerX = this.startX + radius;
          const centerY = this.startY + radius;
          this.ctx.beginPath();
          this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
          this.ctx.stroke();
        } else if (this.selectedTool === "line") {
          this.ctx.beginPath();
          this.ctx.moveTo(this.startX, this.startY);
          this.ctx.lineTo(e.clientX, e.clientY);
          this.ctx.stroke();
        }
      }
    }
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }
}
