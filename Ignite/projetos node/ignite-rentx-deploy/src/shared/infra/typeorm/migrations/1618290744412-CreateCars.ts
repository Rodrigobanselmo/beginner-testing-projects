import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCars1618290744412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'daily_rate',
            type: 'numeric',
          },
          {
            name: 'available',
            type: 'boolean',
            default: true,
          },
          {
            name: 'license_plate',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'fine_amount',
            type: 'numeric',
          },
          {
            name: 'brand',
            type: 'varchar',
          },
          {
            name: 'category_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKCategoryCar',
            referencedTableName: 'categories',
            columnNames: ['category_id'],
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars');
  }
}
