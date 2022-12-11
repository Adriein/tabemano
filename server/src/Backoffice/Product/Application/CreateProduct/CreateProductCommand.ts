import { ICommand } from '@nestjs/cqrs';
import { CreateProductApiRequest } from 'Backoffice/Product/Infrastructure/Controller/CreateProductApiRequest';

export class CreateProductCommand implements ICommand {
  public static fromJson(json: CreateProductApiRequest): CreateProductCommand {
    return new CreateProductCommand(json.name, json.urlList);
  }

  constructor(private readonly _name: string, private readonly _urlList: string[]) {}

  public get name(): string {
    return this._name;
  }

  public get urlList(): string[] {
    return this._urlList;
  }
}
