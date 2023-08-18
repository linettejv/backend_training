import { MigrationInterface, QueryRunner } from "typeorm";

export class FormattedColsInAddress1691296828097 implements MigrationInterface {
    name = 'FormattedColsInAddress1691296828097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line2" character varying `);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" character varying `);
        await queryRunner.query(`ALTER TABLE "address" ADD "state" character varying `);
        await queryRunner.query(`ALTER TABLE "address" ADD "country" character varying `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line2"`);
    }

}
