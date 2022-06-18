import { ICommand } from "@nestjs/cqrs";

export class CreateInvoiceCommand implements ICommand {
  constructor(private readonly _clientId: string, private readonly _tenantId: string) {}
  
  get clientId(): string {
    return this._clientId;
  }

  get tenantId(): string {
    return this._tenantId;
  }
}