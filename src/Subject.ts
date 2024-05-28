import { IDisposable, Disposable } from "./IDisposable";
import { IObservable } from "./IObservable";
import { IObserver, Observer } from "./IObserver";

export class Subject<T> implements IObserver<T>, IObservable<T> {
  private _observers: IObserver<T>[];

  constructor() {
    this._observers = [];
  }
  onNext(value: T): void {
    this._observers.forEach((observer) => {
      observer.onNext(value);
    });
  }

  subscribe(observer: IObserver<T>): IDisposable {
    this._observers.push(observer);
    return new Disposable();
  }
}
