import { Table } from 'typeorm';

export const ProductTableDefinition = new Table({
  name: 'ta_product',
  columns: [
    {
      name: 'pr_id',
      type: 'varchar',
      isPrimary: true,
    },
    {
      name: 'pr_name',
      type: 'varchar',
    },
    {
      name: 'pr_price',
      type: 'double precision',
    },
    {
      name: 'pr_currency',
      type: 'varchar',
    },
    {
      name: 'pr_description',
      type: 'varchar',
    },
    {
      name: 'pr_created_at',
      type: 'timestamp',
      precision: 0,
    },
    {
      name: 'pr_updated_at',
      type: 'timestamp',
      precision: 0,
    },
  ],
});
