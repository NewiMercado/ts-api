"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// connecting the db, args [database, name, pw, host, dialect]
const db = new sequelize_1.Sequelize('node-sql', 'root', 'obsidiana', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});
exports.default = db;
//# sourceMappingURL=connection.js.map