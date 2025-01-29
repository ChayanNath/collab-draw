export function initDraw(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (!ctx) return;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "white";

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

      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeRect(startX, startY, width, height);
    }
  });

  canvas.addEventListener("mouseup", () => {
    clicked = false;
  });
}
