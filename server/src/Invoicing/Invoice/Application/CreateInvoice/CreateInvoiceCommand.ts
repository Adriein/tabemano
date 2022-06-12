import { ICommand } from "@nestjs/cqrs";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class CreateInvoiceCommand implements ICommand {
  constructor(private readonly clientId: ID, private readonly tenantId: ID) {}
}