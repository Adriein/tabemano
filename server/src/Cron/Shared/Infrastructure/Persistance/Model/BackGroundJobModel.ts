import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'ta_back_ground_job' })
export class BackGroundJobModel {
  @PrimaryColumn({ name: 'bgj_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  id!: ID;

  @Column({ name: 'bgj_name', type: 'varchar' })
  name!: string;

  @Column({
    name: 'bgj_time_ini',
    type: 'timestamp',
    precision: 0,
    transformer: new ValueObjectTransformer<Date, DateVo>(DateVo)
  })
  timeIni!: DateVo;

  @Column({
    name: 'bgj_time_end',
    type: 'timestamp',
    precision: 0,
    transformer: new ValueObjectTransformer<Date, DateVo>(DateVo)
  })
  timeEnd!: DateVo;

  @Column({ name: 'bgj_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'bgj_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;
}

