import { Router } from 'express';
import tareaServices from "../services/tarea-services.js"
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

routerTareas.put('/:id', async(req, res) => {
    try {
        await tareaServices.updateTarea(req.body)
        res.status(200).json({message: 'task updated'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'update failed'});
    }
});

routerTareas.get('/:idUsuario/:idTarea', async(req, res) => {
    const tareas = await tareaServices.getTareaById(req.params.idUsuario, req.params.idTarea)
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

routerTareas.get('/:idUsuario', async(req, res) => {
    const tareas = await tareaServices.getAllTareas(req.params.idUsuario);
    console.log("estoy en get", req.params.idUsuario);
    return res.status(200).json(tareas);
});

export default routerTareas;