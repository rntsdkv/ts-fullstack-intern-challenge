import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUrlToLikes1750596657751 implements MigrationInterface {
    name = 'AddUrlToLikes1750596657751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" ADD "cat_url" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "cat_url"`);
    }

}
