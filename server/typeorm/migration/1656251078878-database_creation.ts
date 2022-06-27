import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"
import { ConfigTableDefinition } from "../table/ConfigTableDefinition";
import { PricingTableDefinition } from "../table/PricingTableDefinition";
import { RoleTableDefinition } from "../table/RoleTableDefinition";
import { SubscriptionTableDefinition } from "../table/SubscriptionTableDefinition";
import { UserTableDefinition } from "../table/UserTableDefinition";

export class databaseCreation1656251078878 implements MigrationInterface {
  private DATABASE_NAME = 'tabemano';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase(this.DATABASE_NAME, true);

    await queryRunner.createTable(RoleTableDefinition, true);

    await queryRunner.createTable(ConfigTableDefinition, true);

    await queryRunner.createTable(UserTableDefinition, true, true);

    await queryRunner.createForeignKey('ta_config', new TableForeignKey({
      columnNames: [ "co_user_id" ],
      referencedColumnNames: [ "us_id" ],
      referencedTableName: "ta_user",
      onDelete: "CASCADE",
    }));

    await queryRunner.createTable(PricingTableDefinition, true, true);
    
    await queryRunner.createTable(SubscriptionTableDefinition, true, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
