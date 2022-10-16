import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindCompanyQuery } from "Backoffice/Company/Application/FindCompany/FindCompanyQuery";
import { FindCompanyResponse } from "Backoffice/Company/Application/FindCompany/FindCompanyResponse";
import { CompanyFilter } from "Backoffice/Company/Domain/Filter/CompanyFilter";
import { ICompanyRepository } from "Backoffice/Company/Domain/Repository/ICompanyRepository";
import { ID } from "Shared/Domain/Vo/Id.vo";

@QueryHandler(FindCompanyQuery)
export class FindCompanyQueryHandler implements IQueryHandler {
  constructor(
    @Inject('ICompanyRepository')
    private readonly repository: ICompanyRepository
  ) {}

  public async execute(query: FindCompanyQuery): Promise<FindCompanyResponse> {
    const tenantId = new ID(query.tenantId);

    const filter = CompanyFilter.create().withTenantId(tenantId);

    const result = await this.repository.findOne(filter);

    const company = result.unwrap();

    return new FindCompanyResponse(
      company.id().value,
      company.name().value,
      company.fiscalId().value,
      company.address().value,
      company.phone().value,
      company.type().value,
      company.country().value
    );
  }

}