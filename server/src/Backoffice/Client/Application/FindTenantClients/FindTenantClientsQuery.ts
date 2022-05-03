import { FilterDto } from "Shared/Application/FilterDto";
import { IQuery } from "Shared/Domain/Interfaces/IQuery";

export class FindTenantClientsQuery implements IQuery {
  public static fromJson(json: any): FindTenantClientsQuery {
    return new FindTenantClientsQuery(json.tenantId, json.page, json.quantity, json.filters);
  }

  constructor(
    private readonly _tenantId: string,
    private readonly _page: number,
    private readonly _quantity: number,
    private readonly _filters: FilterDto[]
  ) {}


  public get tenantId(): string {
    return this._tenantId;
  }

  public get page(): number {
    return this._page;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public get filters(): FilterDto[] {
    return this._filters;
  }
}