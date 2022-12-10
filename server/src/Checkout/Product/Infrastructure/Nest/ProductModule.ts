import { Module } from '@nestjs/common';
import { GetProductListController } from "Checkout/Product/Infrastructure/Controller/GetProductList/GetProductListController";
import { SharedModule } from "Shared/Infrastructure/Nest/SharedModule";


const Controllers = [ GetProductListController ];

@Module({
  imports: [ SharedModule ],
  controllers: [ ...Controllers ],
  providers: [],
  exports: [],
})
export class ProductModule {}
