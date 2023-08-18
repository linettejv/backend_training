import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedStatus1692123788748 implements MigrationInterface {
    name = 'AddedStatus1692123788748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "status" character varying `);
       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "role" SET DEFAULT 'DEVELOPER'`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "department_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "joining_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "address_line2" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "status"`);
    }

}
