import { ProductModel } from 'Shared/Infrastructure/Persistance/Model/ProductModel';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { DateVo } from 'Shared/Domain/Vo/Date.vo';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Url } from 'Shared/Domain/Vo/Url.vo';
import { UrlProductModel } from 'Shared/Infrastructure/Persistance/Model/UrlProductModel';
import { Product } from 'Backoffice/Product/Domain/Entity/Product';

export class PgProductMapper implements IMapper<Product, ProductModel> {
  public toDomain(dataModel: ProductModel): Product {
    const urlList = dataModel.urlList.map((url: UrlProductModel) => {
      return url.url;
    });

    return new Product(
      dataModel.id,
      dataModel.name,
      urlList,
      dataModel.createdAt,
      dataModel.updatedAt
    );
  }

  public toModel(entity: Product): ProductModel {
    const model = new ProductModel();
    const urlList = this.buildUrlModel(entity);

    model.id = entity.id();
    model.name = entity.name();
    model.createdAt = entity.createdAt();
    model.updatedAt = entity.updatedAt();
    model.urlList = urlList;

    return model;
  }

  private buildUrlModel(entity: Product): UrlProductModel[] {
    return entity.urlList().map((url: Url) => {
      const model = new UrlProductModel();

      model.url = url;
      model.id = ID.generate();
      model.moduleId = entity.id();
      model.createdAt = DateVo.now().value;
      model.updatedAt = DateVo.now().value;

      return model;
    });
  }
}
