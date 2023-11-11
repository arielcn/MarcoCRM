import { Router } from 'express';
import tareaServices from '../services/tarea-services';
const routerTareas = Router();

routerTareas.post('', async(req, res) => {
    try {
        await tareaServices.insertTarea(req.body)
        res.status(200).json({message: 'task inserted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'task failed'});
    }
});

routerTareas.put('', async(req, res) => {
    try {
        await tareaServices.updateTarea(req.body)
        res.status(200).json({message: 'task updated'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'update failed'});
    }
});

routerTareas.get('/:id', async(req, res) => {
    const tareas = await tareaServices.getTareaById(req.params.id)
    console.log(res);
    return res.status(200).json(tareas);
});

routerTareas.delete('/:id', async(req, res) => {
    try {
        await tareaServices.deleteTarea(req.params.id)
        res.status(200).json({message: 'note deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'delete failed'});
    }
});

routerTareas.get('', async(req, res) => {
    const tareas = await tareaServices.getAllTareas();
    console.log(res);
    return res.status(200).json(tareas);
});

export default routerTareas;