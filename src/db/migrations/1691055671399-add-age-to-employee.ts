import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeToEmployee1691055671399 implements MigrationInterface {
    name = 'AddAgeToEmployee1691055671399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "age" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "age"`);
    }

}
