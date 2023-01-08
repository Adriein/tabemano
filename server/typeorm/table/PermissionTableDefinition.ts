import { Table } from 'typeorm';

export const PermissionTableDefinition = new Table({
  name: 'ta_permission',
  columns: [
    {
      name: 'pe_id',
      type: 'varchar',
      isPrimary: true,
    },
    {
      name: 'pe_tenant_id',
      type: 'varchar',
    },
    {
      name: 'pe_product_id',
      type: 'varchar',
    },
    {
      name: 'pe_created_at',
      type: 'timestamp',
      precision: 0
    },
    {
      name: 'pe_updated_at',
      type: 'timestamp',
      precision: 0
    }
  ],
  foreignKeys: [
    {
      name: 'ta_permission_ta_user',
      columnNames: [ 'pe_tenant_id' ],
      referencedColumnNames: [ 'us_id' ],
      referencedTableName: 'ta_user',
      onDelete: "CASCADE"
    },
    {
      name: 'ta_permission_ta_product',
      columnNames: [ 'pe_product_id' ],
      referencedColumnNames: [ 'pr_id' ],
      referencedTableName: 'ta_product',
      onDelete: "CASCADE"
    },
  ],
});
