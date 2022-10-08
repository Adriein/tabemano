import { Module } from 'Authorization/Permission/Domain/Entity/Module';

export class GetModuleResponse {
  public fromDomain(module: Module): GetModuleResponse {
    return new GetModuleResponse(module.id().value, module.name().value);
  }

  constructor(readonly id: string, readonly name: string) {}
}
