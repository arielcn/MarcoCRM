import { Router } from 'express';
import usuarioServices from '../services/usuario-services.js'
const usuarioRouter = Router();

usuarioRouter.post('', async(req, res) => {
    //console.log("ENDPOINT", req.body);
    try {
        //console.log(req);
        const usuarioData = req.body.usuario;
        const result = await usuarioServices.insertUsuario(usuarioData)
        if(result == false){
            res.status(401).json({message: "Error, usuario ya existente"});
        } else {
            res.status(201).json({ message: "Usuario registrado correctamente!" });
        }

        //else{
            //if (usuarioData.fkRol === 2) {
            //const vendedorExists = await usuarioServices.insertVendedor(usuarioData);
        //    if (vendedorExists === false) {
        //        res.status(401).json({ message: "Error, vendedor ya existente" });
        //    } else {
        //        res.status(201).json({ message: "Vendedor registrado correctamente!" });
        //    }
            //}
        //}
        
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

usuarioRouter.post('/login', async(req, res) => {
    const usuario = await usuarioServices.getUsuarioByMailYContra(req.body.mail, req.body.pass)
    if(!usuario){
        res.status(401).json({message: "Usuario no encontrado"});
    }
    else{
        return res.status(200).json(usuario);
    }
    
});

/*usuarioRouter.get('/getByEmpresa/:idEmpresa', async(req, res) => {
    const usuario = await usuarioServices.getAllVendedores(req.params.idEmpresa);
    console.log(res);
    return res.status(200).json(usuario);
});*/

usuarioRouter.delete('/:id', async(req, res) => {
    const rowsAffected = await usuarioServices.deleteUsuario(req.params.id);
    if (rowsAffected > 0) {
        res.status(200).json({message: 'user deleted'});
    } else if (rowsAffected === 0) {
        res.status(404).json({error: 'not found'});
    }
    else res.status(500).json({error: 'server error'});
})

usuarioRouter.get('/:nombreEmpresa', async(req, res) => {
    const usuarios = await   usuarioServices.getAllVendedores(req.params.nombreEmpresa);
    console.log(req.params.nombreEmpresa);
    return res.status(200).json(usuarios);
});

export default usuarioRouter;