import { Result } from "@badrap/result";
import { Inject } from "@nestjs/common";
import { Product } from "Checkout/Product/Domain/Entity/Product";
import { ProductFilter } from "Checkout/Product/Domain/Filter/ProductFilter";
import { IProductRepository } from "Checkout/Product/Domain/Repository/IProductRepository";
import { PgProductMapper } from "Checkout/Product/Infrastructure/Persistance/Mapper/PgProductMapper";
import { ClassConstructor } from "class-transformer";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { ProductModel } from "Shared/Infrastructure/Persistance/Model/ProductModel";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource } from "typeorm";

export class PgProductRepository extends TypeOrmRepository<ProductModel> implements IProductRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
    private readonly mapper: PgProductMapper
  ) {
    super();
  }

  protected entitySchema(): ClassConstructor<ProductModel> {
    return ProductModel;
  }

  public async delete(entity: Product): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: ProductFilter): Promise<Result<Product[], Error>> {
    throw new Error();
  }

  public async findOne(filter: ProductFilter): Promise<Result<Product, Error | RecordNotFoundError>> {
    throw new Error();
  }

  public async save(entity: Product): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async update(entity: Product): Promise<void> {
    return Promise.resolve(undefined);
  }

}