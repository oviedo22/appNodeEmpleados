import express from "express";
import rutas from './rutas';

const app = express();

app.listen(3000, () => {
    console.log("Servidor en puerto 3000 XD", 3000);
   })

//transformar datos a json
app.use(express.json());
//transforma los datos de formulario html a json
app.use(express.urlencoded({extended:true}));

//Avisar que motor de plantilla estamos usando y cuales estaticos
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"));
app.use('/app',rutas);

app.get('/', (req, res)=>{
    res.render('index');
});


app.get('/app/insert', (req, res)=>{
    res.render('crearEmpleado');
});
