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
    const edgeLength = Math.sqrt(
      Math.pow(from[0] - to[0], 2) + Math.pow(from[1] - to[1], 2)
    );
    const fromRate = 40.0 / edgeLength;
    const toRate = 1 - fromRate;
    const contact = [
      fromRate * from[0] + toRate * to[0],
      fromRate * from[1] + toRate * to[1],
    ];

    const cos = (to[0] - from[0]) / edgeLength;
    const sin = (to[1] - from[1]) / edgeLength;
    const edgeRadCos = Math.acos(cos);
    const edgeRadSin = Math.acos(sin);

    //0 ~ 2PIの範囲でEdgeの角度を計算
    let edgeRad = 0.0;
    if (sin >= 0) {
      edgeRad = edgeRadCos;
    } else {
      edgeRad = 2 * Math.PI - edgeRadCos;
    }

    const arrowLength = 15;
    const arrowRad = (40 * Math.PI) / 180.0;
    const befArrowRad = edgeRad + (Math.PI - arrowRad);
    const aftArrowRad = edgeRad + (Math.PI + arrowRad);
    const befArrowTo = [
      arrowLength * Math.cos(befArrowRad) + contact[0],
      arrowLength * Math.sin(befArrowRad) + contact[1],
    ];
    const aftArrowTo = [
      arrowLength * Math.cos(aftArrowRad) + contact[0],
      arrowLength * Math.sin(aftArrowRad) + contact[1],
    ];

    this._ctxLine.lineWidth = 2;

    this._ctxLine?.beginPath();
    this._ctxLine.moveTo(from[0], from[1]);
    this._ctxLine.lineTo(to[0], to[1]);
    this._ctxLine.stroke();

    this._ctxLine.moveTo(contact[0], contact[1]);
    this._ctxLine.lineTo(befArrowTo[0], befArrowTo[1]);
    this._ctxLine.stroke();

    this._ctxLine.moveTo(contact[0], contact[1]);
    this._ctxLine.lineTo(aftArrowTo[0], aftArrowTo[1]);
    this._ctxLine.stroke();

    const middle: number[] = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2];
    this._ctxLine.font = "24px serif";
    this._ctxLine.textAlign = "center";
    this._ctxLine.fillText(String(weight), middle[0], middle[1] - 10);
  }
}
