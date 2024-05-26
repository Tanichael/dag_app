export function calcPosition(id: number): number[] {
  if (id === 0) {
    return [100, 50];
  } else if (id === 1) {
    return [300, 100];
  }
  return [100, 50];
}

export class CanvasNode {
  _val: number;
  _x: number;
  _y: number;

  constructor(val: number, pos: number[]) {
    this._val = val;
    this._x = pos[0];
    this._y = pos[1];
  }

  getVal() {
    return this._val;
  }

  getPosition() {
    return [this._x, this._y];
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
