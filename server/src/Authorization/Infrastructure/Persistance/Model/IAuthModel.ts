import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

export interface IAuthModel {
  id: ID;
  name: string;
  email: Email;
  password: Password;
  roleId: ID;
  createdAt: Date;
  updatedAt: Date;
}