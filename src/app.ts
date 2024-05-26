import { Dag, Edge } from "./Dag";
import { calcLongestPath } from "./calcLongestPath";
const dag: Dag = new Dag(5);
const adjList: Edge[][] = dag.getAdjList();

let idx: number = 0;
adjList.forEach((adjs) => {
  let str: String = "";
  adjs.forEach((edge) => {
    str += "(" + String(edge.getTo()) + ":" + String(edge.getWeight()) + ") ";
  });
  console.log("idx:" + idx + " " + str);
  idx++;
});

const maxLength = calcLongestPath(dag);
console.log("max length: " + maxLength);
