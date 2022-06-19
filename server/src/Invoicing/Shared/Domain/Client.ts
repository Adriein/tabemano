import { GetClientProfileResponse } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileResponse";
import { Subscription } from "Invoicing/Shared/Domain/Subscription";
import { Money } from "Shared/Domain/Entities/Money";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { Currency } from "Shared/Domain/Vo/Currency.vo";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { NumberVo } from "Shared/Domain/Vo/Number.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";

export class Client {
  public static fromQuery(response: GetClientProfileResponse): Client {
    const client = response.serialize();
    const id = new ID(client.id);
    const name = new Name(client.username);
    const address = new Address('avenida princesa');
    const phone = new Phone(3994848);

    const subscriptions = client.subscription.map((subscription) => {
      return new Subscription(
        new DateVo(subscription.lastPayment),
        subscription.pricing.name,
        subscription.pricing.duration,
        new Money(new NumberVo(subscription.pricing.price), new Currency('EUR'))
      )
    })

    return new Client(id, name, address, phone, subscriptions);
  }

  constructor(
    readonly id: ID,
    readonly name: Name,
    readonly address: Address,
    readonly phone: Phone,
    readonly subscriptions: Subscription[]
  ) {}
}