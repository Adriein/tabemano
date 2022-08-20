import { Table } from "typeorm";

export const CronTableDefinition = new Table({
  name: 'ta_cron',
  columns: [
    {
      name: 'cr_id',
      type: 'varchar',
      isPrimary: true
    },
    {
      name: 'cr_name',
      type: 'varchar',
    },
    {
      name: 'cr_time_ini',
      type: 'boolean',
    },
    {
      name: 'cr_time_end',
      type: 'boolean',
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