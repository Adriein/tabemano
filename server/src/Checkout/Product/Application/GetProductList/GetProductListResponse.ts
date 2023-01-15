import { ProductDto } from "Checkout/Product/Application/GetProductList/ProductDto";
import { Product } from "Checkout/Product/Domain/Entity/Product";
import { Serializable } from "Shared/Domain/Interfaces/Serializable";

export class GetProductListResponse implements Serializable<ProductDto[]> {
  public static fromDomain(products: Product[]) {
    return new GetProductListResponse(products);
  }

  constructor(private readonly products: Product[]) {}

  public serialize(): ProductDto[] {
    return this.products.map((product: Product) => {
      return {
        id: product.id().value,
        name: product.name().value,
        description: product.description().value,
        currency: product.price().currency().value,
        price: product.price().amount().value
      };
    });
  }
}