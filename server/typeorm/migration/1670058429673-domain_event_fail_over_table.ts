import { MigrationInterface, QueryRunner } from "typeorm"
import { DomainEventFailOverTableDefinition } from "../table/DomainEventFailOverTableDefinition";

export class domainEventFailOverTable1670058429673 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(DomainEventFailOverTableDefinition, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(DomainEventFailOverTableDefinition);
  }

}
