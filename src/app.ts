import { Dag, Edge } from "./Dag";
import { calcLongestPath } from "./calcLongestPath";
import { CircleRenderer } from "./CircleRenderer";
import { LineRenderer } from "./LineRenderer";
import { CanvasNode, CanvasEdge, calcPosition } from "./CanvasElement";

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

const pos0 = calcPosition(0);
const pos1 = calcPosition(1);

const node0 = new CanvasNode(0, pos0);
const node1 = new CanvasNode(1, pos1);
const edge0 = new CanvasEdge(node0, node1, 10);

const circleRenderer = new CircleRenderer(canvasCircle, canvasText);
circleRenderer.renderCircle(node0);
circleRenderer.renderCircle(node1);

const lineRenderer = new LineRenderer(canvasLine);
lineRenderer.renderLine(edge0);
