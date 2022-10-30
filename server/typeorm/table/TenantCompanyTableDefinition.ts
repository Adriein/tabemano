import { Table } from "typeorm";

export const TenantCompanyTableDefinition = new Table({
  name: 'ta_tenant_company',
  columns: [
    {
      name: 'teco_id',
      type: 'varchar',
      isPrimary: true
    },
    {
      name: 'teco_tenant_id',
      type: 'varchar',
    },
    {
      name: 'teco_company_id',
      type: 'varchar',
    },
    {
      name: 'teco_created_at',
      type: 'timestamp',
      precision: 0
    },
    {
      name: 'teco_updated_at',
      type: 'timestamp',
      precision: 0
    },
  ],
  foreignKeys: [
    {
      name: 'ta_tenant_company_ta_tenant',
      columnNames: [ 'teco_tenant_id' ],
      referencedColumnNames: [ 'te_id' ],
      referencedTableName: 'ta_tenant',
      onDelete: "CASCADE"
    },
    {
      name: 'ta_tenant_company_ta_company',
      columnNames: [ 'teco_company_id' ],
      referencedColumnNames: [ 'co_id' ],
      referencedTableName: 'ta_company',
      onDelete: "CASCADE"
    }
  ]
});