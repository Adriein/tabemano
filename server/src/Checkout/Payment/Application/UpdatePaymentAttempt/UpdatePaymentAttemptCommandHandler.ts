import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePaymentAttemptCommand } from "Checkout/Payment/Application/UpdatePaymentAttempt/UpdatePaymentAttemptCommand";
import { PaymentAttempt } from "Checkout/Payment/Domain/Entity/PaymentAttempt";
import { PaymentAttemptFilter } from "Checkout/Payment/Domain/Filter/PaymentAttemptFilter";
import { IPaymentAttemptRepository } from "Checkout/Payment/Domain/Repository/IPaymentAttemptRepository";
import { ID } from "Shared/Domain/Vo/Id.vo";

@CommandHandler(UpdatePaymentAttemptCommand)
export class UpdatePaymentAttemptCommandHandler implements ICommandHandler<UpdatePaymentAttemptCommand, void> {
  constructor(private readonly repository: IPaymentAttemptRepository) {}

  public async execute(command: UpdatePaymentAttemptCommand): Promise<void> {
    const paymentAttemptId = new ID(command.paymentAttemptId);

    const attempt = await this.findPaymentAttempt(paymentAttemptId);

    await attempt.markAsCompleted(this.repository);
  }

  private async findPaymentAttempt(id: ID): Promise<PaymentAttempt> {
    const filter = PaymentAttemptFilter.create().withId(id);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }
}