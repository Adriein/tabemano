import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Module } from 'Authorization/Permission/Domain/Entity/Module';
import { ModuleFilter } from 'Authorization/Permission/Domain/Filter/ModuleFilter';
import { ModuleAlreadyExistsError } from 'Backoffice/Module/Domain/Error/ModuleAlreadyExistsError';
import { IModuleRepository } from 'Backoffice/Module/Domain/Repository/IModuleRepository';
import { Log } from 'Shared/Domain/Decorators/Log';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { Url } from 'Shared/Domain/Vo/Url.vo';
import { CreateModuleCommand } from './CreateModuleCommand';

@CommandHandler(CreateModuleCommand)
export class CreateModuleCommandHandler implements ICommandHandler {
  constructor(@Inject('IModuleRepository') private readonly moduleRepository: IModuleRepository) {}

  @Log()
  public async execute(command: CreateModuleCommand): Promise<void> {
    const name = new Name(command.name);
    const urlList = command.urlList.map((url: string) => {
      return new Url(url);
    });

    this.checkIfModuleAlreadyExists(name);

    const module = Module.build(name, urlList);

    await this.moduleRepository.save(module);
  }

  private async checkIfModuleAlreadyExists(name: Name): Promise<void> {
    const filter = ModuleFilter.create().withModuleName(name);

    const result = await this.moduleRepository.findOne(filter);

    if (result.isOk) {
      throw new ModuleAlreadyExistsError();
    }
  }
}
