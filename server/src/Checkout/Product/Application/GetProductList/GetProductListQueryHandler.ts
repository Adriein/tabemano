import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductListQuery } from "Checkout/Product/Application/GetProductList/GetProductListQuery";
import { GetProductListResponse } from "Checkout/Product/Application/GetProductList/GetProductListResponse";
import { Product } from "Checkout/Product/Domain/Entity/Product";
import { ProductFilter } from "Checkout/Product/Domain/Filter/ProductFilter";
import { IProductRepository } from "Checkout/Product/Domain/Repository/IProductRepository";
import { Country } from "Shared/Domain/Vo/Country.vo";

@QueryHandler(GetProductListQuery)
export class GetProductListQueryHandler implements IQueryHandler {
  constructor(
    @Inject('IProductRepository')
    private readonly repository: IProductRepository
  ) {}

  public async execute(query: GetProductListQuery): Promise<GetProductListResponse> {
    const country = new Country(query.country);

    const products = await this.findProducts(country);

    return GetProductListResponse.fromDomain(products);
  }

  private async findProducts(country: Country): Promise<Product[]> {
    const filter = ProductFilter.create().withCountry(country).isActive();

    const result = await this.repository.find(filter);

    return result.unwrap();
  }
}