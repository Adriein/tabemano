import { ID } from 'Shared/Domain/Vo/Id.vo';
import { UserModel } from 'Shared/Infrastructure/Persistance/Model/UserModel';
import { ValueObjectTransformer } from 'Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModuleModel } from './ModuleModel';

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

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'pe_tenant_id', referencedColumnName: 'id' })
  tenant!: UserModel;

  @Column({
    name: 'pe_module_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  moduleId!: ID;

  @ManyToOne(() => ModuleModel)
  @JoinColumn({ name: 'pe_module_id', referencedColumnName: 'id' })
  module!: ModuleModel;

  @Column({ name: 'pe_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'pe_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;
}
