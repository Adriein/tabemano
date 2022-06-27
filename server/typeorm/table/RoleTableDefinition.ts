import { Table } from "typeorm";

export const RoleTableDefinition = new Table({
  name: 'ta_role',
  columns: [
    {
      name: 'ro_id',
      type: 'varchar',
      isPrimary: true
    },
    {
      name: 'ro_type',
      type: 'varchar',
    },
    {
      name: 'ro_created_at',
      type: 'timestamp',
      precision: 0
    },
    {
      name: 'ro_updated_at',
      type: 'timestamp',
      precision: 0
    }
  ]
});