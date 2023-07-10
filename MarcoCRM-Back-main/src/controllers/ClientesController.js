import { Router } from 'express';
import clienteServices from '../services/cliente-services.js'
const routerClientes = Router();

routerClientes.post('', async(req, res) => {
    try {
        const result = await clienteServices.insertCliente(req.body.cliente)
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'insert failed'});
    }
});

routerClientes.put('', async(req, res) => {
    try {
        await clienteServices.updateCliente(req.body)
        res.status(200).json({message: 'client updated'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'update failed'});
    }
});

routerClientes.get('/:id', async(req, res) => {
    const clientes = await clienteServices.getClienteById(req.params.id)
    console.log(res);
    return res.status(200).json(clientes);
});

routerClientes.delete('/:id', async(req, res) => {
    try {
        await clienteServices.deleteCliente(req.params.id)
        res.status(200).json({message: 'client deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'delete failed'});
    }
});

routerClientes.get('', async(req, res) => {
    const clientes = await clienteServices.getAllClientes(req.body.nombreEmpresa);
    console.log(res);
    return res.status(200).json(clientes);
});

export default routerClientes;