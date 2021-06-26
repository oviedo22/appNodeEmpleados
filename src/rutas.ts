import {Router} from 'express'
import {getEmpleados, getEmpleadoxId, crear, crearEmpleado, getEmpleado, actualizarEmpleado, eliminar, eliminarEmpleado} from './controlador/controlador'

const router =Router();

router.get('/', (requ, resp) => resp.send('HOLA MUNDO'));

router.get('/empleados',getEmpleados);
router.get('/empleados/:legajo',getEmpleadoxId);
router.get('/crear',crear);
router.post('/insert',crearEmpleado);
router.get('/empleados/:legajo/modificar',getEmpleado);
router.post('/update',actualizarEmpleado);
router.get('/empleados/:legajo/eliminar/',eliminar)
router.post('/delete', eliminarEmpleado);

export default router;