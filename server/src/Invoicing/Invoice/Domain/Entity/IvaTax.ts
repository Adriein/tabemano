import { Tax } from "Invoicing/Invoice/Domain/Entity/Tax";

export class IvaTax extends Tax {
  readonly percentage: number = 21;
  readonly name: string = 'IVA';
}