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
            return true;
            // El correo electrónico ya existe
        } else {
            console.log("creado :)")
            return false; // El correo electrónico no existe
        }
    }
    static insertUsuario = async (Usuario) => {
        let returnEntity = null;
        const { Nombre, Apellido, Contraseña, Mail, fkRol, CodigoEmpresa, Cuit } = Usuario;
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
                    .input('Cuit', sql.Int, Cuit)
                    .input('fkRol', sql.Int, fkRol)
                    .input('fkEmpresa', sql.NVarChar(50), CodigoEmpresa)
                    .query('INSERT INTO Usuarios (Nombre, Apellido, Contraseña, Mail, Cuit, fkRol, fkEmpresa ) VALUES (@Nombre, @Apellido, @Contraseña, @Mail, @Cuit, @fkRol, @fkEmpresa)')
            }
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    static insertEmpresa = async (Empresa) => {
        let returnEntity = null;
        const { Id, Cuit, Nombre } = Empresa;
        let pool = await sql.connect(config);
        try {
            const request = new sql.Request(pool);
            returnEntity = request
                .input('Id', sql.NVarChar(50), Id)
                .input('Nombre', sql.NVarChar(150), Nombre)
                .input('Cuit', sql.Int, Cuit)
                .query('INSERT INTO Empresa (Id, Nombre, Cuit) VALUES (@Id, @Nombre, @Cuit)')

        } catch (error) {
            console.log(error);
        }
        return returnEntity;

    }
    static deleteEmpresa = async (Id) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        try {
            const request = new sql.Request(pool);
            returnEntity = request
                .input("fkEmpresa", sql.NVarChar(50), Id)
                .query('DELETE FROM Empresa WHERE Id = @fkEmpresa')

        } catch (error) {
            console.log(error);
        }
        return returnEntity;

    }

    static insertVendedor = async (Usuario) => {
        let returnEntity = null;
        console.log("INSERT", Usuario)
        const { Nombre, Apellido, Contraseña, Mail, fkEmpresa, Telefono } = Usuario;
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
                    .input('fkEmpresa', sql.Int, fkEmpresa)
                    .input('Telefono', sql.NVarChar(50), Telefono)
                    .query('INSERT INTO Usuarios (Nombre, Apellido, Contraseña, Mail, fkEmpresa, Telefono) VALUES (@Nombre, @Apellido, @Contraseña, @Mail, @fkEmpresa, @Telefono) WHERE FkRol = 2')
            }
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getAllVendedores = async (nombreEmpresa) => {
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("Nombre", sql.NVarChar(150), nombreEmpresa)
                .query('SELECT U.* FROM Usuarios U WHERE fkEmpresa = (SELECT Id FROM Empresa WHERE Nombre = @Nombre)');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static updateUsuario = async (Usuario) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        console.log(Usuario);
        const { Id, Nombre, Apellido, Contraseña, Mail, NombreEmpresa, fkRol, fkEmpresa, Cuit, CodigoEmpresa } = Usuario;
        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Id', sql.Int, Id)
                .input('Nombre', sql.NVarChar(150), Nombre)
                .input('Apellido', sql.NVarChar(150), Apellido)
                .input('Contraseña', sql.NVarChar(150), Contraseña)
                .input('Mail', sql.NVarChar(150), Mail)
                .input('NombreEmpresa', sql.NVarChar(50), NombreEmpresa)
                .input('fkRol', sql.Int, fkRol)
                .input('fkEmpresa', sql.Int, fkEmpresa)
                .input('Cuit', sql.NVarChar(50), Cuit)
                .input('CodigoEmpresa', sql.Int, CodigoEmpresa)
                .query('UPDATE Usuarios SET Nombre = @Nombre, Apellido = @Apellido, Contraseña = @Contraseña, Mail = @Mail, NombreEmpresa = @NombreEmpresa, fkRol = @fkRol, @fkEmpresa = @fkEmpresa, CodigoEmpresa = @CodigoEmpresa, Cuit = @Cuit WHERE Id = @Id');
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
            console.log("login exitoso", result);
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }
    static registrarUsuario = async (Mail) => {
        const mailExistente = await this.checkExistingUser(Mail);

        if (mailExistente) {
            console.log("Ha ocurrido un error en el registro.");
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