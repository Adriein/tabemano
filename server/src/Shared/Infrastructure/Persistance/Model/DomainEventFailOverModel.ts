import { ID } from "Shared/Domain/Vo/Id.vo";
import { ValueObjectTransformer } from "Shared/Infrastructure/Persistance/Transformer/ValueObjectTransformer";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'ta_domain_event_fail_over' })
export class DomainEventFailOverModel {
  @PrimaryColumn({ name: 'defo_id', type: 'varchar', transformer: new ValueObjectTransformer<string, ID>(ID) })
  id!: ID;

  @Column({ name: 'defo_domain_event', type: 'varchar' })
  domainEvent!: string;

  @Column({ name: 'defo_error', type: 'varchar' })
  error!: string;

  @Column({ name: 'defo_retry', type: 'boolean' })
  retry!: boolean;

  @Column({ name: 'defo_ack', type: 'boolean' })
  ack!: boolean;

  @Column({ name: 'defo_created_at', type: 'timestamp', precision: 0 })
  createdAt!: Date;

  @Column({ name: 'defo_updated_at', type: 'timestamp', precision: 0 })
  updatedAt!: Date;
}

