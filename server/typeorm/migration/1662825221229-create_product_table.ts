import { MigrationInterface, QueryRunner } from 'typeorm';
import { ProductTableDefinition } from '../table/ProductTableDefinition';
import { UrlTableDefinition } from '../table/UrlTableDefinition';
import { PermissionTableDefinition } from '../table/PermissionTableDefinition';

export class createProductTable1662825221229 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(ProductTableDefinition, true);

    await queryRunner.createTable(PermissionTableDefinition, true);

    await queryRunner.createTable(UrlTableDefinition, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
