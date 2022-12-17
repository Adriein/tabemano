import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BuyProductCommand } from "Checkout/Product/Application/BuyProduct/BuyProductCommand";

@CommandHandler(BuyProductCommand)
export class BuyProductCommandHandler implements ICommandHandler {
  public execute(command: BuyProductCommand): Promise<void> {
    return Promise.resolve(undefined);
  }

}