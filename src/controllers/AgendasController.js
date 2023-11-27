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

routerAgenda.get('/:user_id', async(req, res) => {
    const Agenda = await agendaServices.getAgendaById(req.params.user_id)
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

routerAgenda.get('/:idUsuario', async(req, res) => {
    const Agenda = await agendaServices.getAllAgendas(req.params.idUsuario);
    console.log(res);
    return res.status(200).json(Agenda);
});

routerAgenda.get('/empresa/:fkEmpresa', async(req, res) => {
    const agendas = await reunionServices.getAllAgendasPorEmpresa(req.params.fkEmpresa);
    console.log("estoy en get", req.params.fkEmpresa);
    return res.status(200).json(agendas);
});

export default routerAgenda;