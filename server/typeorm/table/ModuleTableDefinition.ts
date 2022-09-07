import { Table } from 'typeorm';

export const ModuleTableDefinition = new Table({
  name: 'ta_module',
  columns: [
    {
      name: 'mo_id',
      type: 'varchar',
      isPrimary: true,
    },
    {
      name: 'mo_name',
      type: 'varchar',
    },
    {
      name: 'mo_url',
      type: 'simple-array',
    },
    {
      name: 'mo_created_at',
      type: 'timestamp',
      precision: 0,
    },
    {
      name: 'mo_updated_at',
      type: 'timestamp',
      precision: 0,
    },
  ],
});
