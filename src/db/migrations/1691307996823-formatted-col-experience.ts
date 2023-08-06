import { MigrationInterface, QueryRunner } from "typeorm";

export class FormattedColExperience1691307996823 implements MigrationInterface {
    name = 'FormattedColExperience1691307996823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
   
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "joining_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "country" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "city" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "address_line2" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer`);
    }

}
