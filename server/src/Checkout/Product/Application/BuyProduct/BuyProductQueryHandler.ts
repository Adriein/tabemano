import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { BuyProductResponse } from "Checkout/Product/Application/BuyProduct/BuyProductResponse";
import { Product } from "Checkout/Product/Domain/Entity/Product";
import { ProductFilter } from "Checkout/Product/Domain/Filter/ProductFilter";
import { IProductRepository } from "Checkout/Product/Domain/Repository/IProductRepository";
import { PaymentService } from "Checkout/Shared/Domain/Service/PaymentService";
import { BuyProductQuery } from "Checkout/Product/Application/BuyProduct/BuyProductQuery";
import { ID } from "Shared/Domain/Vo/Id.vo";

@QueryHandler(BuyProductQuery)
export class BuyProductQueryHandler implements IQueryHandler {
  constructor(
    @Inject('PaymentService')
    private readonly service: PaymentService,
    @Inject('IProductRepository')
    private readonly repository: IProductRepository
  ) {}

  public async execute(query: BuyProductQuery): Promise<BuyProductResponse> {
    const productId = new ID(query.productId);
    const product = await this.getProduct(productId);

    const checkoutSessionPublicToken = await product.buy(this.service);

    return new BuyProductResponse(checkoutSessionPublicToken);
  }

  private async getProduct(id: ID): Promise<Product> {
    const filter = ProductFilter.create().withId(id);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }
}