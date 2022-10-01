import { Table } from "typeorm";

export const TenantTableDefinition = new Table({
  name: 'ta_tenant',
  columns: [
    {
      name: 'te_id',
      type: 'varchar',
      isPrimary: true
    },
    {
      name: 'te_name',
      type: 'varchar',
    },
    {
      name: 'te_email',
      type: 'varchar',
    },
    {
      name: 'te_password',
      type: 'varchar',
    },
    {
      name: 'te_role_id',
      type: 'varchar',
    },
    {
      name: 'te_config_id',
      type: 'varchar',
    },
    {
      name: 'te_company_id',
      type: 'varchar',
    },
    {
      name: 'te_is_active',
      type: 'boolean',
    },
    {
      name: 'te_created_at',
      type: 'timestamp',
      precision: 0
    },
    {
      name: 'te_updated_at',
      type: 'timestamp',
      precision: 0
    }
  ],
  foreignKeys: [
    {
      name: 'ta_tenant_ta_role',
      columnNames: [ 'te_role_id' ],
      referencedColumnNames: [ 'ro_id' ],
      referencedTableName: 'ta_role'
    },
    {
      name: 'ta_tenant_ta_config',
      columnNames: [ 'te_config_id' ],
      referencedColumnNames: [ 'co_id' ],
      referencedTableName: 'ta_config'
    },
    ,
    {
      name: 'ta_tenant_ta_company',
      columnNames: [ 'te_company_id' ],
      referencedColumnNames: [ 'co_id' ],
      referencedTableName: 'ta_company'
    }
  ]
});