import { Module } from '@nestjs/common';
import { ProductModule } from "Checkout/Product/Infrastructure/Nest/ProductModule";
import { CheckoutSharedModule } from "Checkout/Shared/Infrastructure/Nest/CheckoutSharedModule";


@Module({
  imports: [
    ProductModule,
    CheckoutSharedModule
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CheckoutBoundedContext {}
