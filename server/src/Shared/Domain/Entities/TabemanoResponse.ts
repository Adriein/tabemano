import { Serializable } from "Shared/Domain/Interfaces/Serializable";
import { TabemanoMetadata } from "Shared/Domain/Entities/TabemanoMetadata";

export class TabemanoResponse<T extends Serializable> {
  public static build<T extends Serializable>(data: T[] | T, metadata?: TabemanoMetadata) {
    return new TabemanoResponse(data, metadata);
  }

  constructor(private _data: T[] | T, private _metadata?: TabemanoMetadata) {}


  public get data(): T[] | T {
    return this._data;
  }

  public get metadata(): TabemanoMetadata | undefined {
    return this._metadata;
  }

  public serialize() {
    if (Array.isArray(this._data)) {
      return {
        data: this._data.map((data: T) => data.serialize()),
        metadata: this._metadata?.serialize()
      }
    }
    
    return {
      data: this._data.serialize(),
      metadata: this._metadata?.serialize()
    }
  }
}