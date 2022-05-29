import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'ta_app_filter' })
export class AppFilterModel {
  @PrimaryColumn({ name: 'af_id', type: 'varchar' })
  public id!: string

  @Column({ name: 'af_tenant_id', type: 'varchar' })
  public tenantId!: string;

  @Column({ name: 'af_entity', type: 'varchar' })
  public entity!: string;

  @Column({ name: 'af_field', type: 'varchar' })
  public field!: string;

  @Column({ name: 'af_values', type: 'varchar' })
  public values!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 0 })
  public createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', precision: 0 })
  public updatedAt!: Date
}