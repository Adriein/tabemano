import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'ta_user' })
export class AuthModel {
  @PrimaryColumn({ name: 'us_id', type: 'varchar' })
  public id!: string

  @Column({ name: 'us_name', type: 'varchar' })
  public name!: string;

  @Column({ name: 'us_email', type: 'varchar' })
  public email!: string;

  @Column({ name: 'us_password', type: 'varchar' })
  public password!: string;

  @Column({ name: 'us_tenant_id', type: 'varchar' })
  public tenantId!: string;

  @Column({ name: 'us_role_id', type: 'varchar' })
  public roleId!: string;

  @Column({ name: 'us_is_active', type: 'varchar' })
  public isActive!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', precision: 0 })
  public createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', precision: 0 })
  public updatedAt!: Date
}