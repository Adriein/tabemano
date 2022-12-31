import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { PaymentSucceededDomainEvent } from "Checkout/Payment/Application/UpdatePaymentAttempt/PaymentSucceededDomainEvent";

@EventsHandler(PaymentSucceededDomainEvent)
export class CreateOrderCommandHandler implements IEventHandler<PaymentSucceededDomainEvent> {
  public async handle(event: PaymentSucceededDomainEvent): Promise<void> {
  }
}