import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Auth } from "Authorization/Auth/Domain/Entity/Auth";
import { AuthFilter } from "Authorization/Auth/Domain/Filter/AuthFilter";
import { IAuthRepository } from "Authorization/Auth/Domain/Repository/IAuthRepository";
import { Log } from "Shared/Domain/Decorators/Log";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { GetTenantProfileQuery } from "./GetTenantProfileQuery";
import { GetTenantProfileResponse } from "./GetTenantProfileResponse";

@QueryHandler(GetTenantProfileQuery)
export class GetTenantProfileQueryHandler implements IQueryHandler {
  constructor(@Inject('IAuthRepository') private readonly repository: IAuthRepository,) {}

  @Log()
  public async execute(query: GetTenantProfileQuery): Promise<GetTenantProfileResponse> {
    const email = new Email(query.email);

    const auth = await this.findUser(email);

    return GetTenantProfileResponse.fromDomain(auth);
  }

  private async findUser(email: Email): Promise<Auth> {
    const filter = new AuthFilter();

    filter.withEmail(email);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }
}