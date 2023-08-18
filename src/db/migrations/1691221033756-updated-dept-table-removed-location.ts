import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedDeptTableRemovedLocation1691221033756 implements MigrationInterface {
    name = 'UpdatedDeptTableRemovedLocation1691221033756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP COLUMN "location"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" ADD "location" character varying NOT NULL`);
    }

}
