import { Table } from "typeorm";

export const SubscriptionTableDefinition = new Table({
  name: 'ta_subscription',
  columns: [
    {
      name: 'su_id',
      type: 'varchar',
      isPrimary: true
    },
    {
      name: 'su_payment_date',
      type: 'timestamp',
      precision: 0
    },
    {
      name: 'su_valid_to',
      type: 'timestamp',
      precision: 0
    },
    {
      name: 'su_is_active',
      type: 'boolean',
    },
    {
      name: 'su_is_expired',
      type: 'boolean',
    },
    {
      name: 'su_duration',
      type: 'smallint',
    },
    {
      name: 'su_price_name',
      type: 'varchar',
    },
    {
      name: 'su_price',
      type: 'double precision',
    },
    {
      name: 'su_pricing_id',
      type: 'varchar',
    },
    {
      name: 'su_user_id',
      type: 'varchar',
    },
    {
      name: 'su_created_at',
      type: 'timestamp',
      precision: 0
    },
    {
      name: 'su_updated_at',
      type: 'timestamp',
      precision: 0
    }
  ],
  foreignKeys: [
    {
      name: 'ta_subscription_ta_pricing',
      columnNames: [ 'su_pricing_id' ],
      referencedColumnNames: [ 'pr_id' ],
      referencedTableName: 'ta_pricing'
    },
    {
      name: 'ta_subscription_ta_user',
      columnNames: [ 'su_user_id' ],
      referencedColumnNames: [ 'us_id' ],
      referencedTableName: 'ta_user'
    }
  ]
});