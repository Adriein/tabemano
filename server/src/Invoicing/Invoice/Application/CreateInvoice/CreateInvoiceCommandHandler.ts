import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { CreateInvoiceCommand } from "Invoicing/Invoice/Application/CreateInvoice/CreateInvoiceCommand";

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceCommandHandler implements ICommandHandler {
  constructor(private readonly queryBus: QueryBus) {}

  public async execute(command: CreateInvoiceCommand): Promise<void> {
    return Promise.resolve(undefined);
  }
}