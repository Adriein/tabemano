import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class makeCompanyIdNullable1665310902637 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "ta_tenant",
      "te_company_id",
      new TableColumn({
        name: "te_company_id",
        type: "varchar",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "ta_tenant",
      new TableForeignKey({
        name: "ta_tenant_ta_company",
        columnNames: [ "te_company_id" ],
        referencedColumnNames: [ "co_id" ],
        referencedTableName: "ta_company",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "ta_tenant",
      "te_company_id",
      new TableColumn({
        name: "te_company_id",
        type: "varchar",
      }),
    );

    await queryRunner.createForeignKey(
      "ta_tenant",
      new TableForeignKey({
        name: "ta_tenant_ta_company",
        columnNames: [ "te_company_id" ],
        referencedColumnNames: [ "co_id" ],
        referencedTableName: "ta_company",
      }),
    );
  }

}
