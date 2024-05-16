import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasksTable1715888319991 implements MigrationInterface {
  name = 'CreateTasksTable1715888319991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."task_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'DONE')`
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying(255) NOT NULL, "title" character varying(255) NOT NULL, "description" text NOT NULL, "status" "public"."task_status_enum" NOT NULL DEFAULT 'OPEN', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
  }
}
