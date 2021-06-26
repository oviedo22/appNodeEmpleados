import { Request, Response } from 'express'
import { cxMysql } from '../mysqldb'

export const getEmpleados = (req: Request, res: Response) => new Promise((resolve, reject) => {
    cxMysql.getConnection((err, connection) => {
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
                    res.json({ message: "Error al tratar de mostrar" })
                } else {
                    //res.send(results)
                    res.render('empleados', {empleados:results});
                }
            });
        }
    });
});

export const getEmpleadoxId = (req: Request, res: Response) => new Promise((resolve, reject) => {
    const legEmp = parseInt(req.params.legajo);
    cxMysql.getConnection((err, connection) => {
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
            } else {
                res.render('empleado', {empleado:results[0]});
            }
        })
    })
})

export const crear = (req:Request, res:Response) => new Promise((resolve,reject)=>{
    res.render('crearEmpleado');
})

export const crearEmpleado = (req: Request, res: Response) => new Promise((resolve, reject) => {
    const { legajo, apellido, nombre, dni, sector, fechaIngreso, activo } = req.body;
    var values = [legajo, apellido, nombre, dni, sector, fechaIngreso, activo];
    cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql: string = 'INSERT INTO empleado (legajo, apellido, nombre, dni, sector, fechaIngreso, activo) VALUES (?, ?, ?, ?, ?, ?, ?)';
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al tratar de insertar" })
                } else {
                    res.redirect('/app/empleados');
                }
            })
        }
    })
})

export const getEmpleado = (req: Request, res: Response) => new Promise((resolve, reject) => {
    const legEmp = parseInt(req.params.legajo);
    cxMysql.getConnection((err, connection) => {
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
            } else {
                res.render('modificarEmpleado', {empleado:results[0]});
            }
        })
    })
})

export const actualizarEmpleado = (req: Request, res: Response) => new Promise((resolve, reject) => {
    const { legajo, apellido, nombre, dni, sector, fechaIngreso, activo } = req.body;
    var values = [apellido, nombre, dni, sector, fechaIngreso, activo, legajo];
    cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        } else {
            let sql: string = 'UPDATE empleado SET apellido=?, nombre=?, dni=?, sector=?, fechaIngreso=?, activo=? WHERE legajo=?';
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al actualizar " + err })
                } else {
                    res.redirect('/app/empleados');
                }
            })
        }
    })
})

export const eliminar = (req:Request, res:Response) => new Promise((resolve,reject)=>{
    const legEmp = parseInt(req.params.legajo);
    cxMysql.getConnection((err, connection) => {
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
            } else {
                res.render('deleteEmpleado', {empleado:results[0]});
            }
        })
    })
})  

export const eliminarEmpleado = (req: Request, res: Response) => new Promise((resolve, reject) => {
    const legEmp = parseInt(req.body.legajo);
    cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }

        connection.query('DELETE FROM empleado WHERE legajo=?', [legEmp], (err, results) => {
            if (err) {
                console.error(err);
                res.json({ message: "Error al tratar de Eliminar" })
            } else {
                res.redirect('/app/empleados');
            }

        })

    })
})