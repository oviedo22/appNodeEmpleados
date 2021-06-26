"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rutas_1 = __importDefault(require("./rutas"));
const app = express_1.default();
app.listen(3000, () => {
    console.log("Servidor en puerto 3000 XD", 3000);
});
//transformar datos a json
app.use(express_1.default.json());
//transforma los datos de formulario html a json
app.use(express_1.default.urlencoded({ extended: true }));
//Avisar que motor de plantilla estamos usando y cuales estaticos
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express_1.default.static(__dirname + "/public"));
app.use('/app', rutas_1.default);
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/app/insert', (req, res) => {
    res.render('crearEmpleado');
});
