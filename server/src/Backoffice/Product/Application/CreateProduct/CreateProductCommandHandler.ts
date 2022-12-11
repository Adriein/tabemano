import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Product } from 'Backoffice/Product/Domain/Entity/Product';
import { ProductAlreadyExistsError } from 'Backoffice/Product/Domain/Error/ProductAlreadyExistsError';
import { ProductFilter } from 'Backoffice/Product/Domain/Filter/ProductFilter';
import { IProductRepository } from 'Backoffice/Product/Domain/Repository/IProductRepository';
import { Log } from 'Shared/Domain/Decorators/Log';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { Url } from 'Shared/Domain/Vo/Url.vo';
import { CreateProductCommand } from './CreateProductCommand';

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler implements ICommandHandler {
  constructor(
    @Inject('IProductRepository')
    private readonly moduleRepository: IProductRepository
  ) {}

  @Log()
  public async execute(command: CreateProductCommand): Promise<void> {
    const name = new Name(command.name);
    const urlList = command.urlList.map((url: string) => {
      return new Url(url);
    });

    await this.checkIfModuleAlreadyExists(name);

    const module = Product.build(name, urlList);

    await this.moduleRepository.save(module);
  }

  private async checkIfModuleAlreadyExists(name: Name): Promise<void> {
    const filter = ProductFilter.create().withModuleName(name);

    const result = await this.moduleRepository.findOne(filter);

    if (result.isOk) {
      throw new ProductAlreadyExistsError();
    }
  }
}
