import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindCompanyQuery } from "Invoicing/Company/Application/FindCompany/FindCompanyQuery";
import { FindCompanyResponse } from "Invoicing/Company/Application/FindCompany/FindCompanyResponse";

@QueryHandler(FindCompanyQuery)
export class FindCompanyQueryHandler implements IQueryHandler {
  public async execute(query: FindCompanyQuery): Promise<FindCompanyResponse> {
    return new FindCompanyResponse(
      '1',
      'Adri enterprise',
      '1234',
      'queen roma 4º 3ª',
      629394957,
      'SL',
      'ES'
    );
  }

}