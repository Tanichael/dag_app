import { CanvasNode } from "./CanvasElement";

export class CanvasElementRepository {
  private static _instance: CanvasElementRepository;
  private _canvasNodes: CanvasNode[];

  private constructor() {
    this._canvasNodes = [];
  }

  static getInstance(): CanvasElementRepository {
    if (!CanvasElementRepository._instance) {
      CanvasElementRepository._instance = new CanvasElementRepository();
    }
    return CanvasElementRepository._instance;
  }

  setCanvasNodes(canvasNodes: CanvasNode[]) {
    this._canvasNodes = canvasNodes;
  }

  getCanvasNodes() {
    return this._canvasNodes;
  }
}
