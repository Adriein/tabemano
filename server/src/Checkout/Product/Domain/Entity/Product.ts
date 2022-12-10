import { BaseEntity } from "Shared/Domain/Entities/BaseEntity";
import { Money } from "Shared/Domain/Entities/Money";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class Product extends BaseEntity {
  constructor(
    id: ID,
    private _name: string,
    private _price: Money,
  ) {
    super(id);
  }
}