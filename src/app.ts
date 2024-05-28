import { CircleRenderer } from "./CircleRenderer";
import { LineRenderer } from "./LineRenderer";
import { EventHandler } from "./EventHandler";
import { Observer } from "./IObserver";
import { GameLogicUsecase } from "./GameLogicUsecase";
import { initCanvas, initGame } from "./init";

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
    const cnt = 5 + Math.random() * 3;
    initGame(cnt, circleRenderer, lineRenderer, canvases);
  })
);
