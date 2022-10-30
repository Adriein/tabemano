import { MigrationInterface, QueryRunner } from "typeorm"
import { TenantCompanyTableDefinition } from "../table/TenantCompanyTableDefinition";

export class relationTableTenantCompany1666516069201 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(TenantCompanyTableDefinition, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TenantCompanyTableDefinition, true);
  }

}
