import { ID } from "Shared/Domain/Vo/Id.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'ta_config' })
export class ConfigModel {
  @PrimaryColumn({ name: 'co_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  id!: ID;

  @Column({ name: 'co_user_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  userId!: ID;

  @Column({ name: 'co_language' })
  lang!: string;

  @Column({ name: 'co_send_notifications' })
  sendNotifications!: boolean;

  @Column({ name: 'co_send_warnings' })
  sendWarnings!: boolean;

  @Column({ name: 'co_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'co_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;
}

