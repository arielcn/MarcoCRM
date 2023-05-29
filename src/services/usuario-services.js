import config from '../../dbconfig.js';
import sql from 'mssql';


export default class usuarioServices {

    static insertUsuario = async (Usuario) => {
        let returnEntity = null;
        console.log(Usuario);
        const { Id, Nombre, Apellido, Contraseña, Mail, CodigoEmpresa, fkRol, fkEmpresa, Cuit } = Usuario;
        let pool = await sql.connect(config);

        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Nombre', sql.NVarChar(50), Nombre)
                .input('Apellido', sql.NVarChar(50), Apellido)
                .input('Contraseña', sql.NVarChar(50), Contraseña)
                .input('Mail', sql.NVarChar(50), Mail)
                .input('CodigoEmpresa', sql.NVarChar(9999), CodigoEmpresa)
                .input('Cuit', sql.NVarChar(50), Cuit)
                .query('INSERT INTO Usuarios (Nombre, Apellido, Contraseña, Mail, CodigoEmpresa, Cuit) VALUES (@Nombre, @Apellido, @Contraseña, @Mail, @CodigoEmpresa, @Cuit)')
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static updateUsuario = async (Usuario) => {
        let returnEntity = null;
        const { Id, Nombre, Apellido, Contraseña, Mail, CodigoEmpresa, fkRol, fkEmpresa, Cuit } = Usuario;
        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Nombre', sql.NVarChar(50), Nombre)
                .input('Apellido', sql.NVarChar(50), Apellido)
                .input('Contraseña', sql.NVarChar(50), Contraseña)
                .input('Mail', sql.NVarChar(50), Mail)
                .input('CodigoEmpresa', sql.NVarChar(9999), CodigoEmpresa)
                .input('Cuit', sql.NVarChar(50), Cuit)
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
                .input('pNombre', sql.NVarChar(50), Nombre)
                .input('pContraseña', sql.NVarChar(50), Contraseña)
                .query('SELECT * FROM Usuarios WHERE Nombre = @pNombre AND Contraseña = @pContraseña');
            returnEntity = result.recordsets[0][0];
        }catch (error){
            console.log(error);
        }
        return returnEntity;
    }
}