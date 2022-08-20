import { MigrationInterface, QueryRunner } from "typeorm"
import { BackGroundJobTableDefinition } from "../table/BackGroundJobTableDefinition";

export class cronRegisterTable1661004511549 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(BackGroundJobTableDefinition, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(BackGroundJobTableDefinition, true)
  }

}
