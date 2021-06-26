"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEmpleado = exports.eliminar = exports.actualizarEmpleado = exports.getEmpleado = exports.crearEmpleado = exports.crear = exports.getEmpleadoxId = exports.getEmpleados = void 0;
const mysqldb_1 = require("../mysqldb");
const getEmpleados = (req, res) => new Promise((resolve, reject) => {
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            console.log('MYSQL Connection: ', connection.threadId);
            connection.query('SELECT * FROM empleado', (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al tratar de mostrar" });
                }
                else {
                    //res.send(results)
                    res.render('empleados', { empleados: results });
                }
            });
        }
    });
});
exports.getEmpleados = getEmpleados;
const getEmpleadoxId = (req, res) => new Promise((resolve, reject) => {
    const legEmp = parseInt(req.params.legajo);
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query('SELECT * FROM empleado WHERE legajo=?', [legEmp], (err, results) => {
            if (err) {
                console.error(err);
                res.send(err);
                return;
            }
            else {
                res.render('empleado', { empleado: results[0] });
            }
        });
    });
});
exports.getEmpleadoxId = getEmpleadoxId;
const crear = (req, res) => new Promise((resolve, reject) => {
    res.render('crearEmpleado');
});
exports.crear = crear;
const crearEmpleado = (req, res) => new Promise((resolve, reject) => {
    const { legajo, apellido, nombre, dni, sector, fechaIngreso, activo } = req.body;
    var values = [legajo, apellido, nombre, dni, sector, fechaIngreso, activo];
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = 'INSERT INTO empleado (legajo, apellido, nombre, dni, sector, fechaIngreso, activo) VALUES (?, ?, ?, ?, ?, ?, ?)';
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al tratar de insertar" });
                }
                else {
                    res.redirect('/app/empleados');
                }
            });
        }
    });
});
exports.crearEmpleado = crearEmpleado;
const getEmpleado = (req, res) => new Promise((resolve, reject) => {
    const legEmp = parseInt(req.params.legajo);
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query('SELECT * FROM empleado WHERE legajo=?', [legEmp], (err, results) => {
            if (err) {
                console.error(err);
                res.send(err);
                return;
            }
            else {
                res.render('modificarEmpleado', { empleado: results[0] });
            }
        });
    });
});
exports.getEmpleado = getEmpleado;
const actualizarEmpleado = (req, res) => new Promise((resolve, reject) => {
    const { legajo, apellido, nombre, dni, sector, fechaIngreso, activo } = req.body;
    var values = [apellido, nombre, dni, sector, fechaIngreso, activo, legajo];
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = 'UPDATE empleado SET apellido=?, nombre=?, dni=?, sector=?, fechaIngreso=?, activo=? WHERE legajo=?';
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al actualizar " + err });
                }
                else {
                    res.redirect('/app/empleados');
                }
            });
        }
    });
});
exports.actualizarEmpleado = actualizarEmpleado;
const eliminar = (req, res) => new Promise((resolve, reject) => {
    const legEmp = parseInt(req.params.legajo);
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query('SELECT * FROM empleado WHERE legajo=?', [legEmp], (err, results) => {
            if (err) {
                console.error(err);
                res.send(err);
                return;
            }
            else {
                res.render('deleteEmpleado', { empleado: results[0] });
            }
        });
    });
});
exports.eliminar = eliminar;
const eliminarEmpleado = (req, res) => new Promise((resolve, reject) => {
    const legEmp = parseInt(req.body.legajo);
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query('DELETE FROM empleado WHERE legajo=?', [legEmp], (err, results) => {
            if (err) {
                console.error(err);
                res.json({ message: "Error al tratar de Eliminar" });
            }
            else {
                res.redirect('/app/empleados');
            }
        });
    });
});
exports.eliminarEmpleado = eliminarEmpleado;
