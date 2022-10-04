import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class addTenantIdFieldInSubscription1664706786285 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "ta_subscription",
      "su_user_id",
      new TableColumn({
        name: "su_user_id",
        type: "varchar",
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      "ta_subscription",
      new TableColumn({
        name: "su_tenant_id",
        type: "varchar",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "ta_subscription",
      new TableForeignKey({
        name: "ta_subscription_ta_tenant",
        columnNames: [ "su_tenant_id" ],
        referencedColumnNames: [ "te_id" ],
        referencedTableName: "ta_tenant",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "ta_subscription",
      new TableForeignKey({
        name: "ta_subscription_ta_user",
        columnNames: [ "su_user_id" ],
        referencedColumnNames: [ "us_id" ],
        referencedTableName: "ta_user",
        onDelete: "CASCADE",
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("ta_subscription");
    const foreignKey = table!.foreignKeys.find(
      (fk: TableForeignKey) => fk.columnNames.indexOf("su_tenant_id") !== -1,
    );
    await queryRunner.dropForeignKey(
      "ta_subscription",
      foreignKey!
    );

    await queryRunner.dropColumn("ta_subscription", "su_tenant_id");
  }

}
