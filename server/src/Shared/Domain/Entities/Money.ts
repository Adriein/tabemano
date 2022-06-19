import { Currency } from "Shared/Domain/Vo/Currency.vo";
import { NumberVo } from "Shared/Domain/Vo/Number.vo";

export class Money {
  constructor(private readonly _amount: NumberVo, private readonly _currency: Currency) {}


  public amount(): NumberVo {
    return this._amount;
  }

  public currency(): Currency {
    return this._currency;
  }
}