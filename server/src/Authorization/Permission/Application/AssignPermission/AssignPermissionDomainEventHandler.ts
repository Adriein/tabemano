import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Log } from 'Shared/Domain/Decorators/Log';
import { Product } from 'Authorization/Permission/Domain/Entity/Product';
import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { ProductFilter } from 'Authorization/Permission/Domain/Filter/ProductFilter';
import { PermissionFilter } from 'Authorization/Permission/Domain/Filter/PermissionFilter';
import { IPermissionRepository } from 'Authorization/Permission/Domain/Repository/IPermissionRepository';
import { ModuleNotFoundError } from 'Shared/Domain/Error/ModuleNotFoundError';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { ProductBoughtDomainEvent } from 'Checkout/Product/Application/BuyProduct/ProductBoughtDomainEvent';
import { IModuleRepository } from 'Authorization/Permission/Domain/Repository/IModuleRepository';

@EventsHandler(ProductBoughtDomainEvent)
export class AssignPermissionDomainEventHandler implements IEventHandler {
  constructor(
    @Inject('IPermissionRepository') private permissionRepository: IPermissionRepository,
    @Inject('IModuleRepository') private moduleRepository: IModuleRepository
  ) {}

  @Log()
  public async handle(event: ProductBoughtDomainEvent) {
    await this.checkIfModuleExists(event.productId);

    const permissionAssigned = await this.checkIfTenantHasModuleAlreadyAssigned(event);

    if (permissionAssigned) {
      return;
    }

    const module = await this.getProduct(event.productId);

    const newPermission = Permission.build(
      event.tenantId,
      event.productId,
      module.name(),
      module.urlList()
    );

    await this.permissionRepository.save(newPermission);
  }

  private async checkIfModuleExists(moduleId: ID): Promise<Product> {
    try {
      const filter = ProductFilter.create().withProductId(moduleId);

      const result = await this.moduleRepository.findOne(filter);

      return result.unwrap();
    } catch (error: any) {
      if (error instanceof RecordNotFoundError) {
        throw new ModuleNotFoundError();
      }

      throw error;
    }
  }

  private async checkIfTenantHasModuleAlreadyAssigned(
    event: ProductBoughtDomainEvent
  ): Promise<Permission | undefined> {
    try {
      const filter = PermissionFilter.create()
        .withTenantId(event.tenantId)
        .withModuleId(event.productId);

      const result = await this.permissionRepository.findOne(filter);

      return result.unwrap();
    } catch (error: any) {
      if (error instanceof RecordNotFoundError) {
        return undefined;
      }

      throw error;
    }
  }

  private async getProduct(moduleId: ID): Promise<Product> {
    const filter = ProductFilter.create().withProductId(moduleId);

    const result = await this.moduleRepository.findOne(filter);

    return result.unwrap();
  }
}
