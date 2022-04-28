import { Sequelize } from 'sequelize';

// connecting the db, args [database, name, pw, host, dialect]
const db = new Sequelize('node-sql', 'root', 'obsidiana', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

export default db;