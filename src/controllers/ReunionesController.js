import { Router } from 'express';
import reunionServices from '../services/reunion-services'
const router = Router();

router.post('', async(req, res) => {
    try {
        await reunionServices.insertReunion(req.body)
        res.status(200).json({message: 'meeting inserted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'meeting failed'});
    }
});

router.put('', async(req, res) => {
    try {
        await reunionServices.updateReunion(req.body)
        res.status(200).json({message: 'meeting updated'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'update failed'});
    }
});

router.get('/:id', async(req, res) => {
    const reunion = await reunionServices.getReunionById(req.params.id)
    console.log(res);
    return res.status(200).json(reunion);
});

router.delete('/:id', async(req, res) => {
    try {
        await notasServices.deleteReunion(req.params.id)
        res.status(200).json({message: 'meeting deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'delete failed'});
    }
});

router.get('', async(req, res) => {
    const reuniones = await reunionServices.getAllReuniones();
    console.log(res);
    return res.status(200).json(reuniones);
});