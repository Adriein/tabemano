import { TrackingType } from "Backoffice/Shared/constants";

export class Tracking {
  constructor(private readonly _type: TrackingType) {}
  
  public type(): TrackingType {
    return this._type;
  }
}