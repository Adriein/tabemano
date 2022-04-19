import { Filter } from "Shared/Domain/Entities/Filter";
import { Email } from "Shared/Domain/Vo/Email.vo";

export class AuthFilter implements Filter {
  private data: Map<string, number | string | boolean | Email> = new Map();

  public withEmail(email: Email): this {
    this.data.set('email', email);
    return this;
  };

  public setPage(page: number): this {
    this.data.set('page', page);
    return this;
  }

  public setQuantity(quantity: number): this {
    this.data.set('quantity', quantity);
    return this;
  }

  public apply(): Map<string, number | string | boolean | Email> {
    return this.data;
  }
}