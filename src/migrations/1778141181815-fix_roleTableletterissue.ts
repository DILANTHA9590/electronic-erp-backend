import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRoleTableletterissue1778141181815 implements MigrationInterface {
    name = 'FixRoleTableletterissue1778141181815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ac35f51a0f17e3e1fe12112603\` ON \`roles\``);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`role_name\` \`roleName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`roleName\``);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`roleName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD UNIQUE INDEX \`IDX_992f24b9d80eb1312440ca577f\` (\`roleName\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles\` DROP INDEX \`IDX_992f24b9d80eb1312440ca577f\``);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`roleName\``);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`roleName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles\` CHANGE \`roleName\` \`role_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ac35f51a0f17e3e1fe12112603\` ON \`roles\` (\`role_name\`)`);
    }

}
