import { MigrationInterface, QueryRunner } from "typeorm"
import { CronTableDefinition } from "../table/CronTableDefinition";

export class cronRegisterTable1661004511549 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(CronTableDefinition, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CronTableDefinition, true)
  }

}
