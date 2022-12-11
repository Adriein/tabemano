import { Module } from '@nestjs/common';
import { GetProductListQueryHandler } from "Checkout/Product/Application/GetProductList/GetProductListQueryHandler";
import { GetProductListController } from "Checkout/Product/Infrastructure/Controller/GetProductList/GetProductListController";
import { PgProductRepository } from "Checkout/Product/Infrastructure/Persistance/Repository/PgProductRepository";
import { SharedModule } from "Shared/Infrastructure/Nest/SharedModule";


const Controllers = [ GetProductListController ];
const Handlers = [ GetProductListQueryHandler ];
const Repository = [
  {
    provide: 'IProductRepository',
    useClass: PgProductRepository,
  },
];

@Module({
  imports: [ SharedModule ],
  controllers: [ ...Controllers ],
  providers: [ ...Handlers, ...Repository ],
  exports: [],
})
export class ProductModule {}
