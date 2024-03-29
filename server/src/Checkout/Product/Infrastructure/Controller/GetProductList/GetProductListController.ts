import { Controller, Get, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetProductListQuery } from "Checkout/Product/Application/GetProductList/GetProductListQuery";
import { GetProductListResponse } from "Checkout/Product/Application/GetProductList/GetProductListResponse";
import { GetProductListApiRequest } from "Checkout/Product/Infrastructure/Controller/GetProductList/GetProductListApiRequest";
import { TabemanoMetadata } from "Shared/Domain/Entities/TabemanoMetadata";
import { TabemanoResponse } from "Shared/Domain/Entities/TabemanoResponse";

@Controller()
export class GetProductListController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/checkout/products')
  public async getModuleList(@Query() request: GetProductListApiRequest): Promise<any> {
    const query = new GetProductListQuery(request.country);

    const productListResponse = await this.queryBus.execute<GetProductListQuery, GetProductListResponse>(query);

    const metadata = TabemanoMetadata.build(true, { country: query.country });

    const response = TabemanoResponse.build<GetProductListResponse>(productListResponse, metadata);

    return response.serialize();
  }
}