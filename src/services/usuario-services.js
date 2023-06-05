import config from '../../dbconfig.js';
import sql from 'mssql';


export default class usuarioServices {

    static insertUsuario = async (Usuario) => {
        let returnEntity = null;
        console.log(Usuario);
        const { nombre, apellido, contraseña, mail, codigoEmpresa, fkRol, fkEmpresa, cuit } = Usuario;
        let pool = await sql.connect(config);
        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Nombre', sql.NVarChar(150), nombre)
                .input('Apellido', sql.NVarChar(150), apellido)
                .input('Contraseña', sql.NVarChar(150), contraseña)
                .input('Mail', sql.NVarChar(150), mail)
                .input('CodigoEmpresa', sql.Int, codigoEmpresa)
                .input('Cuit', sql.NVarChar(50), cuit)
                .input('fkRol', sql.Int, fkRol)
                .input('fkEmpresa', sql.Int, fkEmpresa)
                .query('INSERT INTO Usuarios (Nombre, Apellido, Contraseña, Mail, CodigoEmpresa, Cuit, fkRol, fkEmpresa) VALUES (@Nombre, @Apellido, @Contraseña, @Mail, @CodigoEmpresa, @Cuit, @fkRol, @fkEmpresa)')
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static updateUsuario = async (Usuario) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        console.log(Usuario);
        const { id, nombre, apellido, contraseña, mail, codigoEmpresa, fkRol, fkEmpresa, cuit } = Usuario;
        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Id', sql.Int, Id)
                .input('Nombre', sql.NVarChar(150), Nombre)
                .input('Apellido', sql.NVarChar(150), Apellido)
                .input('Contraseña', sql.NVarChar(150), Contraseña)
                .input('Mail', sql.NVarChar(150), Mail)
                .input('CodigoEmpresa', sql.Int, CodigoEmpresa)
                .input('Cuit', sql.NVarChar(50), Cuit)
                .input('fkRol', sql.Int, fkRol)
                .input('fkEmpresa', sql.Int, fkEmpresa)
                .query('UPDATE Usuarios SET Nombre = @Nombre, Apellido = @Apellido, Contraseña = @Contraseña, Mail = @Mail, CodigoEmpresa = @CodigoEmpresa, Cuit = @Cuit WHERE Id = @Id');
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getUsuarioById = async (id) => {
        let returnEntity = null;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Usuarios WHERE Id = @pId');
            console.log(result);
            returnEntity = result.recordsets[0][0];
        }catch (error){
            console.log(error);
        }
        return returnEntity;
    }
    static getUsuarioByNombreYContra= async (Nombre, Contraseña) => {
        let returnEntity = null;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Nombre', sql.VarChar(150), Nombre)
                .input('Contraseña', sql.VarChar(150), Contraseña)
                .query('SELECT * FROM Usuarios WHERE Nombre = @Nombre AND Contraseña = @Contraseña');
            console.log(result);
            returnEntity = result.recordsets[0][0];
        }catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    static deleteUsuario = async(id) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        try{
            const result = await pool.request()
                .input('Id', sql.Int, id)
                .query('DELETE from Usuarios WHERE Id = @Id ');
                console.log(result);
                returnEntity = result.rowsAffected;
        }catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
}