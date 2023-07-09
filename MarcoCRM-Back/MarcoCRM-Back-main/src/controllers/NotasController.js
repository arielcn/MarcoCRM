import { Router } from 'express';
import notasServices from '../services/nota-services.js'
const routerNotas = Router();

routerNotas.post('', async(req, res) => {
    try {
        await notasServices.insertNota(req.body)
        res.status(200).json({message: 'note inserted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'note failed'});
    }
});

routerNotas.put('', async(req, res) => {
    try {
        await notasServices.updateNota(req.body)
        res.status(200).json({message: 'note updated'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'update failed'});
    }
});

routerNotas.get('/:id', async(req, res) => {
    const notas = await notasServices.getNotaById(req.params.id)
    console.log(res);
    return res.status(200).json(notas);
});

routerNotas.delete('/:id', async(req, res) => {
    try {
        await notasServices.deleteNota(req.params.id)
        res.status(200).json({message: 'note deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'delete failed'});
    }
});

routerNotas.get('', async(req, res) => {
    const notas = await notasServices.getAllNotas();
    console.log(res);
    return res.status(200).json(notas);
});

export default routerNotas;