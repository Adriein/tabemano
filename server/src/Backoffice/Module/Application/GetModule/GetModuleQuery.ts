import { IQuery } from '@nestjs/cqrs';

export class GetModuleQuery implements IQuery {
  constructor(private readonly _moduleId: string) {}

  public static fromJson(json: any): GetModuleQuery {
    return new GetModuleQuery(json.moduleId);
  }

  get moduleId(): string {
    return this._moduleId;
  }
}
