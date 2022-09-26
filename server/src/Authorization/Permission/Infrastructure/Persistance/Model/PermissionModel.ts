import { ID } from 'Shared/Domain/Vo/Id.vo';
import { UserModel } from "Shared/Infrastructure/Persistance/Model/UserModel";
import { ValueObjectTransformer } from 'Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ModuleModel } from './ModuleModel';

@Entity('ta_permission')
export class PermissionModel {
  @PrimaryColumn({
    name: 'um_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  id!: ID;

  @Column({
    name: 'um_tenant_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  tenantId!: ID;

  @ManyToOne(() => UserModel)
  @JoinColumn({ name: 'um_tenant_id', referencedColumnName: 'id' })
  tenant!: UserModel;

  @Column({
    name: 'um_module_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  moduleId!: ID;

  @ManyToOne(() => ModuleModel)
  @JoinColumn({ name: 'um_module_id', referencedColumnName: 'id' })
  module!: ModuleModel;
}
