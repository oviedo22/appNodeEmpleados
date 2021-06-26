import {createPool} from 'mysql'

export const cxMysql = createPool({

    host:'localhost',
    user:'root',
    password:'teuuslib1',
    database:'practicocuatro',
    connectionLimit: 100 //100 es el valor por defecto y depende del hardware
});