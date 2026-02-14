import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1771009223388 implements MigrationInterface {
    name = 'CreateUser1771009223388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NULL, \`user_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`isVerified\` tinyint NOT NULL DEFAULT 0, \`password\` varchar(255) NOT NULL, \`user_status\` enum ('pending', 'active', 'blocked') NOT NULL DEFAULT 'pending', \`token_version\` int NOT NULL DEFAULT '0', \`salt\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_074a1f262efaca6aba16f7ed92\` (\`user_name\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_074a1f262efaca6aba16f7ed92\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
