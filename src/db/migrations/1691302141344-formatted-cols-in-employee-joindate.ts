import { MigrationInterface, QueryRunner } from "typeorm";

export class FormattedColsInEmployeeJoindate1691302141344 implements MigrationInterface {
    name = 'FormattedColsInEmployeeJoindate1691302141344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "joining_date" character varying `);
     
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "address_line2" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "joining_date"`);
    }

}
