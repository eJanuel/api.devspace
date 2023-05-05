import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1682632994571 implements MigrationInterface {
    name = 'Init1682632994571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`project_settings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`visibility\` varchar(255) NOT NULL DEFAULT 'private', \`read_permLevel\` int NOT NULL DEFAULT '0', \`write_permLevel\` int NOT NULL DEFAULT '0', \`projectId\` int NULL, UNIQUE INDEX \`REL_fcdef2438667203eadf5936320\` (\`projectId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`schemas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`projectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_settings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`visibility\` varchar(255) NOT NULL DEFAULT 'private', \`userId\` int NULL, UNIQUE INDEX \`REL_986a2b6d3c05eb4091bb8066f7\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`temporary_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_invitations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`permLevel\` int NOT NULL DEFAULT '0', \`token\` varchar(255) NOT NULL, \`projectId\` int NULL, \`senderId\` int NULL, \`receiver_id\` int NULL, \`temporary_receiver_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstname\` varchar(255) NULL, \`lastname\` varchar(255) NULL, \`avatar\` varchar(255) NOT NULL DEFAULT 'c4c6eb', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`permLevel\` int NOT NULL DEFAULT '0', \`projectId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`projectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`note_settings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`visibility\` varchar(255) NOT NULL DEFAULT 'private', \`read_permLevel\` int NOT NULL DEFAULT '0', \`write_permLevel\` int NOT NULL DEFAULT '0', \`noteId\` int NULL, UNIQUE INDEX \`REL_87cb31943756c3623977446e11\` (\`noteId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`project_settings\` ADD CONSTRAINT \`FK_fcdef2438667203eadf5936320b\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schemas\` ADD CONSTRAINT \`FK_a881c7301b25274cccae2b4a081\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_settings\` ADD CONSTRAINT \`FK_986a2b6d3c05eb4091bb8066f78\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_invitations\` ADD CONSTRAINT \`FK_55c8a93fcb3af8430c930e3a26a\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_invitations\` ADD CONSTRAINT \`FK_543c961911c02957a932821fc82\` FOREIGN KEY (\`senderId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_invitations\` ADD CONSTRAINT \`FK_32d1f76a72a454a7704f6cff1d9\` FOREIGN KEY (\`receiver_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_invitations\` ADD CONSTRAINT \`FK_59676cd9ec3f547d641a7e8494b\` FOREIGN KEY (\`temporary_receiver_id\`) REFERENCES \`temporary_users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_users\` ADD CONSTRAINT \`FK_1905d9d76173d09c07ba1f0cd84\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_users\` ADD CONSTRAINT \`FK_6ebc83af455ff1ed9573c823e23\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notes\` ADD CONSTRAINT \`FK_abf7aa9bc3c992c60498f4a5448\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`note_settings\` ADD CONSTRAINT \`FK_87cb31943756c3623977446e11e\` FOREIGN KEY (\`noteId\`) REFERENCES \`notes\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note_settings\` DROP FOREIGN KEY \`FK_87cb31943756c3623977446e11e\``);
        await queryRunner.query(`ALTER TABLE \`notes\` DROP FOREIGN KEY \`FK_abf7aa9bc3c992c60498f4a5448\``);
        await queryRunner.query(`ALTER TABLE \`project_users\` DROP FOREIGN KEY \`FK_6ebc83af455ff1ed9573c823e23\``);
        await queryRunner.query(`ALTER TABLE \`project_users\` DROP FOREIGN KEY \`FK_1905d9d76173d09c07ba1f0cd84\``);
        await queryRunner.query(`ALTER TABLE \`project_invitations\` DROP FOREIGN KEY \`FK_59676cd9ec3f547d641a7e8494b\``);
        await queryRunner.query(`ALTER TABLE \`project_invitations\` DROP FOREIGN KEY \`FK_32d1f76a72a454a7704f6cff1d9\``);
        await queryRunner.query(`ALTER TABLE \`project_invitations\` DROP FOREIGN KEY \`FK_543c961911c02957a932821fc82\``);
        await queryRunner.query(`ALTER TABLE \`project_invitations\` DROP FOREIGN KEY \`FK_55c8a93fcb3af8430c930e3a26a\``);
        await queryRunner.query(`ALTER TABLE \`user_settings\` DROP FOREIGN KEY \`FK_986a2b6d3c05eb4091bb8066f78\``);
        await queryRunner.query(`ALTER TABLE \`schemas\` DROP FOREIGN KEY \`FK_a881c7301b25274cccae2b4a081\``);
        await queryRunner.query(`ALTER TABLE \`project_settings\` DROP FOREIGN KEY \`FK_fcdef2438667203eadf5936320b\``);
        await queryRunner.query(`DROP INDEX \`REL_87cb31943756c3623977446e11\` ON \`note_settings\``);
        await queryRunner.query(`DROP TABLE \`note_settings\``);
        await queryRunner.query(`DROP TABLE \`notes\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP TABLE \`project_users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`project_invitations\``);
        await queryRunner.query(`DROP TABLE \`temporary_users\``);
        await queryRunner.query(`DROP INDEX \`REL_986a2b6d3c05eb4091bb8066f7\` ON \`user_settings\``);
        await queryRunner.query(`DROP TABLE \`user_settings\``);
        await queryRunner.query(`DROP TABLE \`schemas\``);
        await queryRunner.query(`DROP INDEX \`REL_fcdef2438667203eadf5936320\` ON \`project_settings\``);
        await queryRunner.query(`DROP TABLE \`project_settings\``);
    }

}
