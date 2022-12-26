import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { Customer } from "Checkout/Payment/Domain/Entity/Customer";
import { PaymentAttempt } from "Checkout/Payment/Domain/Entity/PaymentAttempt";
import { Product } from "Checkout/Payment/Domain/Entity/Product";
import { CustomerFilter } from "Checkout/Payment/Domain/Filter/CustomerFilter";
import { ProductFilter } from "Checkout/Payment/Domain/Filter/ProductFilter";
import { ICustomerRepository } from "Checkout/Payment/Domain/Repository/ICustomerRepository";
import { IPaymentAttemptRepository } from "Checkout/Payment/Domain/Repository/IPaymentAttemptRepository";
import { IProductRepository } from "Checkout/Payment/Domain/Repository/IProductRepository";
import { PaymentService } from "Checkout/Payment/Domain/Service/PaymentService";
import { PaymentStartedDomainEvent } from "Checkout/Product/Application/BuyProduct/PaymentStartedDomainEvent";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Url } from "Shared/Domain/Vo/Url.vo";

@EventsHandler(PaymentStartedDomainEvent)
export class CreatePaymentAttemptEventHandler implements IEventHandler<PaymentStartedDomainEvent> {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly customerRepository: ICustomerRepository,
    private readonly paymentAttemptRepository: IPaymentAttemptRepository,
    private readonly service: PaymentService,
  ) {}

  public async handle(event: PaymentStartedDomainEvent): Promise<void> {
    const productId = event.productId;
    const customerId = event.customerId;

    const customer = await this.findCustomer(customerId);
    const product = await this.findProduct(productId);

    const attempt = PaymentAttempt.build(new Url(''), new Url(''), customer, product);

    await attempt.start(this.service);

    await this.paymentAttemptRepository.save(attempt);
  }

  private async findCustomer(id: ID): Promise<Customer> {
    const filter = CustomerFilter.create().withId(id);

    const result = await this.customerRepository.findOne(filter);

    return result.unwrap();
  }

  private async findProduct(id: ID): Promise<Product> {
    const filter = ProductFilter.create().withId(id);

    const result = await this.productRepository.findOne(filter);

    return result.unwrap();
  }
}