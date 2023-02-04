import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductDetailQuery } from "Checkout/Product/Application/ProductDetail/ProductDetailQuery";
import { ProductDetailResponse } from "Checkout/Product/Application/ProductDetail/ProductDetailResponse";
import { Product } from "Checkout/Product/Domain/Entity/Product";
import { ProductFilter } from "Checkout/Product/Domain/Filter/ProductFilter";
import { IProductRepository } from "Checkout/Product/Domain/Repository/IProductRepository";
import { Log } from 'Shared/Domain/Decorators/Log';
import { ID } from "Shared/Domain/Vo/Id.vo";

@QueryHandler(ProductDetailQuery)
export class ProductDetailQueryHandler implements IQueryHandler {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository
  ) {}

  @Log()
  public async execute(query: ProductDetailQuery): Promise<ProductDetailResponse> {
    const id = new ID(query.productId);

    const product = await this.getProduct(id);

    return ProductDetailResponse.fromDomain(product);
  }

  private async getProduct(id: ID): Promise<Product> {
    const filter = ProductFilter.create().withId(id);

    const result = await this.productRepository.findOne(filter);

    return result.unwrap();
  }
}
