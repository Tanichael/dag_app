import { Dag } from "./Dag";

export class LongestPathCalculator {
  static _instance: LongestPathCalculator;
  _dist: number[] = [];

  private constructor() {}

  static getInstance() {
    if (!this._instance) {
      this._instance = new LongestPathCalculator();
    }
    return this._instance;
  }

  calcLongestPath(dag: Dag): number {
    console.log("calc");
    const topo: number[] = dag.getTopo();
    for (let i = 0; i < topo.length; i++) {
      this._dist.push(0);
    }
    topo.forEach((id) => {
      if (this._dist[id] == 0) {
        dfs(id, dag, this._dist);
      }
    });
    let maxLength = 0;

    this._dist.forEach((temp) => {
      maxLength = Math.max(maxLength, temp);
    });

    return maxLength;
  }
}

// export function calcLongestPath(dag: Dag): number {
//   const topo: number[] = dag.getTopo();
//   let dist: number[] = [];
//   for (let i = 0; i < topo.length; i++) {
//     dist.push(0);
//   }
//   topo.forEach((id) => {
//     if (dist[id] == 0) {
//       dfs(id, dag, dist);
//     }
//   });
//   let maxLength = 0;

//   dist.forEach((temp) => {
//     maxLength = Math.max(maxLength, temp);
//   });

//   return maxLength;
// }

function dfs(id: number, dag: Dag, dist: number[]) {
  dag.getAdjList()[id].forEach((edge) => {
    const to: number = edge.getTo();
    const weight: number = edge.getWeight();
    if (dist[to] < dist[id] + weight) {
      dist[to] = dist[id] + weight;
      dfs(to, dag, dist);
    }
  });
}
