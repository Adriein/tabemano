import { MigrationInterface, QueryRunner } from "typeorm"
import { CompanyTableDefinition } from "../table/CompanyTableDefinition";

export class createCompanyTable1664613663019 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(CompanyTableDefinition, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(CompanyTableDefinition, true);
  }

}
