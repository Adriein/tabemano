import { SubscriptionModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionModel";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'ta_subscription_events' })
export class SubscriptionEventModel {
  @PrimaryColumn({ name: 'se_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  id!: ID;

  @Column({ name: 'se_event', type: 'varchar' })
  event!: string;

  @Column({ name: 'se_subscription_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  subscriptionId!: ID;

  @Column({ name: 'se_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'se_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;

  @ManyToOne(() => SubscriptionModel, (subscription: SubscriptionModel) => subscription.events)
  @JoinColumn({ name: 'se_subscription_id', referencedColumnName: 'id' })
  subscription!: SubscriptionModel;
}