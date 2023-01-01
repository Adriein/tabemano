import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { IOrderRepository } from "Checkout/Order/Domain/Repository/IOrderRepository";
import { PaymentSucceededDomainEvent } from "Checkout/Payment/Application/UpdatePaymentAttempt/PaymentSucceededDomainEvent";

@EventsHandler(PaymentSucceededDomainEvent)
export class CreateOrderCommandHandler implements IEventHandler<PaymentSucceededDomainEvent> {
  constructor(private readonly repository: IOrderRepository) {}

  public async handle(event: PaymentSucceededDomainEvent): Promise<void> {

  }
}