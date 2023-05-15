import express from 'express';
import cors from 'cors';
import {MarCo} from './src/services/marco-services.js';


const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Escuchando al puerto ${port}`)
})
