import { IObserver } from "./IObserver";
import { IObservable } from "./IObservable";
import { Subject } from "./Subject";

export function calcPosition(id: number): number[] {
  return [200 * id + 100, 50 + Math.random() * 800];
}

export class CanvasNode {
  private static s_radius = 40;

  private _val: number;
  private _x: number;
  private _y: number;

  OnChangePosition: Subject<CanvasNode>;

  constructor(val: number, pos: number[]) {
    this._val = val;
    this._x = pos[0];
    this._y = pos[1];
    this.OnChangePosition = new Subject<CanvasNode>();
  }

  static getRadius() {
    return this.s_radius;
  }

  getVal() {
    return this._val;
  }

  getPosition() {
    return [this._x, this._y];
  }

  setPosition(pos: number[]) {
    this._x = pos[0];
    this._y = pos[1];
    this.OnChangePosition.onNext(this);
  }
}

export class CanvasEdge {
  _from: CanvasNode;
  _to: CanvasNode;
  _weight: number;

  constructor(from: CanvasNode, to: CanvasNode, weight: number) {
    this._from = from;
    this._to = to;
    this._weight = weight;
  }

  getFrom(): CanvasNode {
    return this._from;
  }

  getTo(): CanvasNode {
    return this._to;
  }

  getWeight(): number {
    return this._weight;
  }
}
