import express from 'express';
import cors from 'cors';
import routerTareas from './src/controllers/TareasController.js';
import reunionRouter from './src/controllers/ReunionesController.js';
import usuarioRouter from './src/controllers/UsuariosController.js';
import routerAgenda from './src/controllers/AgendasController.js';
import routerClientes from './src/controllers/ClientesController.js';


const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use('/clientes', routerClientes);
app.use('/tareas', routerTareas);
app.use('/reuniones', reunionRouter);
app.use('/usuario', usuarioRouter);
app.use('/agenda', routerAgenda);


app.listen(port, () => {
    console.log(`Escuchando al puerto ${port}`)
})
