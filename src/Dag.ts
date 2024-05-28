export class Dag {
  _cnt: number;
  _adjList: Edge[][];
  _topo: number[];
  constructor(cnt: number) {
    this._cnt = cnt;
    this._topo = this._makeTopo(cnt);
    this._adjList = this._createEdges(this._topo);
  }

  getAdjList(): Edge[][] {
    return this._adjList;
  }

  getTopo(): number[] {
    return this._topo;
  }

  _createEdges(topo: number[]): Edge[][] {
    const adjList: Edge[][] = [];
    for (let i = 0; i < topo.length; i++) {
      adjList[i] = [];
    }
    for (let i = 0; i < topo.length; i++) {
      const adjs: Edge[] = [];
      for (let j = i + 1; j < topo.length; j++) {
        //ひとつは確実に繋ぐ
        if (adjs.length === 0) {
          const weight: number = getRandomInt(10) + 1;
          adjs.push(new Edge(topo[i], topo[j], weight));
          continue;
        }
        //残りは1/4の確率で繋ぐ
        if (getRandomInt(4) == 0) {
          const weight: number = getRandomInt(10) + 1;
          adjs.push(new Edge(topo[i], topo[j], weight));
        }
      }
      adjList[topo[i]] = adjs;
    }
    return adjList;
  }

  _makeTopo(cnt: number): number[] {
    const topo: number[] = [];
    const remains: number[] = [];
    for (let i = 1; i < cnt; i++) {
      remains.push(i);
    }
    topo.push(0);
    for (let i = 0; i < cnt - 1; i++) {
      const nextNodeIdx = getRandomInt(cnt - i - 1);
      const nextNode = remains[nextNodeIdx];
      topo.push(nextNode);
      remains.splice(nextNodeIdx, 1);
    }

    let tempStr = "";
    topo.forEach((id) => {
      tempStr = tempStr + String(id) + " ";
    });
    console.log(tempStr);
    return topo;
  }
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export class Edge {
  _from: number;
  _to: number;
  _weight: number;

  constructor(from: number, to: number, weight: number) {
    this._from = from;
    this._to = to;
    this._weight = weight;
  }

  getFrom() {
    return this._from;
  }

  getTo() {
    return this._to;
  }

  getWeight() {
    return this._weight;
  }
}
