import { Router } from 'express';
import reunionServices from '../services/reunion-services.js'
const reunionRouter = Router();

reunionRouter.post('', async(req, res) => {
    try {
        await reunionServices.insertReunion(req.body)
        res.status(200).json({message: 'meeting inserted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'meeting failed'});
    }
});

reunionRouter.put('', async(req, res) => {
    try {
        await reunionServices.updateReunion(req.body)
        res.status(200).json({message: 'meeting updated'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'update failed'});
    }
});

reunionRouter.get('/:idUsuario/:idReunion', async(req, res) => {
    const reunion = await reunionServices.getReunionById(req.params.idReunion)
    console.log(res);
    return res.status(200).json(reunion);
});

reunionRouter.delete('/:id', async(req, res) => {
    try {
        await notasServices.deleteReunion(req.params.id)
        res.status(200).json({message: 'meeting deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'delete failed'});
    }
});

reunionRouter.get('/:idUsuario', async(req, res) => {
    const reuniones = await reunionServices.getAllReuniones(req.params.idUsuario);
    console.log(res);
    return res.status(200).json(reuniones);
});

export default reunionRouter;