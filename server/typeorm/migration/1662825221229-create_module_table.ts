import { MigrationInterface, QueryRunner } from 'typeorm';
import { ModuleTableDefinition } from '../table/ModuleTableDefinition';
import { ModuleUrlTableDefinition } from '../table/ModuleUrlTableDefinition';
import { UrlTableDefinition } from '../table/UrlTableDefinition';
import { UserModuleTableDefinition } from '../table/UserModuleTableDefinition';

export class createModuleTable1662825221229 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(ModuleTableDefinition, true);

    await queryRunner.createTable(UserModuleTableDefinition, true);

    await queryRunner.createTable(UrlTableDefinition, true);

    await queryRunner.createTable(ModuleUrlTableDefinition, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
