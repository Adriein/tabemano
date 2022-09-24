import { MigrationInterface, QueryRunner } from 'typeorm';
import { ModuleTableDefinition } from '../table/ModuleTableDefinition';
import { UrlTableDefinition } from '../table/UrlTableDefinition';
import { PermissionTableDefinition } from '../table/PermissionTableDefinition';

export class createModuleTable1662825221229 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(ModuleTableDefinition, true);

    await queryRunner.createTable(PermissionTableDefinition, true);

    await queryRunner.createTable(UrlTableDefinition, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
