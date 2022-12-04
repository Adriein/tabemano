import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { DomainEvent } from "Shared/Domain/Entities/DomainEvent";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";

export class ClientRegisteredDomainEvent extends DomainEvent {
  protected _type = 'tabemano.backoffice.1.event.tenant.registered';

  constructor(
    protected readonly _aggregateId: ID,
    private readonly _name: Name,
    private readonly _email: Email,
    private readonly _tenantId: ID,
    private readonly _pricing: Pricing,
    private readonly _roleId: ID
  ) {
    super();
  }

  public get aggregateId(): ID {
    return this._aggregateId;
  }

  public get name(): Name {
    return this._name;
  }

  public get email(): Email {
    return this._email;
  }

  public get tenantId(): ID {
    return this._tenantId;
  }

  public get pricing(): Pricing {
    return this._pricing;
  }

  public get roleId(): ID {
    return this._roleId;
  }

  public get type(): string {
    return this._type;
  }

  public serialize(): string {
    return JSON.stringify({
      id: this.id.value,
      dateOccurred: this.dateOccurred.value,
      aggregateId: this._aggregateId.value,
      name: this._name.value,
      email: this._email.value,
      tenantId: this._tenantId.value,
      pricing: {
        id: this._pricing.id().value,
        name: this._pricing.name(),
        price: this._pricing.price(),
        duration: this._pricing.duration(),
        createdAt: this._pricing.createdAt(),
        updatedAt: this._pricing.updatedAt(),
      },
      roleId: this._roleId.value
    });
  }
}