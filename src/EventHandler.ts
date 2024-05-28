import { CanvasElementRepository } from "./CanvasElementRepository";
import { CanvasNode } from "./CanvasElement";

export class EventHandler {
  private static _draggingId: number = -1;
  private static _isDragging: boolean = false;

  static onMouseDown(e: MouseEvent) {
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
        EventHandler._draggingId = id;
        EventHandler._isDragging = true;
        console.log("id: " + id);
        break;
      }
    }
  }

  static onMouseMove(e: MouseEvent) {
    if (EventHandler._isDragging) {
      const mousePosX = e.clientX * 2;
      const mousePosY = e.clientY * 2;
      const canvasNodes =
        CanvasElementRepository.getInstance().getCanvasNodes();
      const draggingNode = canvasNodes[EventHandler._draggingId];
      draggingNode.setPosition([mousePosX, mousePosY]);
    }
  }

  static onMouseUp(e: MouseEvent) {
    if (EventHandler._isDragging) {
      EventHandler._draggingId = -1;
      EventHandler._isDragging = false;
    }
  }
}
