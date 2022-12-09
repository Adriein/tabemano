import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addCurrencyInPricingTable1670579730070 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ta_pricing',
      new TableColumn({
        name: 'pr_currency',
        type: 'varchar',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'ta_pricing',
      'pr_currency'
    );
  }

}
