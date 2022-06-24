import { CommandHandler, ICommandHandler, IQueryBus } from "@nestjs/cqrs";
import { GetClientProfileQuery } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileQuery";
import { FindCompanyQuery } from "Invoicing/Company/Application/FindCompany/FindCompanyQuery";
import { CreateInvoiceCommand } from "Invoicing/Invoice/Application/CreateInvoice/CreateInvoiceCommand";
import { Company } from "Invoicing/Invoice/Domain/Dto/Company";
import { Invoice } from "Invoicing/Invoice/Domain/Entity/Invoice";
import { InvoiceRepository } from "Invoicing/Invoice/Domain/Repository/InvoiceRepository";
import { Client } from "Invoicing/Shared/Domain/Client";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceCommandHandler implements ICommandHandler {
  constructor(private readonly queryBus: IQueryBus, private readonly repository: InvoiceRepository) {}

  public async execute(command: CreateInvoiceCommand): Promise<void> {
    const client = await this.getClient(new ID(command.clientId));
    const company = await this.getCompany(new ID(command.tenantId));

    const invoice = Invoice.build(DateVo.now(), company, client);
    
    await this.repository.save(invoice);
  }

  private async getClient(id: ID): Promise<Client> {
    const query = new GetClientProfileQuery(id.value);

    const response = await this.queryBus.execute(query);

    return Client.fromQuery(response);
  }

  private async getCompany(tenantId: ID): Promise<Company> {
    const query = new FindCompanyQuery(tenantId.value);

    const response = await this.queryBus.execute(query);

    return Company.fromQuery(response);
  }
}