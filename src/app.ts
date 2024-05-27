import { Dag, Edge } from "./Dag";
import { calcLongestPath } from "./calcLongestPath";
import { CircleRenderer } from "./CircleRenderer";
import { LineRenderer } from "./LineRenderer";
import { CanvasNode, CanvasEdge, calcPosition } from "./CanvasElement";

const dagCnt = 5;
const dag: Dag = new Dag(dagCnt);
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

const canvasCircle: HTMLCanvasElement = document.getElementById(
  "canvas-circle"
) as HTMLCanvasElement;

const canvasLine: HTMLCanvasElement = document.getElementById(
  "canvas-line"
) as HTMLCanvasElement;

const canvasText: HTMLCanvasElement = document.getElementById(
  "canvas-text"
) as HTMLCanvasElement;

canvasCircle.style.width = canvasCircle.width / 2.0 + "px";
canvasCircle.style.height = canvasCircle.height / 2.0 + "px";

canvasLine.style.width = canvasLine.width / 2.0 + "px";
canvasLine.style.height = canvasLine.height / 2.0 + "px";

canvasText.style.width = canvasText.width / 2.0 + "px";
canvasText.style.height = canvasText.height / 2.0 + "px";

let nodes = [];
for (let i = 0; i < dagCnt; i++) {
  const tempPos = calcPosition(i);
  const tempNode = new CanvasNode(i, tempPos);
  nodes.push(tempNode);
}

let edges = [];
for (let i = 0; i < dagCnt; i++) {
  const adjs = adjList[i];
  for (let j = 0; j < adjs.length; j++) {
    const tempEdge = adjList[i][j];
    const tempFrom = tempEdge.getFrom();
    const tempTo = tempEdge.getTo();
    const tempWeight = tempEdge.getWeight();
    const tempCanvasEdge = new CanvasEdge(
      nodes[tempFrom],
      nodes[tempTo],
      tempWeight
    );
    edges.push(tempCanvasEdge);
  }
}

const pos0 = calcPosition(0);
const pos1 = calcPosition(1);
const pos2 = calcPosition(2);

const node0 = new CanvasNode(0, pos0);
const node1 = new CanvasNode(1, pos1);
const node2 = new CanvasNode(2, pos2);
const edge0 = new CanvasEdge(node0, node1, 10);
const edge1 = new CanvasEdge(node2, node1, 5);

const circleRenderer = new CircleRenderer(canvasCircle, canvasText);
nodes.forEach((node) => {
  circleRenderer.renderCircle(node);
});

const lineRenderer = new LineRenderer(canvasLine);
edges.forEach((edge) => {
  lineRenderer.renderLine(edge);
});
