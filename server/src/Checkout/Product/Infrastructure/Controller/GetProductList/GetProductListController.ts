import { Body, Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetProductListQuery } from "Checkout/Product/Application/GetProductList/GetProductListQuery";
import { GetProductListApiRequest } from "Checkout/Product/Infrastructure/Controller/GetProductList/GetProductListApiRequest";

@Controller()
export class GetProductListController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/checkout/product')
  public async getModuleList(@Body() body: GetProductListApiRequest): Promise<void> {
    const query = new GetProductListQuery(body.country);

    await this.queryBus.execute(query);
  }
}