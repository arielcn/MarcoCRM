import { Router } from 'express';
import agendaServices from '../services/agenda-services.js'
const routerAgenda = Router();

routerAgenda.post('', async(req, res) => {
    try {
        await agendaServices.insertAgenda(req.body)
        res.status(200).json({message: 'scheduled inserted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'scheduled failed'});
    }
});

routerAgenda.put('', async(req, res) => {
    try {
        await agendaServices.updateAgenda(req.body)
        res.status(200).json({message: 'scheduled updated'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'update failed'});
    }
});

routerAgenda.get('/:id', async(req, res) => {
    const Agenda = await agendaServices.getAgendaById(req.params.id)
    console.log(res);
    return res.status(200).json(Agenda);
});

routerAgenda.delete('/:id', async(req, res) => {
    try {
        await agendaServices.deleteAgenda(req.params.id)
        res.status(200).json({message: 'scheduled deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'delete failed'});
    }
});

routerAgenda.get('', async(req, res) => {
    const Agenda = await agendaServices.getAllAgendas();
    console.log(res);
    return res.status(200).json(Agenda);
});

export default routerAgenda;