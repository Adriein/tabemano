import { Company } from "Backoffice/Notification/Domain/Entity/Company";
import { IVerifyTenantEmailService } from "Backoffice/Notification/Domain/Service/IVerifyTenantEmailService";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";

export class Tenant {
  constructor(
    private readonly _id: ID,
    private readonly _email: Email,
    private readonly _name: Name,
    private readonly _company: Company
  ) {}

  public id(): ID {
    return this._id;
  }

  public email(): Email {
    return this._email;
  }

  public name(): Name {
    return this._name;
  }

  public company(): Company {
    return this._company;
  }

  public async verifyEmail(service: IVerifyTenantEmailService): Promise<void> {
    const result = await service.verify(this);

    result.unwrap()
  }
}