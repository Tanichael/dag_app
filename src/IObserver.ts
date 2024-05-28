export interface IObserver<T> {
  onNext(value: T): void;
}

export class Observer<T> implements IObserver<T> {
  private _onNext: (value: T) => void;

  constructor(func: (value: T) => void) {
    this._onNext = func;
  }

  onNext(value: T): void {
    this._onNext(value);
  }
}
