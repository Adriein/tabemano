import { Table } from "typeorm";

export const SubscriptionEventTableDefinition = new Table({
  name: 'ta_subscription_events',
  columns: [
    {
      name: 'se_id',
      type: 'varchar',
      isPrimary: true
    },
    {
      name: 'se_event',
      type: 'varchar',
    },
    {
      name: 'se_subscription_id',
      type: 'varchar',
    },
    {
      name: 'se_created_at',
      type: 'timestamp',
      precision: 0
    },
    {
      name: 'se_updated_at',
      type: 'timestamp',
      precision: 0
    }
  ],
  foreignKeys: [
    {
      name: 'ta_subscription_event_ta_subscription',
      columnNames: [ 'se_subscription_id' ],
      referencedColumnNames: [ 'su_id' ],
      referencedTableName: 'ta_subscription',
      onDelete: "CASCADE"
    }
  ]
});