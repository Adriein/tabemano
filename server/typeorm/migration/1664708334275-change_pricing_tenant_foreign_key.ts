import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class changePricingTenantForeignKey1664708334275 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("ta_pricing");
    const foreignKey = table!.foreignKeys.find(
      (fk: TableForeignKey) => fk.columnNames.indexOf("pr_tenant_id") !== -1,
    );
    await queryRunner.dropForeignKey(
      "ta_pricing",
      foreignKey!
    );

    await queryRunner.createForeignKey(
      "ta_pricing",
      new TableForeignKey({
        name: "ta_pricing_ta_tenant",
        columnNames: [ "pr_tenant_id" ],
        referencedColumnNames: [ "te_id" ],
        referencedTableName: "ta_tenant",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("ta_pricing");
    const foreignKey = table!.foreignKeys.find(
      (fk: TableForeignKey) => fk.columnNames.indexOf("pr_tenant_id") !== -1,
    );
    await queryRunner.dropForeignKey(
      "ta_pricing",
      foreignKey!
    );

    await queryRunner.createForeignKey(
      "ta_pricing",
      new TableForeignKey({
        name: "ta_pricing_ta_user",
        columnNames: [ "pr_tenant_id" ],
        referencedColumnNames: [ "us_id" ],
        referencedTableName: "ta_user",
        onDelete: "CASCADE",
      }),
    );
  }

}
