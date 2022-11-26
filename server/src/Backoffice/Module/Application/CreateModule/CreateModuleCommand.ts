import { ICommand } from '@nestjs/cqrs';
import { CreateModuleApiRequest } from 'Backoffice/Module/Infrastructure/Controller/CreateModuleApiRequest';

export class CreateModuleCommand implements ICommand {
  public static fromJson(json: CreateModuleApiRequest): CreateModuleCommand {
    return new CreateModuleCommand(json.name, json.urlList);
  }

  constructor(private readonly _name: string, private readonly _urlList: string[]) {}

  public get name(): string {
    return this._name;
  }

  public get urlList(): string[] {
    return this._urlList;
  }
}
