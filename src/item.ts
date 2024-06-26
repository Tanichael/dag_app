export class Item {
  constructor(private name: string, private price: number) {}

  public say(elem: HTMLElement | null): void {
    if (elem) {
      elem.innerHTML = "タイトル:" + this.name + " 価格: " + this.price + "円";
    }
  }
}
