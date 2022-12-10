import { Module } from '@nestjs/common';
import { ProductModule } from "Checkout/Product/Infrastructure/Nest/ProductModule";


@Module({
  imports: [
    ProductModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CheckoutBoundedContext {}
