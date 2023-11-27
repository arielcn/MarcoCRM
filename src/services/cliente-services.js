import config from '../../dbconfig.js';
import sql from 'mssql';

export default class clienteServices {
    
    static getIdByMail = async(fkUsuario) => {
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("fkUsuario", sql.Int, fkUsuario)
                .query("SELECT Id FROM Usuarios WHERE fkUsuario = @fkUsuario");
            return result.recordset[0].Id;
        } catch (err) {
            console.log("error", err);
            return err;
        }
    }

    static getAllClientes = async(Id) => {
        let returnEntity = null;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('Id', sql.Int, Id)
                .query('SELECT * FROM Clientes WHERE fkUsuario = @Id');
            returnEntity = result.recordsets[0];
        }catch (error){
            console.log("error", error);
        }
        return returnEntity;
    }

    static checkExistingClient = async (Mail) => {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Mail', sql.VarChar(150), Mail)
            .query('SELECT * FROM Clientes WHERE Mail = @Mail');
        // Comprueba si el correo electrónico existe
        console.log(result);
        if (result.recordset.length > 0) {
            console.log("ya existe");
            return true; // El correo electrónico ya existe
        } else {
            console.log("false");
            return false; // El correo electrónico no existe
        }
    }

    static insertCliente = async(cliente) => {
        let returnEntity = null;
        console.log("cliente", cliente); 
        const {Nombre, Apellido, Mail, fkUsuario, Telefono} = cliente;
        let pool = await sql.connect(config);

        try{
            const exists = await this.checkExistingClient(Mail);
            if (exists) {
                return { error: "cliente existente" }
            }
            else {
                const request = new sql.Request(pool);

            returnEntity = request
            .input('Nombre', sql.NVarChar(50), Nombre)
            .input('Apellido', sql.NVarChar(50), Apellido)
            .input('Mail', sql.NVarChar(50), Mail)
            .input('fkUsuario', sql.Int, fkUsuario)
            .input('Telefono', sql.Int, Telefono)            
            .query('INSERT INTO Clientes (Nombre, Apellido, Mail, fkUsuario, Telefono) VALUES (@Nombre, @Apellido, @Mail, @fkUsuario, @Telefono)')
            }
        }catch (error) {
            console.log(error);
        }
        return { message: "client inserted" };
    }

    static getClienteById = async (id) => {
        let returnEntity = null;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Clientes WHERE Id = @pId');
            returnEntity = result.recordsets[0][0];
        }catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    static updateCliente = async (Cliente) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        const { Nombre, Apellido, Mail, fkUsuario, Telefono } = Cliente;
        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Nombre', sql.NVarChar(50), Nombre)
                .input('Apellido', sql.NVarChar(50), Apellido)
                .input('Mail', sql.NVarChar(50), Mail)
                .input('fkUsuario', sql.Int, fkUsuario)
                .input('Telefono', sql.Int, Telefono)
                .query('UPDATE Clientes SET Nombre = @Nombre, Apellido = @Apellido, Mail = @Mail, Telefono = @Telefono WHERE Id = @Id');
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static deleteCliente = async(id) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        try{
            const request = new sql.Request(pool);
            returnEntity = request
            .input('Id', sql.Int, id)
                .query('DELETE from Clientes WHERE Id = @Id ');
        }catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

}