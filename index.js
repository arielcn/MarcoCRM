import express from 'express';
import cors from 'cors';
import clienteServices from './src/controllers/ClientesController.js';
import tareaServices from './src/services/tarea-services.js';
import reunionServices from './src/services/reunion-services.js';
import usuarioServices from './src/controllers/UsuariosController.js';
import agendaServices from './src/controllers/AgendasController.js';


const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use('/clientes', clienteServices);
app.use('/tareas', tareaServices);
app.use('/reuniones', reunionServices);
app.use('/usuario', usuarioServices);
app.use('/agenda', agendaServices);


app.listen(port, () => {
    console.log(`Escuchando al puerto ${port}`)
})
