import { CanvasNode, CanvasEdge } from "./CanvasElement";
import { CircleRenderer } from "./CircleRenderer";
import { LineRenderer } from "./LineRenderer";

export class CanvasPainter {
  private static _instance: CanvasPainter;

  private constructor() {}

  static getInstance() {
    if (!CanvasPainter._instance) {
      CanvasPainter._instance = new CanvasPainter();
    }
    return CanvasPainter._instance;
  }

  clearCanvas(canvases: HTMLCanvasElement[]) {
    canvases.forEach((canvas) => {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    });
  }

  reloadCanvas(
    canvases: HTMLCanvasElement[],
    canvasNodes: CanvasNode[],
    edges: CanvasEdge[],
    circleRenderer: CircleRenderer,
    lineRenderer: LineRenderer
  ) {
    this.clearCanvas(canvases);
    canvasNodes.forEach((tempNode) => {
      circleRenderer.renderCircle(tempNode);
    });
    edges.forEach((tempEdge) => {
      lineRenderer.renderLine(tempEdge);
    });
  }
}
