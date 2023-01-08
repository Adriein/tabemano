import { Table } from "typeorm";

export const DomainEventFailOverTableDefinition = new Table({
  name: 'ta_domain_event_fail_over',
  columns: [
    {
      name: 'defo_id',
      type: 'varchar',
      isPrimary: true
    },
    {
      name: 'defo_domain_event',
      type: 'varchar',
    },
    {
      name: 'defo_error',
      type: 'varchar',
    },
    {
      name: 'defo_retry',
      type: 'boolean',
    },
    {
      name: 'defo_ack',
      type: 'boolean',
    },
    {
      name: 'defo_created_at',
      type: 'timestamp',
      precision: 0
    },
    {
      name: 'defo_updated_at',
      type: 'timestamp',
      precision: 0
    }
  ]
});