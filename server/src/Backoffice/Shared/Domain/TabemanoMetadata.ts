export class TabemanoMetadata {
  public static build(page: number, quantity: number) {
    return new TabemanoMetadata(page, quantity);
  }

  constructor(private _page: number, private _quantity: number) {}

  public serialize() {
    return {
      page: this._page,
      quantity: this._quantity
    }
  }
}