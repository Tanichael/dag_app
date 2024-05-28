export function clearCanvas(canvases: HTMLCanvasElement[]) {
  canvases.forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
  });
}
