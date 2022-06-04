import { IQuery } from "@nestjs/cqrs";

export class GetClientProfileQuery implements IQuery {
  public static fromRequest(json: any): GetClientProfileQuery {
    return new GetClientProfileQuery(json.params.id);
  }

  constructor(private _clientId: string) {}

  public get clientId(): string {
    return this._clientId;
  }
}