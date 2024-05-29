import { CircleRenderer } from "./CircleRenderer";
import { LineRenderer } from "./LineRenderer";
import { EventHandler } from "./EventHandler";
import { Observer } from "./IObserver";
import { GameLogicUsecase } from "./GameLogicUsecase";
import { initCanvas, initGame } from "./init";
import { CanvasPainter } from "./clearCanvas";
import { CanvasElementRepository } from "./CanvasElementRepository";

const canvases = initCanvas();

const circleRenderer = new CircleRenderer(canvases[0], canvases[2]);
const lineRenderer = new LineRenderer(canvases[1]);

document.addEventListener("mousedown", EventHandler.onMouseDown);
document.addEventListener("mousemove", EventHandler.onMouseMove);
document.addEventListener("mouseup", EventHandler.onMouseUp);

initGame(5, circleRenderer, lineRenderer, canvases);
const gameLogicUseCase = GameLogicUsecase.getInstance();
gameLogicUseCase.ClearSubject.subscribe(
  new Observer((isClear) => {
    EventHandler.Lock();
    CanvasPainter.getInstance().reloadCanvas(
      canvases,
      CanvasElementRepository.getInstance().getCanvasNodes(),
      CanvasElementRepository.getInstance().getCanvasEdges(),
      circleRenderer,
      lineRenderer
    );
    setTimeout(() => {
      CanvasElementRepository.getInstance()
        .getCanvasNodes()
        .forEach((canvasNode) => {
          canvasNode.setIsSelected(false);
        });
      const cnt = 5 + Math.floor(Math.random() * 3);
      initGame(cnt, circleRenderer, lineRenderer, canvases);
      EventHandler.Unlock();
    }, 250);
  })
);

gameLogicUseCase.WrongSubject.subscribe(
  new Observer((isWrong) => {
    EventHandler.Lock();
    CanvasPainter.getInstance().reloadCanvas(
      canvases,
      CanvasElementRepository.getInstance().getCanvasNodes(),
      CanvasElementRepository.getInstance().getCanvasEdges(),
      circleRenderer,
      lineRenderer
    );

    setTimeout(() => {
      CanvasElementRepository.getInstance()
        .getCanvasNodes()
        .forEach((canvasNode) => {
          canvasNode.setIsWrong(false);
        });

      CanvasPainter.getInstance().reloadCanvas(
        canvases,
        CanvasElementRepository.getInstance().getCanvasNodes(),
        CanvasElementRepository.getInstance().getCanvasEdges(),
        circleRenderer,
        lineRenderer
      );
      EventHandler.Unlock();
    }, 200);
  })
);
