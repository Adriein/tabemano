import { Product } from "Checkout/Product/Domain/Entity/Product";
import { Money } from "Shared/Domain/Entities/Money";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { Currency } from "Shared/Domain/Vo/Currency.vo";
import { ProductModel } from "Shared/Infrastructure/Persistance/Model/ProductModel";

export class PgProductMapper implements IMapper<Product, ProductModel> {
  public toDomain(dataModel: ProductModel): Product {
    return new Product(
      dataModel.id,
      dataModel.name,
      new Money(dataModel.price, new Currency('EUR')),
      dataModel.createdAt,
      dataModel.updatedAt
    );
  }

  public toModel(entity: Product): ProductModel {
    const model = new ProductModel();
    model.id = entity.id();
    model.name = entity.name();
    model.price = entity.price().amount();
    model.createdAt = entity.createdAt();
    model.updatedAt = entity.updatedAt();

    return model;
  }

}