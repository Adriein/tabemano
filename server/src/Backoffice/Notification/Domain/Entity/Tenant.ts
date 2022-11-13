import { ISmtpService } from "Backoffice/Notification/Domain/Service/ISmtpService";
import { Email } from "Backoffice/Shared/Domain/Email/Email";
import { Email as EmailVo } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";

export class Tenant {
  constructor(
    private readonly _id: ID,
    private readonly _email: EmailVo,
    private readonly _name: Name,
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
  
  public async verifyEmail(service: ISmtpService): Promise<void> {
    const verificationEmail = this.createVerificationEmail();

    const result = await service.send(verificationEmail);

    result.unwrap()
  }

  public createVerificationEmail(): Email {
    return Email.verification(
      new EmailVo(process.env.ADMIN_EMAIL!),
      this._email
    );
  }
}