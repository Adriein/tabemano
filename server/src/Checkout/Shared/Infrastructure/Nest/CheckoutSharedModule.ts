import { Module } from "@nestjs/common";
import { StrapiPaymentService } from "Checkout/Shared/Infrastructure/Service/StrapiPaymentService";

const Repository = [
  {
    provide: 'PaymentService',
    useClass: StrapiPaymentService,
  },
];

@Module({
  imports: [],
  controllers: [],
  providers: [ ...Repository ],
  exports: [],
})
export class CheckoutSharedModule {}