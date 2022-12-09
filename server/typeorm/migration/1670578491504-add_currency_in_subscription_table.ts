import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addCurrencyInSubscriptionTable1670578491504 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ta_subscription',
      new TableColumn({
        name: 'su_currency',
        type: 'varchar',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'ta_subscription',
      'su_currency'
    );
  }
}
