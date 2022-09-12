import { Table } from 'typeorm';

export const ModuleUrlTableDefinition = new Table({
  name: 'ta_module_url',
  columns: [
    {
      name: 'mu_id',
      type: 'varchar',
      isPrimary: true,
    },
    {
      name: 'mu_module_id',
      type: 'varchar',
    },
    {
      name: 'mu_url_id',
      type: 'varchar',
    },
  ],
  foreignKeys: [
    {
      name: 'ta_module_url_ta_module',
      columnNames: ['mu_module_id'],
      referencedColumnNames: ['mo_id'],
      referencedTableName: 'ta_module',
    },
    {
      name: 'ta_module_user_ta_url',
      columnNames: ['mu_url_id'],
      referencedColumnNames: ['ur_id'],
      referencedTableName: 'ta_url',
    },
  ],
});
