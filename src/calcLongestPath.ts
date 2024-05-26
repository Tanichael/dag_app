import { Dag } from "./Dag";
export function calcLongestPath(dag: Dag): number {
  const topo: number[] = dag.getTopo();
  let dist: number[] = [];
  for (let i = 0; i < topo.length; i++) {
    dist.push(0);
  }
  topo.forEach((id) => {
    if (dist[id] == 0) {
      dfs(id, dag, dist);
    }
  });
  let maxLength = 0;

  dist.forEach((temp) => {
    maxLength = Math.max(maxLength, temp);
  });

  return maxLength;
}

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
