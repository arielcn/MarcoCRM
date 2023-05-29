import { Router } from 'express';
import clienteServices from '../services/cliente-services'
const router = Router();

router.post('', async(req, res) => {
    try {
        await clienteServices.insertCliente(req.body)
        res.status(200).json({message: 'client inserted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'insert failed'});
    }
});

router.put('', async(req, res) => {
    try {
        await clienteServices.updateCliente(req.body)
        res.status(200).json({message: 'client updated'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'update failed'});
    }
});

router.get('/:id', async(req, res) => {
    const clientes = await clienteServices.getClienteById(req.params.id)
    console.log(res);
    return res.status(200).json(clientes);
});

router.delete('/:id', async(req, res) => {
    try {
        await clienteServices.deleteCliente(req.params.id)
        res.status(200).json({message: 'client deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'delete failed'});
    }
});

router.get('', async(req, res) => {
    const clientes = await clienteServices.getAllClientes();
    console.log(res);
    return res.status(200).json(clientes);
});