import { Dag } from "./Dag";
import { CanvasNode } from "./CanvasElement";
import { Subject } from "./Subject";

export class GameLogicUsecase {
  private static _instance: GameLogicUsecase;

  _selectedList: CanvasNode[];
  ClearSubject: Subject<boolean>;

  private constructor() {
    this._selectedList = [];
    this.ClearSubject = new Subject<boolean>();
  }

  static getInstance() {
    if (!GameLogicUsecase._instance) {
      GameLogicUsecase._instance = new GameLogicUsecase();
    }
    return GameLogicUsecase._instance;
  }

  judge(canvasNode: CanvasNode, dag: Dag) {
    const longestList = dag.getLongestList();
    let isOk = false;
    let isClear = false;
    for (let pathIdx = 0; pathIdx < longestList.length; pathIdx++) {
      const path = longestList[pathIdx];
      for (let i = 0; i < this._selectedList.length; i++) {
        if (this._selectedList[i].getVal() != path[i]) {
          continue;
        }
      }
      const next = path[this._selectedList.length];
      if (canvasNode.getVal() === next) {
        isOk = true;
        if (this._selectedList.length + 1 == path.length) {
          isClear = true;
        }
        break;
      }
    }

    if (isClear) {
      console.log("Good Job!");
      this._selectedList.forEach((canvasNode) => {
        canvasNode.setSelected(false);
      });
      this._selectedList = [];
      this.ClearSubject.onNext(true);
    } else if (isOk) {
      canvasNode.setSelected(true);
      this._selectedList.push(canvasNode);
    } else {
      this._selectedList.forEach((canvasNode) => {
        canvasNode.setSelected(false);
      });
      this._selectedList = [];
    }
  }
}
