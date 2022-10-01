import { MigrationInterface, QueryRunner } from "typeorm"
import { TenantTableDefinition } from "../table/TenantTableDefinition";

export class createTenantTable1664616733772 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(TenantTableDefinition, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TenantTableDefinition, true);
  }

}
