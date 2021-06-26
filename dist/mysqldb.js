"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cxMysql = void 0;
const mysql_1 = require("mysql");
exports.cxMysql = mysql_1.createPool({
    host: 'localhost',
    user: 'root',
    password: 'teuuslib1',
    database: 'practicocuatro',
    connectionLimit: 100 //100 es el valor por defecto y depende del hardware
});
