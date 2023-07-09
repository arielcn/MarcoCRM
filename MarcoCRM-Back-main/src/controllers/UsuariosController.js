import { Router } from 'express';
import usuarioServices from '../services/usuario-services.js'
const usuarioRouter = Router();

usuarioRouter.post('', async(req, res) => {
    try {
        const result = await usuarioServices.insertUsuario(req.body.usuario)
        if(result == false){
            res.status(401).json({message: "error, usuario ya existente"});
        }
        else{
            res.status(201).json({message: "usuario registrado correctamente!"});
        }
        
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
    const usuario = await usuarioServices.getUsuarioByMailYContra(req.body.usuario.mail, req.body.usuario.pass)
    console.log("ENDPOINT", usuario);
    if(usuario == null){
        res.status(401).json({message: "Usuario no encontrado"});
    }
    else{
        return res.status(200).json(usuario);
    }
    
});

usuarioRouter.get('/getByEmpresa/:idEmpresa', async(req, res) => {
    const usuario = await usuarioServices.getAllVendedores(req.params.idEmpresa);
    console.log(res);
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

usuarioRouter.get('', async(req, res) => {
    const usuarios = await usuarioServices.getAllVendedores();
    console.log(res);
    return res.status(200).json(usuarios);
});

export default usuarioRouter;