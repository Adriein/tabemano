import { Table } from 'typeorm';

export const ThirdPartyServiceTableDefinition = new Table({
  name: 'ta_third_party_service',
  columns: [
    {
      name: 'tps_id',
      type: 'varchar',
      isPrimary: true,
    },
    {
      name: 'tps_name',
      type: 'varchar',
    },
    {
      name: 'tps_remaining_credit',
      type: 'integer',
    },
    {
      name: 'tps_min_remaining_credit_before_notifying',
      type: 'integer',
    },
    {
      name: 'tps_notify',
      type: 'boolean',
    },
    {
      name: 'tps_created_at',
      type: 'timestamp',
      precision: 0,
    },
    {
      name: 'tps_updated_at',
      type: 'timestamp',
      precision: 0,
    },
  ],
});
