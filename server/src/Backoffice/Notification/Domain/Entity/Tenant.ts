import { Company } from "Backoffice/Notification/Domain/Entity/Company";
import { ISmtpService } from "Backoffice/Notification/Domain/Service/ISmtpService";
import { Content } from "Backoffice/Shared/Domain/Email/Content";
import { Email } from "Backoffice/Shared/Domain/Email/Email";
import { Heading } from "Backoffice/Shared/Domain/Email/Heading";
import { Email as EmailVo } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";

export class Tenant {
  constructor(
    private readonly _id: ID,
    private readonly _email: EmailVo,
    private readonly _name: Name,
    private readonly _company: Company
  ) {}

  public id(): ID {
    return this._id;
  }

  public email(): EmailVo {
    return this._email;
  }

  public name(): Name {
    return this._name;
  }

  public company(): Company {
    return this._company;
  }

  public async verifyEmail(service: ISmtpService): Promise<void> {
    const verificationEmail = this.createVerificationEmail();

    const result = await service.send(verificationEmail);

    result.unwrap()
  }

  public createVerificationEmail(): Email {
    return new Email(
      new Heading(
        this._email,
        this._email,
        'verify your email'
      ),
      new Content(
        ''
      )
    );
  }
}