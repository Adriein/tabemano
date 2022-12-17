import { Serializable } from "Shared/Domain/Interfaces/Serializable";

export class TabemanoMetadata implements Serializable {
  public static build(succeeded: boolean, queryParams?: any, error?: Error) {
    return new TabemanoMetadata(succeeded, queryParams, error);
  }

  constructor(private _succeeded: boolean, private _queryParams?: any, private _error?: Error) {}

  public serialize() {
    return {
      succeeded: this._succeeded,
      queryParams: this._queryParams,
      error: this._error
    }
  }
}