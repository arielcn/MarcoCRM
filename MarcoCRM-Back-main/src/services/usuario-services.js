import config from '../../dbconfig.js';
import sql from 'mssql';


export default class usuarioServices {

    static checkExistingUser = async (Mail) => {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Mail', sql.VarChar(150), Mail)
            .query('SELECT * FROM Usuarios WHERE Mail = @Mail');
        // Comprueba si el correo electrónico existe
        console.log(result);
        if (result.recordset.length > 0) {
            console.log("logeado")
            return true;
            // El correo electrónico ya existe
        } else {
            console.log("creado :)")
            return false; // El correo electrónico no existe
        }
    }
    static insertUsuario = async (Usuario) => {
        let returnEntity = null;
        const { Nombre, Apellido, Contraseña, Mail, CodigoEmpresa, fkRol, fkEmpresa, Cuit } = Usuario;
        let pool = await sql.connect(config);
        try {
            const exists = await this.checkExistingUser(Mail);
            if (exists == true) {
                return false;
            }
            else {
                const request = new sql.Request(pool);

                returnEntity = request
                    .input('Nombre', sql.NVarChar(150), Nombre)
                    .input('Apellido', sql.NVarChar(150), Apellido)
                    .input('Contraseña', sql.NVarChar(150), Contraseña)
                    .input('Mail', sql.NVarChar(150), Mail)
                    .input('CodigoEmpresa', sql.Int, CodigoEmpresa)
                    .input('Cuit', sql.NVarChar(50), Cuit)
                    .input('fkRol', sql.Int, fkRol)
                    .input('fkEmpresa', sql.Int, fkEmpresa)
                    .query('INSERT INTO Usuarios (Nombre, Apellido, Contraseña, Mail, CodigoEmpresa, Cuit, fkRol, fkEmpresa) VALUES (@Nombre, @Apellido, @Contraseña, @Mail, @CodigoEmpresa, @Cuit, @fkRol, @fkEmpresa)')
            }
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getAllVendedores = async () => {
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM Usuarios U INNER JOIN Empresa E ON U.fkEmpresa = E.Id WHERE fkRol = 2');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    ///preguntar sobre esto

    static updateUsuario = async (Usuario) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        console.log(Usuario);
        const { Id, Nombre, Apellido, Contraseña, Mail, CodigoEmpresa, fkRol, fkEmpresa, Cuit } = Usuario;
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
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Usuarios WHERE Id = @pId');
            console.log(result);
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getUsuarioByMailYContra = async (Mail, Contraseña) => {
        let returnEntity = null;
        const mailExistente = await this.checkExistingUser(Mail);
        if (!mailExistente) { //se fija si existe el mail
            console.log("Error: El correo electrónico no está registrado.");
            return returnEntity;
        }
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Mail', sql.VarChar(150), Mail)
                .input('Contraseña', sql.VarChar(150), Contraseña)
                .query('SELECT * FROM Usuarios WHERE Mail = @Mail AND Contraseña = @Contraseña');
            console.log(result);
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    static registrarUsuario = async (Mail) => {
        const mailExistente = await this.checkExistingUser(Mail);

        if (mailExistente) {
            console.log("Error: El correo electrónico ya está registrado.");
            return;
        }
    }
    static deleteUsuario = async (id) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        try {
            const result = await pool.request()
                .input('Id', sql.Int, id)
                .query('DELETE from Usuarios WHERE Id = @Id ');
            console.log(result);
            returnEntity = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
}