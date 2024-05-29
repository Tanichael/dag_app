import { CanvasNode, CanvasEdge } from "./CanvasElement";
import { Dag } from "./Dag";

export class CanvasElementRepository {
  private static _instance: CanvasElementRepository;
  private _canvasNodes: CanvasNode[];
  private _canvasEdges: CanvasEdge[];
  private _dag: Dag | null;

  private constructor() {
    this._canvasNodes = [];
    this._canvasEdges = [];
    this._dag = null;
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

  setCanvasEdges(canvasEdges: CanvasEdge[]) {
    this._canvasEdges = canvasEdges;
  }

  getCanvasEdges() {
    return this._canvasEdges;
  }

  setDag(dag: Dag) {
    this._dag = dag;
  }

  getDag() {
    return this._dag;
  }
}
