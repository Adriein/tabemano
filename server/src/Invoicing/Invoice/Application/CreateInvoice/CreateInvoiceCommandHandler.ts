import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { GetClientProfileQuery } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileQuery";
import { FindCompanyQuery } from "Invoicing/Company/Application/FindCompany/FindCompanyQuery";
import { CompanyName } from "Invoicing/Company/Domain/Vo/CompanyName";
import { CompanyType } from "Invoicing/Company/Domain/Vo/CompanyType";
import { FiscalId } from "Invoicing/Company/Domain/Vo/FiscalId";
import { CreateInvoiceCommand } from "Invoicing/Invoice/Application/CreateInvoice/CreateInvoiceCommand";
import { Company } from "Invoicing/Invoice/Domain/Dto/Company";
import { Invoice } from "Invoicing/Invoice/Domain/Entity/Invoice";
import { InvoiceRepository } from "Invoicing/Invoice/Domain/Repository/InvoiceRepository";
import { Client } from "Invoicing/Shared/Domain/Client";
import { Subscription } from "Invoicing/Shared/Domain/Subscription";
import { Money } from "Shared/Domain/Entities/Money";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { Currency } from "Shared/Domain/Vo/Currency.vo";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { NumberVo } from "Shared/Domain/Vo/Number.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceCommandHandler implements ICommandHandler {
  constructor(
    private readonly queryBus: QueryBus,
    @Inject('InvoiceRepository') private readonly repository: InvoiceRepository
  ) {}

  public async execute(command: CreateInvoiceCommand): Promise<void> {
    const client = await this.getClient(new ID(command.clientId));
    const company = await this.getCompany(new ID(command.tenantId));

    const invoice = Invoice.build(DateVo.now(), company, client);
    console.log(invoice);
    throw new Error();
    await this.repository.save(invoice);
  }

  private async getClient(clientId: ID): Promise<Client> {
    const query = new GetClientProfileQuery(clientId.value);

    const response = await this.queryBus.execute(query);

    const client = response.serialize();
    const id = new ID(client.id);
    const name = new Name(client.username);
    const address = new Address('avenida princesa');
    const phone = new Phone(3994848);

    const subscriptions = client.subscription.map((subscription: any) => {
      return new Subscription(
        new DateVo(subscription.lastPayment),
        subscription.pricing.name,
        subscription.pricing.duration,
        new Money(new NumberVo(subscription.pricing.price), new Currency('EUR'))
      )
    })

    return new Client(id, name, address, phone, subscriptions);
  }

  private async getCompany(tenantId: ID): Promise<Company> {
    const query = new FindCompanyQuery(tenantId.value);

    const response = await this.queryBus.execute(query);

    const id = new ID(response.id);
    const name = new CompanyName(response.name);
    const fiscalId = new FiscalId(response.fiscalId);
    const address = new Address(response.address);
    const phone = new Phone(response.phone);
    const type = new CompanyType(response.type);
    const country = new CompanyType(response.country);


    return new Company(id, name, fiscalId, address, phone, type, country);
  }
}