import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addNotificationEmailFieldTenantTable1665907967434 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ta_tenant',
      new TableColumn({
        name: 'te_notification_email',
        type: 'varchar',
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'ta_tenant',
      'te_notification_email'
    );
  }
}
