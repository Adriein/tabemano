import { NumberVo } from "Shared/Domain/Vo/Number.vo";
import { Time } from "Shared/Infrastructure/Helper/Time";

export class InvoiceNumber extends NumberVo {
  public static generate(): InvoiceNumber {
    const now = Time.format(Time.now(), Time.EUROPEAN_COMPLETE_DATE_FORMAT);
    const formattedNow = now
      .replace('/', '')
      .replace(':', '')
      .replace(' ', '');

    return new InvoiceNumber(Number(formattedNow));
  }
}