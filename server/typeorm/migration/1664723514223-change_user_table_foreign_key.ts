import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class changeUserTableForeignKey1664723514223 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "ta_user",
      new TableForeignKey({
        name: "ta_user_ta_tenant",
        columnNames: [ "us_tenant_id" ],
        referencedColumnNames: [ "te_id" ],
        referencedTableName: "ta_tenant",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("ta_user");
    const foreignKey = table!.foreignKeys.find(
      (fk: TableForeignKey) => fk.columnNames.indexOf("us_tenant_id") !== -1,
    );
    await queryRunner.dropForeignKey(
      "ta_user",
      foreignKey!
    );
  }
}