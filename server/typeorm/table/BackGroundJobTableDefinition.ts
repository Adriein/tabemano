import { Table } from "typeorm";

export const BackGroundJobTableDefinition = new Table({
  name: 'ta_back_ground_job',
  columns: [
    {
      name: 'bgj_id',
      type: 'varchar',
      isPrimary: true
    },
    {
      name: 'bgj_name',
      type: 'varchar',
    },
    {
      name: 'bgj_time_ini',
      type: 'boolean',
    },
    {
      name: 'bgj_time_end',
      type: 'boolean',
    },
    {
      name: 'bgj_created_at',
      type: 'timestamp',
      precision: 0
    },
    {
      name: 'bgj_updated_at',
      type: 'timestamp',
      precision: 0
    }
  ]
});