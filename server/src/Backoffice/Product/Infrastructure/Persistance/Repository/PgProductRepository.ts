import { Inject, Injectable } from '@nestjs/common';
import Database from 'Shared/Infrastructure/Persistance/Database';
import { ProductModel } from 'Shared/Infrastructure/Persistance/Model/ProductModel';
import { IProductRepository } from 'Backoffice/Product/Domain/Repository/IProductRepository';
import { Filter } from 'Shared/Domain/Entities/Filter';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { TypeOrmRepository } from 'Shared/Infrastructure/Persistance/Repository/TypeOrmRepository';
import { DataSource } from 'typeorm';
import { PgProductMapper } from '../Mapper/PgProductMapper';
import { TypeOrmProductFilterAdapter } from '../Filter/TypeOrmProductFilterAdapter';
import { Product } from 'Backoffice/Product/Domain/Entity/Product';
import { Result } from '@badrap/result';
import { ProductFilter } from 'Backoffice/Product/Domain/Filter/ProductFilter';

@Injectable()
export class PgProductRepository
  extends TypeOrmRepository<ProductModel>
  implements IProductRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION) protected readonly dataSource: DataSource,
    private readonly mapper: PgProductMapper
  ) {
    super();
  }

  public async findOne(filter: ProductFilter): Promise<Result<Product, Error | RecordNotFoundError>> {
    const adapter = new TypeOrmProductFilterAdapter(filter);
    const result = await this.repository().findOne(adapter.apply());

    return result ? Result.ok(this.mapper.toDomain(result)) : Result.err(new RecordNotFoundError());
  }

  public async find(filter: Filter): Promise<Result<Product[], Error>> {
    throw new Error('Method not implemented.');
  }

  public async save(entity: Product): Promise<void> {
    const model = this.mapper.toModel(entity);

    await this.repository().save(model);
  }

  public async update(entity: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(entity: Product): Promise<void> {
    throw new Error('Method not implemented.');
  }

  protected entitySchema() {
    return ProductModel;
  }
}
