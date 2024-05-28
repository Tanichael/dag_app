import { Dag, Edge } from "./Dag";
import { calcLongestPath } from "./calcLongestPath";
import { CircleRenderer } from "./CircleRenderer";
import { LineRenderer } from "./LineRenderer";
import { CanvasNode, CanvasEdge, calcPosition } from "./CanvasElement";
import { EventHandler } from "./EventHandler";
import { CanvasElementRepository } from "./CanvasElementRepository";
import { Observer } from "./IObserver";
import { clearCanvas } from "./clearCanvas";

const dagCnt = 5;
const dag: Dag = new Dag(dagCnt);
const adjList: Edge[][] = dag.getAdjList();

// let idx: number = 0;
// adjList.forEach((adjs) => {
//   let str: String = "";
//   adjs.forEach((edge) => {
//     str += "(" + String(edge.getTo()) + ":" + String(edge.getWeight()) + ") ";
//   });
//   console.log("idx:" + idx + " " + str);
//   idx++;
// });

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

const canvases = [canvasCircle, canvasLine, canvasText];

canvasCircle.style.width = canvasCircle.width / 2.0 + "px";
canvasCircle.style.height = canvasCircle.height / 2.0 + "px";

canvasLine.style.width = canvasLine.width / 2.0 + "px";
canvasLine.style.height = canvasLine.height / 2.0 + "px";

canvasText.style.width = canvasText.width / 2.0 + "px";
canvasText.style.height = canvasText.height / 2.0 + "px";

let canvasNodes = [];
for (let i = 0; i < dagCnt; i++) {
  const tempPos = calcPosition(i);
  const tempNode = new CanvasNode(i, tempPos);
  canvasNodes.push(tempNode);
}

CanvasElementRepository.getInstance().setCanvasNodes(canvasNodes);

let edges = [];
for (let i = 0; i < dagCnt; i++) {
  const adjs = adjList[i];
  for (let j = 0; j < adjs.length; j++) {
    const tempEdge = adjList[i][j];
    const tempFrom = tempEdge.getFrom();
    const tempTo = tempEdge.getTo();
    const tempWeight = tempEdge.getWeight();
    const tempCanvasEdge = new CanvasEdge(
      canvasNodes[tempFrom],
      canvasNodes[tempTo],
      tempWeight
    );
    edges.push(tempCanvasEdge);
  }
}

const circleRenderer = new CircleRenderer(canvasCircle, canvasText);
canvasNodes.forEach((canvasNode) => {
  circleRenderer.renderCircle(canvasNode);

  canvasNode.OnChangePosition.subscribe(
    new Observer((canvasNode) => {
      clearCanvas(canvases);
      canvasNodes.forEach((tempNode) => {
        circleRenderer.renderCircle(tempNode);
      });
      edges.forEach((tempEdge) => {
        lineRenderer.renderLine(tempEdge);
      });
    })
  );
});

const lineRenderer = new LineRenderer(canvasLine);
edges.forEach((edge) => {
  lineRenderer.renderLine(edge);
});

document.addEventListener("mousedown", EventHandler.onMouseDown);
document.addEventListener("mousemove", EventHandler.onMouseMove);
document.addEventListener("mouseup", EventHandler.onMouseUp);
