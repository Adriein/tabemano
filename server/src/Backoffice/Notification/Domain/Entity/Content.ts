export class Content {
  constructor(private readonly _content: string) {}
  
  public content(): string {
    return this._content;
  }
}
