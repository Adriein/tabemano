import { Money } from "Shared/Domain/Entities/Money";
import { DateVo } from "Shared/Domain/Vo/Date.vo";

export class Subscription {
  constructor(
    readonly lastPayment: DateVo,
    readonly pricingName: string,
    readonly pricingDuration: number,
    readonly pricingAmount: Money
  ) {}
}