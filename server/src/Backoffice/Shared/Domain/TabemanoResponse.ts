import { Serializable } from "Backoffice/Shared/Domain/Serializable";
import { TabemanoMetadata } from "Backoffice/Shared/Domain/TabemanoMetadata";

export class TabemanoResponse<T extends Serializable> {
  public static build<T extends Serializable>(data: T[], metadata?: TabemanoMetadata) {
    return new TabemanoResponse(data, metadata);
  }

  constructor(private _data: T[], private _metadata?: TabemanoMetadata) {}


  public get data(): T[] {
    return this._data;
  }

  public get metadata(): TabemanoMetadata | undefined {
    return this._metadata;
  }

  public serialize() {
    return {
      data: this._data.map((data: T) => data.serialize()),
      metadata: this._metadata?.serialize()
    }
  }
}