import { Module } from '@nestjs/common';
import { BuyProductCommandHandler } from "Checkout/Product/Application/BuyProduct/BuyProductCommandHandler";
import { GetProductListQueryHandler } from "Checkout/Product/Application/GetProductList/GetProductListQueryHandler";
import { ProductDetailQueryHandler } from "Checkout/Product/Application/ProductDetail/ProductDetailQueryHandler";
import { GetProductListController } from "Checkout/Product/Infrastructure/Controller/GetProductList/GetProductListController";
import { ProductDetailController } from "Checkout/Product/Infrastructure/Controller/ProductDetail/ProductDetailController";
import { PgProductMapper } from "Checkout/Product/Infrastructure/Persistance/Mapper/PgProductMapper";
import { PgProductRepository } from "Checkout/Product/Infrastructure/Persistance/Repository/PgProductRepository";
import { SharedModule } from "Shared/Infrastructure/Nest/SharedModule";


const Controllers = [
  GetProductListController,
  ProductDetailController
];

const Handlers = [
  GetProductListQueryHandler,
  BuyProductCommandHandler,
  ProductDetailQueryHandler
];

const Repository = [
  {
    provide: 'IProductRepository',
    useClass: PgProductRepository,
  },
];

const Mapper = [
  PgProductMapper
];

@Module({
  imports: [ SharedModule ],
  controllers: [ ...Controllers ],
  providers: [ ...Handlers, ...Repository, ...Mapper ],
  exports: [],
})
export class ProductModule {}
