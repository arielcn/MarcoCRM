import { Router } from 'express';
import usuarioServices from '../services/usuario-services.js'
const usuarioRouter = Router();

usuarioRouter.post('', async(req, res) => {
    try {
        await usuarioServices.insertUsuario(req.body)
        res.status(200).json({message: 'user inserted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'insert failed'});
    }
});

usuarioRouter.put('', async(req, res) => {
    try {
        await usuarioServices.updateUsuario(req.body)
        res.status(200).json({message: 'user updated'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'update failed'});
    }
});

usuarioRouter.get('/getById/:id', async(req, res) => {
    const usuario = await usuarioServices.getUsuarioById(req.params.id)
    return res.status(200).json(usuario);
});

usuarioRouter.get('/login', async(req, res) => {
    const usuario = await usuarioServices.getUsuarioByNombreYContra(req.body.usuario.nombre, req.body.usuario.contraseña)
    return res.status(200).json(usuario);
});

usuarioRouter.delete('/:id', async(req, res) => {
    const rowsAffected = await usuarioServices.deleteUsuario(req.params.id);
    if (rowsAffected > 0) {
        res.status(200).json({message: 'user deleted'});
    } else if (rowsAffected === 0) {
        res.status(404).json({error: 'not found'});
    }
    else res.status(500).json({error: 'server error'});
})

export default usuarioRouter;