import { BACKEND_URL } from "@/config";
import { getVerifiedToken } from "@/lib/cookie";
import axios from "axios";

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
    };

export async function initDraw(canvas: HTMLCanvasElement, slug: string) {
  const token = await getVerifiedToken();
  const ctx = canvas.getContext("2d");

  if (!ctx || !token) return;

  const existingShapes: Shape[] = (await getExistingShapes(slug, token)) || [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "white";
  clearCanvas(existingShapes, ctx, canvas);
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

      clearCanvas(existingShapes, ctx, canvas);

      ctx.strokeRect(startX, startY, width, height);
    }
  });

  canvas.addEventListener("mouseup", (e) => {
    if (!clicked) return;
    clicked = false;

    const width = e.clientX - startX;
    const height = e.clientY - startY;

    existingShapes.push({
      type: "rect",
      x: startX,
      y: startY,
      width,
      height,
    });
    clearCanvas(existingShapes, ctx, canvas);
  });
}

function clearCanvas(
  existingShapes: Shape[],
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.forEach((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "white";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function getExistingShapes(slug: string, token: string) {
  try {
    const res = await axios.get(`${BACKEND_URL}/chat/${slug}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const messsages = (await res.data.messsages) || [];

    return messsages.map((message: string) => {
      const parsedMessage = JSON.parse(message);
      return parsedMessage;
    });
  } catch (error) {
    console.log(error);
  }
}
