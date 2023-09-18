import config from '../../dbconfig.js';
import sql from 'mssql';

export default class agendaServices {

    static insertAgenda = async (Agenda) => {
        let returnEntity = null;
        console.log(character);
        const { Id, NombreCliente, ApellidoCliente, Telefono, Descripcion } = Agenda;
        let pool = await sql.connect(config);

        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('NombreCliente', sql.NVarChar(50), NombreCliente)
                .input('ApellidoCliente', sql.NVarChar(50), ApellidoCliente)
                .input('Telefono', sql.NVarChar(50), Telefono)
                .input('Descripcion', sql.NVarChar(999), Descripcion)
                .query('INSERT INTO Agendas (NombreCliente, NombreCliente, Telefono, Descripcion) VALUES (@NombreCliente, @NombreCliente, @Telefono, @Descripcion)')
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getAllAgendas = async () => {
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM Agendas WHERE fkUsuario = @Id ');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getAgendaById = async (Id) => {
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Id', sql.Int, Id)
                .query('SELECT * FROM Agendas WHERE Id = @Id');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static updateAgenda = async (Agenda) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        const { Id, NombreCliente, ApellidoCliente, Telefono, Descripcion } = Agenda;
        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('NombreCliente', sql.NVarChar(50), NombreCliente)
                .input('ApellidoCliente', sql.NVarChar(50), ApellidoCliente)
                .input('Telefono', sql.NVarChar(50), Telefono)
                .input('Descripcion', sql.NVarChar(999), Descripcion)
                .query('UPDATE Agendas SET NombreCliente = @NombreCliente, ApellidoCliente = @ApellidoCliente, Telefono = @Telefono, Descripcion = @Descripcion   WHERE Id = @Id');
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static deleteAgenda = async (Id) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        try {
            const request = new sql.Request(pool);
            returnEntity = request
                .input('Id', sql.Int, Id)
                .query('DELETE from Agendas WHERE Id = @Id ');
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

}