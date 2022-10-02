import { Table } from "typeorm";

export const UserTableDefinition = new Table({
  name: 'ta_user',
  columns: [
    {
      name: 'us_id',
      type: 'varchar',
      isPrimary: true
    },
    {
      name: 'us_name',
      type: 'varchar',
    },
    {
      name: 'us_email',
      type: 'varchar',
    },
    {
      name: 'us_password',
      type: 'varchar',
    },
    {
      name: 'us_tenant_id',
      type: 'varchar',
    },
    {
      name: 'us_role_id',
      type: 'varchar',
    },
    {
      name: 'us_config_id',
      type: 'varchar',
    },
    {
      name: 'us_is_active',
      type: 'boolean',
    },
    {
      name: 'us_created_at',
      type: 'timestamp',
      precision: 0
    },
    {
      name: 'us_updated_at',
      type: 'timestamp',
      precision: 0
    }
  ],
  foreignKeys: [
    {
      name: 'ta_user_ta_role',
      columnNames: [ 'us_role_id' ],
      referencedColumnNames: [ 'ro_id' ],
      referencedTableName: 'ta_role',
      onDelete: "CASCADE"
    },
    {
      name: 'ta_user_ta_config',
      columnNames: [ 'us_config_id' ],
      referencedColumnNames: [ 'co_id' ],
      referencedTableName: 'ta_config',
      onDelete: "CASCADE"
    }
  ]
});