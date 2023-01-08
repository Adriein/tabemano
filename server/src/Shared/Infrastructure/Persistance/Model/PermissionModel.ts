import { ID } from 'Shared/Domain/Vo/Id.vo';
import { TenantModel } from 'Shared/Infrastructure/Persistance/Model/TenantModel';
import { UserModel } from 'Shared/Infrastructure/Persistance/Model/UserModel';
import { ValueObjectTransformer } from 'Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductModel } from './ProductModel';

@Entity('ta_permission')
export class PermissionModel {
  @PrimaryColumn({
    name: 'pe_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  id!: ID;

  @Column({
    name: 'pe_tenant_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  tenantId!: ID;

  @ManyToOne(() => TenantModel)
  @JoinColumn({ name: 'pe_tenant_id', referencedColumnName: 'id' })
  tenant!: UserModel;

  @Column({
    name: 'pe_product_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  productId!: ID;

  @ManyToOne(() => ProductModel)
  @JoinColumn({ name: 'pe_product_id', referencedColumnName: 'id' })
  module!: ProductModel;

  @Column({ name: 'pe_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'pe_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;
}
