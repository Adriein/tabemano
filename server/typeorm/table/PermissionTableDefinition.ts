import { Table } from 'typeorm';

export const PermissionTableDefinition = new Table({
  name: 'ta_permission',
  columns: [
    {
      name: 'um_id',
      type: 'varchar',
      isPrimary: true,
    },
    {
      name: 'um_tenant_id',
      type: 'varchar',
    },
    {
      name: 'um_module_id',
      type: 'varchar',
    },
  ],
  foreignKeys: [
    {
      name: 'ta_permission_ta_user',
      columnNames: ['um_tenant_id'],
      referencedColumnNames: ['us_id'],
      referencedTableName: 'ta_user',
    },
    {
      name: 'ta_permission_ta_module',
      columnNames: ['um_module_id'],
      referencedColumnNames: ['mo_id'],
      referencedTableName: 'ta_module',
    },
  ],
});
