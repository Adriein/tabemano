import { AggregateRoot } from 'Shared/Domain/Entities/AggregateRoot';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';

export class Module extends AggregateRoot {
  public static build(name: Name): Module {
    return new Module(ID.generate(), name);
  }

  constructor(_id: ID, private _name: Name) {
    super(_id);
  }

  public name(): Name {
    return this._name;
  }
}
