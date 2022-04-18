import { Filter } from "Shared/Domain/Entities/Filter";
import { Email } from "Shared/Domain/Vo/Email.vo";

export interface IAuthFilter extends Filter {
  withEmail(email: Email): this;
}