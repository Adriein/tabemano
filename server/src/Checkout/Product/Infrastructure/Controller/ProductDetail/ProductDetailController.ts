import { Controller, Get, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ProductDetailQuery } from "Checkout/Product/Application/ProductDetail/ProductDetailQuery";
import { ProductDetailResponse } from "Checkout/Product/Application/ProductDetail/ProductDetailResponse";
import { ProductDetailApiRequest } from "Checkout/Product/Infrastructure/Controller/ProductDetail/ProductDetailApiRequest";
import { TabemanoMetadata } from "Shared/Domain/Entities/TabemanoMetadata";
import { TabemanoResponse } from "Shared/Domain/Entities/TabemanoResponse";

@Controller()
export class ProductDetailController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/checkout/product')
  public async getModuleList(@Query() request: ProductDetailApiRequest): Promise<any> {
    const query = new ProductDetailQuery(request.productId);

    const productDetailResponse = await this.queryBus.execute<ProductDetailQuery, ProductDetailResponse>(query);

    const metadata = TabemanoMetadata.build(true, { productId: query.productId });

    const response = TabemanoResponse.build<ProductDetailResponse>(productDetailResponse, metadata);

    return response.serialize();
  }
}