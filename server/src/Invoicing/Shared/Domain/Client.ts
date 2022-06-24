import { Subscription } from "Invoicing/Shared/Domain/Subscription";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";

export class Client {
  constructor(
    readonly id: ID,
    readonly name: Name,
    readonly address: Address,
    readonly phone: Phone,
    readonly subscriptions: Subscription[]
  ) {}
}