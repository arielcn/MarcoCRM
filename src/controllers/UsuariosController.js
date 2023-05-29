import { Router } from 'express';
import usuarioServices from '../services/usuario-services.js'
const router = Router();

router.post('', async(req, res) => {
    try {
        await usuarioServices.insertUsuario(req.body)
        res.status(200).json({message: 'user inserted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'insert failed'});
    }
});

router.put('', async(req, res) => {
    try {
        await usuarioServices.updateUsuario(req.body)
        res.status(200).json({message: 'user updated'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'update failed'});
    }
});

router.get('/:id', async(req, res) => {
    const usuario = await usuarioServices.getUsuarioById(req.params.id)
    console.log(res);
    return res.status(200).json(usuario);
});