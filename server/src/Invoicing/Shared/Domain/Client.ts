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
  constructor(
    readonly id: ID,
    readonly name: Name,
    readonly address: Address,
    readonly phone: Phone,
    readonly subscriptions: Subscription[]
  ) {}
}