import fs       from 'fs/promises';
import mysql    from 'mysql2/promise';
import log      from '@ajar/marker';
import path, { dirname }      from 'path';
import { fileURLToPath } from 'url';
// import sql from './db.setup.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

let connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    // database: process.env.DB_NAME,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASSWORD,
});

await connection.connect();

log.magenta(' ✨  Connected to MySql DB ✨ ');


// const sql = await fs.readFile(path.resolve(__dirname,'setup.sql'),'utf-8');
// console.log({sql});
// console.log(sql.trim());
// console.log(sql.trim()); 

// const results = await connection.query(sql.trim());
// console.log({results});

// const results = await connection.query('DROP DATABASE IF EXISTS `crud-demo`;');
// const results = await connection.query('CREATE DATABASE `crud-demo`');
// const results = await connection.query('USE `crud-demo`');

// const sql = 'CREATE TABLE `crud-demo`.`users` ('+
//     '`id` VARCHAR(40) PRIMARY KEY NOT NULL DEFAULT (UUID()),'+
//     '`first_name` VARCHAR(55) NOT NULL,'+
//     '`last_name` VARCHAR(55) NOT NULL,'+
//     '`email` VARCHAR(100) NOT NULL,'+
//     '`phone` VARCHAR(45) NULL,'+
//     'UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE'+
//     ');'
// console.log(sql.trim());
// const results = await connection.query(sql);
// console.log({results});

// const q = `DROP DATABASE \`crud-demo\`;
// CREATE DATABASE \`crud-demo\`;
// USE \`crud-demo\`;
// CREATE TABLE \`users\` (
//   \`id\` VARCHAR(40) PRIMARY KEY NOT NULL DEFAULT (UUID()),
//   \`first_name\` VARCHAR(55) NOT NULL,
//   \`last_name\` VARCHAR(55) NOT NULL,
//   \`email\` VARCHAR(100) NOT NULL,
//   \`phone\` VARCHAR(45) NULL,
//   UNIQUE INDEX \`email_UNIQUE\` (\`email\` ASC) VISIBLE);
// `
// const results = await connection.query(q);
// console.log({results});