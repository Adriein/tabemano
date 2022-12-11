import { Table } from 'typeorm';

export const UrlTableDefinition = new Table({
  name: 'ta_url',
  columns: [
    {
      name: 'ur_id',
      type: 'varchar',
      isPrimary: true,
    },
    {
      name: 'ur_url',
      type: 'varchar',
    },
    {
      name: 'ur_product_id',
      type: 'varchar',
    },
    {
      name: 'ur_created_at',
      type: 'timestamp',
      precision: 0,
    },
    {
      name: 'ur_updated_at',
      type: 'timestamp',
      precision: 0,
    },
  ],
});
