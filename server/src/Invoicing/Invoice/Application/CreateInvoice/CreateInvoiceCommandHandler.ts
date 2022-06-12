import { CommandHandler, ICommandHandler, IQueryBus } from "@nestjs/cqrs";
import { CreateInvoiceCommand } from "Invoicing/Invoice/Application/CreateInvoice/CreateInvoiceCommand";
import { InvoiceRepository } from "Invoicing/Invoice/Domain/Repository/InvoiceRepository";

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceCommandHandler implements ICommandHandler {
  constructor(private readonly queryBus: IQueryBus, private readonly repository: InvoiceRepository) {}

  public async execute(command: CreateInvoiceCommand): Promise<void> {
    
  }
}