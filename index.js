import express from 'express';
import cors from 'cors';
import clienteServices from './src/controllers/ClientesController.js';
import notaServices from './src/controllers/NotasController.js';
import reunionServices from './src/controllers/ReunionesController.js';
import usuarioServices from './src/controllers/UsuariosController.js';
import agendaServices from './src/controllers/AgendasController.js';


const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use('/clientes', clienteServices);
app.use('/notas', notaServices);
app.use('/reuniones', reunionServices);
app.use('/usuario', usuarioServices);
app.use('/agenda', agendaServices);


app.listen(port, () => {
    console.log(`Escuchando al puerto ${port}`)
})
