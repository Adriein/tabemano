import { Table } from "typeorm";

export const ConfigTableDefinition = new Table({
  name: 'ta_config',
  columns: [
    {
      name: 'co_id',
      type: 'varchar',
      isPrimary: true
    },
    {
      name: 'co_language',
      type: 'varchar',
    },
    {
      name: 'co_send_notifications',
      type: 'boolean',
    },
    {
      name: 'co_send_warnings',
      type: 'boolean',
    },
    {
      name: 'co_user_id',
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
  ]
});