import { MigrationInterface, QueryRunner } from 'typeorm';
import { ThirdPartyServiceTableDefinition } from '../table/ThirdPartyServiceTableDefinition';

export class createThirdPartyServiceTable1666085460265 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(ThirdPartyServiceTableDefinition, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ThirdPartyServiceTableDefinition, true);
  }
}
