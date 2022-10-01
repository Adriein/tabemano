import { Table } from "typeorm";

export const CompanyTableDefinition = new Table({
  name: 'ta_company',
  columns: [
    {
      name: 'co_id',
      type: 'varchar',
      isPrimary: true
    },
    {
      name: 'co_name',
      type: 'varchar',
    },
    {
      name: 'co_fiscal_id',
      type: 'varchar',
    },
    {
      name: 'co_address',
      type: 'varchar',
    },
    {
      name: 'co_phone',
      type: 'varchar',
    },
    {
      name: 'co_type',
      type: 'varchar',
    },
    {
      name: 'co_country',
      type: 'varchar',
    },
    {
      name: 'co_state',
      type: 'varchar',
    },
    {
      name: 'co_city',
      type: 'varchar',
    },
    {
      name: 'co_tenant_id',
      type: 'varchar',
    },
    {
      name: 'co_created_at',
      type: 'timestamp',
      precision: 0
    },
    {
      name: 'co_updated_at',
      type: 'timestamp',
      precision: 0
    }
  ],
  foreignKeys: [
    {
      name: 'ta_company_ta_user',
      columnNames: [ 'co_tenant_id' ],
      referencedColumnNames: [ 'us_id' ],
      referencedTableName: 'ta_user'
    }
  ]
});