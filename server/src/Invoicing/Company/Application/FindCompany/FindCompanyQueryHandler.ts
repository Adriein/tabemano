import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindCompanyQuery } from "Invoicing/Company/Application/FindCompany/FindCompanyQuery";
import { FindCompanyResponse } from "Invoicing/Company/Application/FindCompany/FindCompanyResponse";

@QueryHandler(FindCompanyQuery)
export class FindCompanyQueryHandler implements IQueryHandler {
  public async execute(query: FindCompanyQuery): Promise<FindCompanyResponse> {
    throw new Error();
  }

}