import { IQuery } from '@nestjs/cqrs';

export class GetTenantProfileQuery implements IQuery {
  constructor(private readonly _email: string) {}

  get email(): string {
    return this._email;
  }
}
