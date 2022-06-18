import { NumberVo } from "Shared/Domain/Vo/Number.vo";
import { StringVo } from "Shared/Domain/Vo/String.vo";

export class Money {
  constructor(private readonly _amount: NumberVo, private readonly _currency: StringVo) {}


  public amount(): NumberVo {
    return this._amount;
  }

  public currency(): StringVo {
    return this._currency;
  }
}