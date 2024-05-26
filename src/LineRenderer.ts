import { CanvasEdge } from "./CanvasElement";

export class LineRenderer {
  _canvasLine: HTMLCanvasElement;
  _ctxLine: CanvasRenderingContext2D | null;

  constructor(canvas: HTMLCanvasElement) {
    this._canvasLine = canvas;
    this._ctxLine = canvas.getContext("2d");
  }

  renderLine(edge: CanvasEdge) {
    if (this._ctxLine == null) return;

    const from = edge.getFrom().getPosition();
    const to = edge.getTo().getPosition();
    const weight = edge.getWeight();
    this._ctxLine?.beginPath();
    this._ctxLine.moveTo(from[0], from[1]);
    this._ctxLine.lineTo(to[0], to[1]);
    this._ctxLine.stroke();

    const middle: number[] = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2];
    this._ctxLine.font = "24px serif";
    this._ctxLine.textAlign = "center";
    this._ctxLine.fillText(String(weight), middle[0], middle[1] - 10);
  }
}
