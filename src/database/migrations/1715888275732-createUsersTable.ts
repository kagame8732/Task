import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1715888275732 implements MigrationInterface {
  name = 'CreateUsersTable1715888275732';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_entity"`);
  }
}
