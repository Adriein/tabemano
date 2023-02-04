import { ProductDto } from "Checkout/Product/Application/GetProductList/ProductDto";
import { Product } from "Checkout/Product/Domain/Entity/Product";
import { Serializable } from "Shared/Domain/Interfaces/Serializable";

export class ProductDetailResponse implements Serializable<ProductDto> {
  public static fromDomain(product: Product) {
    return new ProductDetailResponse(product);
  }

  constructor(private readonly product: Product) {}

  public serialize(): ProductDto {
    return {
      id: this.product.id().value,
      name: this.product.name().value,
      description: this.product.description().value,
      currency: this.product.price().currency().value,
      price: this.product.price().amount().value
    };
  }
}