import { Table } from "typeorm";

export const PricingTableDefinition = new Table({
  name: 'ta_pricing',
  columns: [
    {
      name: 'pr_id',
      type: 'varchar',
      isPrimary: true
    },
    {
      name: 'pr_name',
      type: 'varchar',
    },
    {
      name: 'pr_duration',
      type: 'smallint',
    },
    {
      name: 'pr_price',
      type: 'double precision',
    },
    {
      name: 'pr_tenant_id',
      type: 'varchar',
    },
    {
      name: 'pr_created_at',
      type: 'timestamp',
      precision: 0
    },
    {
      name: 'pr_updated_at',
      type: 'timestamp',
      precision: 0
    }
  ],
  foreignKeys: [
    {
      columnNames: [ 'pr_tenant_id' ],
      referencedColumnNames: [ 'us_id' ],
      referencedTableName: 'ta_user'
    }
  ]
});