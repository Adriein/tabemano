import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { NumberVo } from 'Shared/Domain/Vo/Number.vo';
import { ValueObjectTransformer } from 'Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('ta_third_party_service')
export class ThirdPartyServiceModel {
  @PrimaryColumn({
    name: 'tps_id',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, ID>(ID),
  })
  id!: ID;

  @Column({
    name: 'tps_name',
    type: 'varchar',
    transformer: new ValueObjectTransformer<string, Name>(Name),
  })
  name!: Name;

  @Column({
    name: 'tps_remaining_credit',
    type: 'integer',
    transformer: new ValueObjectTransformer<number, NumberVo>(NumberVo),
  })
  remainingCredit!: NumberVo;

  @Column({
    name: 'tps_min_remaining_credit_before_notifying',
    type: 'integer',
    transformer: new ValueObjectTransformer<number, NumberVo>(NumberVo),
  })
  minRemainingCreditBeforeNotifying!: NumberVo;

  @Column({
    name: 'tps_notify',
    type: 'boolean',
  })
  notify!: boolean;

  @Column({ name: 'tps_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'tps_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;
}
