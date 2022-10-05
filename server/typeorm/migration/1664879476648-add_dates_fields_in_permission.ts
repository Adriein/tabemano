import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class addDatesFieldsInPermission1664879476648 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('ta_permission');

    const foreignKey = table!.foreignKeys.find((fk: TableForeignKey) =>
      fk.columnNames.includes('um_tenant_id')
    );

    await queryRunner.dropForeignKey('ta_permission', foreignKey!);

    await queryRunner.changeColumn(
      'ta_permission',
      'um_id',
      new TableColumn({
        name: 'pe_id',
        type: 'varchar',
        isPrimary: true,
      })
    );

    await queryRunner.changeColumn(
      'ta_permission',
      'um_tenant_id',
      new TableColumn({
        name: 'pe_tenant_id',
        type: 'varchar',
      })
    );

    await queryRunner.changeColumn(
      'ta_permission',
      'um_module_id',
      new TableColumn({
        name: 'pe_module_id',
        type: 'varchar',
      })
    );

    await queryRunner.addColumn(
      'ta_permission',
      new TableColumn({
        name: 'pe_created_at',
        type: 'timestamp',
        precision: 0,
      })
    );

    await queryRunner.addColumn(
      'ta_permission',
      new TableColumn({
        name: 'pe_updated_at',
        type: 'timestamp',
        precision: 0,
      })
    );

    await queryRunner.createForeignKey(
      'ta_permission',
      new TableForeignKey({
        name: 'ta_permission_ta_tenant',
        columnNames: ['pe_tenant_id'],
        referencedColumnNames: ['te_id'],
        referencedTableName: 'ta_tenant',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'ta_permission',
      new TableForeignKey({
        name: 'ta_permission_ta_module',
        columnNames: ['pe_module_id'],
        referencedColumnNames: ['mo_id'],
        referencedTableName: 'ta_module',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('ta_permission');

    const moduleForeignKey = table!.foreignKeys.find((fk: TableForeignKey) =>
      fk.columnNames.includes('pe_module_id')
    );
    await queryRunner.dropForeignKey('ta_permission', moduleForeignKey!);

    const foreignKey = table!.foreignKeys.find((fk: TableForeignKey) =>
      fk.columnNames.includes('pe_tenant_id')
    );
    await queryRunner.dropForeignKey('ta_permission', foreignKey!);

    await queryRunner.dropColumn('ta_permission', 'pe_updated_at');

    await queryRunner.dropColumn('ta_permission', 'pe_created_at');

    await queryRunner.changeColumn(
      'ta_permission',
      'pe_module_id',
      new TableColumn({
        name: 'um_module_id',
        type: 'varchar',
      })
    );

    await queryRunner.changeColumn(
      'ta_permission',
      'pe_tenant_id',
      new TableColumn({
        name: 'um_tenant_id',
        type: 'varchar',
      })
    );

    await queryRunner.changeColumn(
      'ta_permission',
      'pe_id',
      new TableColumn({
        name: 'um_id',
        type: 'varchar',
        isPrimary: true,
      })
    );

    await queryRunner.createForeignKey(
      'ta_permission',
      new TableForeignKey({
        name: 'ta_permission_ta_tenant',
        columnNames: ['um_tenant_id'],
        referencedColumnNames: ['us_id'],
        referencedTableName: 'ta_user',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'ta_permission',
      new TableForeignKey({
        name: 'ta_permission_ta_module',
        columnNames: ['um_module_id'],
        referencedColumnNames: ['mo_id'],
        referencedTableName: 'ta_module',
        onDelete: 'CASCADE',
      })
    );
  }
}
