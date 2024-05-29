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
  private _isSelected: boolean;
  private _isClear: boolean;
  private _isWrong: boolean;

  OnSelected: Subject<CanvasNode>;
  OnChangePosition: Subject<CanvasNode>;

  constructor(val: number, pos: number[]) {
    this._val = val;
    this._x = pos[0];
    this._y = pos[1];
    this._isSelected = false;
    this._isClear = false;
    this._isWrong = false;
    this.OnSelected = new Subject<CanvasNode>();
    this.OnChangePosition = new Subject<CanvasNode>();
  }

  static getRadius() {
    return this.s_radius;
  }

  setIsClaer(isClear: boolean) {
    this._isClear = isClear;
  }

  getIsClear() {
    return this._isClear;
  }

  setIsWrong(isWrong: boolean) {
    this._isWrong = isWrong;
  }

  getIsWrong() {
    return this._isWrong;
  }

  getVal() {
    return this._val;
  }

  getPosition() {
    return [this._x, this._y];
  }

  getIsSelected() {
    return this._isSelected;
  }

  setPosition(pos: number[]) {
    this._x = pos[0];
    this._y = pos[1];
    this.OnChangePosition.onNext(this);
  }

  setIsSelected(isSelected: boolean) {
    this._isSelected = isSelected;
    this.OnSelected.onNext(this);
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
