import { CanvasNode } from "./CanvasElement";

export class CircleRenderer {
  _canvasCircle: HTMLCanvasElement;
  _ctxCircle: CanvasRenderingContext2D | null;
  _canvasText: HTMLCanvasElement;
  _ctxText: CanvasRenderingContext2D | null;

  constructor(canvasCircle: HTMLCanvasElement, canvasText: HTMLCanvasElement) {
    this._canvasCircle = canvasCircle;
    this._ctxCircle = canvasCircle.getContext("2d");
    this._canvasText = canvasText;
    this._ctxText = canvasText.getContext("2d");
  }

  renderCircle(node: CanvasNode) {
    if (this._ctxCircle == null || this._ctxText == null) {
      return;
    }

    const id = node.getVal();
    const x = node.getPosition()[0];
    const y = node.getPosition()[1];

    this._ctxCircle.fillStyle = "white";
    this._ctxCircle.strokeStyle = "red"; // 塗りつぶしは暗めの色
    this._ctxCircle.lineWidth = 1; // 線の幅は5px

    /* 円の描画 */
    this._ctxCircle.beginPath(); // パスの初期化
    this._ctxCircle.arc(x, y, 40, 0, 2 * Math.PI); // (100, 50)の位置に半径30pxの円
    this._ctxCircle.closePath(); // パスを閉じる
    this._ctxCircle.fill();
    this._ctxCircle.stroke();

    this._ctxText.font = "24px serif";
    this._ctxText.textAlign = "center";
    this._ctxText.fillText(String(id), x, y + 9);
  }
}
