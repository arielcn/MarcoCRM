import config from '../../dbconfig.js';
import sql from 'mssql';

export default class clienteServices {
    
    static getAllClientes = async() => {
        let returnEntity = null;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM Clientes WHERE fkUsuario = @id ');
            returnEntity = result.recordsets[0];
        }catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    static insertCliente = async(cliente) => {
        let returnEntity = null;
        console.log(character);
        const {Id, Nombre, Apellido, Mail, fkUsuario} = cliente;
        let pool = await sql.connect(config);

        try{
            const request = new sql.Request(pool);

            returnEntity = request
            .input('Id', sql.Int, Id)
            .input('Nombre', sql.NVarChar(50), Nombre)
            .input('Apellido', sql.NVarChar(50), Apellido)
            .input('Mail', sql.NVarChar(50), Mail)
            .input('fkUsuario', slq.Int, fkUsuario)
            .query('INSERT INTO Clientes (Nombre, Apellido, Mail) VALUES (@Nombre, @Apellido, @Mail)')
        }catch (error) {
            console.log(error);
        }
        return returnEntity;
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
        const { Id, Nombre, Apellido, Mail, fkUsuario } = Cliente;
        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Nombre', sql.NVarChar(50), Nombre)
                .input('Apellido', sql.NVarChar(50), Apellido)
                .input('Mail', sql.NVarChar(50), Mail)
                .input('fkUsuario', slq.Int, fkUsuario)
                .input('Id', slq.Int, Id)
                .query('UPDATE Clientes SET Nombre = @Nombre, Apellido = @Apellido, Mail = @Mail WHERE Id = @Id');
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