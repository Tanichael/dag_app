import { CanvasElementRepository } from "./CanvasElementRepository";
import { Dag } from "./Dag";
import { Edge } from "./Dag";
import { calcPosition } from "./CanvasElement";
import { CanvasNode, CanvasEdge } from "./CanvasElement";
import { CircleRenderer } from "./CircleRenderer";
import { LineRenderer } from "./LineRenderer";
import { Observer } from "./IObserver";
import { CanvasPainter } from "./clearCanvas";

export function initCanvas(): HTMLCanvasElement[] {
  const canvasCircle: HTMLCanvasElement = document.getElementById(
    "canvas-circle"
  ) as HTMLCanvasElement;

  const canvasLine: HTMLCanvasElement = document.getElementById(
    "canvas-line"
  ) as HTMLCanvasElement;

  const canvasText: HTMLCanvasElement = document.getElementById(
    "canvas-text"
  ) as HTMLCanvasElement;

  const rate = 2.0;
  const canvases = [canvasCircle, canvasLine, canvasText];

  canvases.forEach((canvas) => {
    canvas.style.width = canvas.width / rate + "px";
    canvas.style.height = canvas.height / rate + "px";
  });

  return canvases;
}

export function initGame(
  dagCnt: number,
  circleRenderer: CircleRenderer,
  lineRenderer: LineRenderer,
  canvases: HTMLCanvasElement[]
) {
  CanvasPainter.getInstance().clearCanvas(canvases);
  const dag: Dag = new Dag(dagCnt);
  const adjList: Edge[][] = dag.getAdjList();

  const maxLength = dag.getLongestPath();
  //   console.log("max length: " + maxLength);

  let canvasNodes = [];
  for (let i = 0; i < dagCnt; i++) {
    const tempPos = calcPosition(i);
    const tempNode = new CanvasNode(i, tempPos);
    canvasNodes.push(tempNode);
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
        canvasNodes[tempFrom],
        canvasNodes[tempTo],
        tempWeight
      );
      edges.push(tempCanvasEdge);
    }
  }

  CanvasElementRepository.getInstance().setDag(dag);
  CanvasElementRepository.getInstance().setCanvasNodes(canvasNodes);
  CanvasElementRepository.getInstance().setCanvasEdges(edges);

  canvasNodes.forEach((canvasNode) => {
    circleRenderer.renderCircle(canvasNode);

    canvasNode.OnChangePosition.subscribe(
      new Observer((canvasNode) => {
        CanvasPainter.getInstance().reloadCanvas(
          canvases,
          canvasNodes,
          edges,
          circleRenderer,
          lineRenderer
        );
      })
    );

    canvasNode.OnSelected.subscribe(
      new Observer((canvasNode) => {
        CanvasPainter.getInstance().reloadCanvas(
          canvases,
          canvasNodes,
          edges,
          circleRenderer,
          lineRenderer
        );
      })
    );
  });

  edges.forEach((edge) => {
    lineRenderer.renderLine(edge);
  });
}
