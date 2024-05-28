export class Dag {
  _cnt: number;
  _adjList: Edge[][];
  _topo: number[];
  _dist: DistNode[];

  _longestPath: number;
  _longestList: number[][];

  constructor(cnt: number) {
    this._cnt = cnt;
    this._topo = this._makeTopo(cnt);
    this._adjList = this._createEdges(this._topo);
    this._dist = [];
    this._longestPath = this._calcLongestPath();
    this._longestList = this._calcLongestList();
    // this._longestList.forEach((path) => {
    //   let str = "longest: ";
    //   path.forEach((id) => {
    //     str += String(id) + " ";
    //   });
    //   console.log(str);
    // });
  }

  getCnt(): number {
    return this._cnt;
  }

  getAdjList(): Edge[][] {
    return this._adjList;
  }

  getTopo(): number[] {
    return this._topo;
  }

  getLongestPath(): number {
    return this._longestPath;
  }

  getLongestList(): number[][] {
    return this._longestList;
  }

  private _calcLongestPath(): number {
    const topo: number[] = this.getTopo();
    for (let i = 0; i < topo.length; i++) {
      this._dist.push({
        id: i,
        dist: 0,
        parent: [],
      });
    }
    topo.forEach((id) => {
      if (this._dist[id].dist == 0) {
        dfs(id, this, this._dist);
      }
    });
    let maxLength = 0;

    this._dist.forEach((tempDistNode) => {
      maxLength = Math.max(maxLength, tempDistNode.dist);
    });

    return maxLength;
  }

  private _calcLongestList(): number[][] {
    let longestList: number[][] = [];
    for (let i = 0; i < this._cnt; i++) {
      if (this._longestPath === this._dist[i].dist) {
        const tempPaths = this._makeLongestPath(this._dist[i], [[]]);
        tempPaths.forEach((path) => {
          longestList.push(path);
        });
      }
    }
    longestList.forEach((path) => {
      path.reverse();
    });
    return longestList;
  }

  private _createEdges(topo: number[]): Edge[][] {
    const adjList: Edge[][] = [];
    // adjList.push([new Edge(0, 1, 1)]);
    // adjList.push([new Edge(1, 2, 1), new Edge(1, 3, 2), new Edge(1, 4, 2)]);
    // adjList.push([new Edge(2, 4, 1)]);
    // adjList.push([]);
    // adjList.push([]);
    // return adjList;

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

  private _makeTopo(cnt: number): number[] {
    // return [0, 1, 2, 3, 4];
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

    // let tempStr = "";
    // topo.forEach((id) => {
    //   tempStr = tempStr + String(id) + " ";
    // });
    // console.log(tempStr);
    return topo;
  }

  private _makeLongestPath(distNode: DistNode, paths: number[][]): number[][] {
    // console.log("id: " + distNode.id);
    paths.forEach((eachPath) => {
      // let str = "";
      // eachPath.forEach((id) => {
      //   str += String(id) + " ";
      // });
      // console.log("path; " + str);
      eachPath.push(distNode.id);
    });

    let allPaths: number[][] = [];
    if (distNode.parent.length === 0) {
      allPaths = paths;
    } else {
      distNode.parent.forEach((parentId) => {
        // console.log("parentId: " + parentId);
        const nextDistNode = this._dist[parentId];
        //pathをコピーする
        let tempPath: number[][] = [];
        paths.forEach((path) => {
          const nextPath = [...path];
          tempPath.push(nextPath);
        });
        const returnPaths = this._makeLongestPath(nextDistNode, tempPath);
        // console.log(
        //   "parentid: " + parentId + " returnpaths; " + returnPaths.toString()
        // );
        returnPaths.forEach((path) => {
          allPaths.push(path);
        });
      });
    }

    // console.log("id: " + distNode.id + " allPaths; " + allPaths.toString());
    return allPaths;
  }
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

function dfs(id: number, dag: Dag, dist: DistNode[]) {
  dag.getAdjList()[id].forEach((edge) => {
    const to: number = edge.getTo();
    const weight: number = edge.getWeight();
    if (dist[to].dist <= dist[id].dist + weight) {
      if (dist[to].dist === dist[id].dist + weight) {
        dist[to].parent.push(id);
      } else {
        dist[to].parent = [id];
      }
      dist[to].dist = dist[id].dist + weight;
      dfs(to, dag, dist);
    }
  });
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

type DistNode = {
  id: number;
  dist: number;
  parent: number[];
};
