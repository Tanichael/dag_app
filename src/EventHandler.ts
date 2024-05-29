import { CanvasElementRepository } from "./CanvasElementRepository";
import { CanvasNode } from "./CanvasElement";
import { GameLogicUsecase } from "./GameLogicUsecase";

export class EventHandler {
  private static _holdingId: number = -1;
  private static _isHolding: boolean = false;
  private static _holdingPoint: number[] = [-1, -1];
  private static _selectingId: number = -1;
  private static _draggingId: number = -1;
  private static _isDragging: boolean = false;
  private static _dragThreshold: number = 10;
  private static _isLock: boolean = false;

  static Lock() {
    EventHandler._isLock = true;
  }

  static Unlock() {
    EventHandler._isLock = false;
  }

  static onMouseDown(e: MouseEvent) {
    if (EventHandler._isLock === true) return;
    const mousePosX = e.clientX * 2;
    const mousePosY = e.clientY * 2;
    const canvasNodes = CanvasElementRepository.getInstance().getCanvasNodes();

    for (let i = 0; i < canvasNodes.length; i++) {
      const canvasNode = canvasNodes[i];
      const nodePosX = canvasNode.getPosition()[0];
      const nodePosY = canvasNode.getPosition()[1];
      const id = canvasNode.getVal();
      const radius = CanvasNode.getRadius();
      const distance = Math.sqrt(
        Math.pow(mousePosX - nodePosX, 2) + Math.pow(mousePosY - nodePosY, 2)
      );

      if (distance <= radius) {
        EventHandler._isHolding = true;
        EventHandler._holdingId = id;
        EventHandler._draggingId = id;
        EventHandler._holdingPoint = [mousePosX, mousePosY];
        // EventHandler._isDragging = true;
        // console.log("id: " + id);
        break;
      }
    }
  }

  static onMouseMove(e: MouseEvent) {
    const mousePosX = e.clientX * 2;
    const mousePosY = e.clientY * 2;
    const moveDist = Math.sqrt(
      Math.pow(mousePosX - EventHandler._holdingPoint[0], 2) +
        Math.pow(mousePosY - EventHandler._holdingPoint[1], 2)
    );
    if (EventHandler._isHolding && moveDist > EventHandler._dragThreshold) {
      EventHandler._isDragging = true;
      EventHandler._draggingId = EventHandler._holdingId;
      EventHandler._isHolding = false;
      EventHandler._holdingId = -1;
    }
    if (EventHandler._isDragging) {
      const canvasNodes =
        CanvasElementRepository.getInstance().getCanvasNodes();
      const draggingNode = canvasNodes[EventHandler._draggingId];
      draggingNode.setPosition([mousePosX, mousePosY]);
    }
  }

  static onMouseUp(e: MouseEvent) {
    if (EventHandler._isDragging) {
      EventHandler._isDragging = false;
      EventHandler._draggingId = -1;
    }
    if (EventHandler._isHolding) {
      EventHandler._selectingId = EventHandler._holdingId;
      //   console.log("selected: " + EventHandler._selectingId);
      const canvasNodes =
        CanvasElementRepository.getInstance().getCanvasNodes();
      const dag = CanvasElementRepository.getInstance().getDag();
      if (dag !== null) {
        GameLogicUsecase.getInstance().judge(
          canvasNodes[EventHandler._selectingId],
          dag
        );
      }
      EventHandler._isHolding = false;
      EventHandler._holdingId = -1;
      EventHandler._selectingId = -1;
    }
  }
}
