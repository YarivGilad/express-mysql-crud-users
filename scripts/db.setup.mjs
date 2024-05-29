export default `
DROP DATABASE \`crud-demo\`;
CREATE DATABASE \`crud-demo\`;
CREATE TABLE \`crud-demo\`.\`users\` (
  \`id\` VARCHAR(40) NOT NULL DEFAULT uuid(),
  \`first_name\` VARCHAR(55) NOT NULL,
  \`last_name\` VARCHAR(55) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL,
  \`phone\` VARCHAR(45) NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE INDEX \`email_UNIQUE\` (\`email\` ASC) VISIBLE);
`