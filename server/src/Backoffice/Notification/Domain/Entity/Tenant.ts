import { Company } from "Backoffice/Notification/Domain/Entity/Company";
import { IRestService } from "Shared/Domain/Services/IRestService";
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

  public async verifyEmailOnSmtpProvider(restService: IRestService): Promise<void> {
    await restService.post<Tenant>(this);
  }
}