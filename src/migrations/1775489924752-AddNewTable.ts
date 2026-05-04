import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewTable1775489924752 implements MigrationInterface {
    name = 'AddNewTable1775489924752'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role_name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ac35f51a0f17e3e1fe12112603\` (\`role_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`role_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`salt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`salt\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`salt\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`salt\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`role_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_ac35f51a0f17e3e1fe12112603\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
