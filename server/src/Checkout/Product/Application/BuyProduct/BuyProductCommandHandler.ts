import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Product } from "Checkout/Product/Domain/Entity/Product";
import { ProductFilter } from "Checkout/Product/Domain/Filter/ProductFilter";
import { IProductRepository } from "Checkout/Product/Domain/Repository/IProductRepository";
import { BuyProductCommand } from "Checkout/Product/Application/BuyProduct/BuyProductCommand";
import { ID } from "Shared/Domain/Vo/Id.vo";

@CommandHandler(BuyProductCommand)
export class BuyProductCommandHandler implements ICommandHandler<BuyProductCommand, void> {
  constructor(
    @Inject('IProductRepository')
    private readonly repository: IProductRepository
  ) {}

  public async execute(command: BuyProductCommand): Promise<void> {
    const productId = new ID(command.productId);
    const customerId = new ID(command.customerId);

    const product = await this.getProduct(productId);

    product.buy(customerId);
  }

  private async getProduct(id: ID): Promise<Product> {
    const filter = ProductFilter.create().withId(id);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }
}