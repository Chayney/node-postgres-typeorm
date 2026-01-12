import { MigrationInterface, QueryRunner } from "typeorm";

export class TodoTable1768215378044 implements MigrationInterface {
    name = 'TodoTable1768215378044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todos" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todos"`);
    }

}
