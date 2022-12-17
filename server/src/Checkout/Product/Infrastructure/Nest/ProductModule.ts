import { Module } from '@nestjs/common';
import { BuyProductCommandHandler } from "Checkout/Product/Application/BuyProduct/BuyProductCommandHandler";
import { GetProductListQueryHandler } from "Checkout/Product/Application/GetProductList/GetProductListQueryHandler";
import { GetProductListController } from "Checkout/Product/Infrastructure/Controller/GetProductList/GetProductListController";
import { PgProductMapper } from "Checkout/Product/Infrastructure/Persistance/Mapper/PgProductMapper";
import { PgProductRepository } from "Checkout/Product/Infrastructure/Persistance/Repository/PgProductRepository";
import { SharedModule } from "Shared/Infrastructure/Nest/SharedModule";


const Controllers = [
  GetProductListController
];

const Handlers = [
  GetProductListQueryHandler,
  BuyProductCommandHandler
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
