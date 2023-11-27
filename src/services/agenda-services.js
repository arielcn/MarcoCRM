import config from '../../dbconfig.js';
import sql from 'mssql';

export default class agendaServices {

    static insertAgenda = async (Agenda) => {
        let returnEntity = null;
        console.log("agenda:", Agenda);
        const { NombreCliente, ApellidoCliente, Telefono, Descripcion, Fecha, fkUsuario } = Agenda;
        let pool = await sql.connect(config);

        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('NombreCliente', sql.NVarChar(50), NombreCliente)
                .input('ApellidoCliente', sql.NVarChar(50), ApellidoCliente)
                .input('Telefono', sql.Int, Telefono)
                .input('Descripcion', sql.NVarChar(999), Descripcion)
                .input('Fecha', sql.Date, Fecha)
                .input('fkUsuario', sql.Int, fkUsuario)
                .query('INSERT INTO Agendas (NombreCliente, ApellidoCliente, Telefono, Descripcion, Fecha, fkUsuario) VALUES (@NombreCliente, @ApellidoCliente, @Telefono, @Descripcion, @Fecha, @fkUsuario)')
        } catch (error) {
            console.log(error);                      
        }
        return returnEntity;
    }

    static getAllAgendas = async (fkUsuario) => {
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("fkUsuario", sql.Int, fkUsuario)
                .query('SELECT * FROM Agendas WHERE fkUsuario = @fkUsuario ');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getAllAgendasPorEmpresa = async (CodigoEmpresa) => {
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('fkEmpresa', sql.NVarChar(50), CodigoEmpresa)
                .query('SELECT A.* FROM Agendas A WHERE fkUsuario IN (SELECT Id FROM Usuarios WHERE fkEmpresa = @fkEmpresa)');
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
                .input('fkUsuario', sql.Int, Id)
                .query('SELECT * FROM Agendas WHERE fkUsuario = @fkUsuario');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static updateAgenda = async (Agenda) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        const { Id, NombreCliente, ApellidoCliente, Telefono, Descripcion, Fecha } = Agenda;
        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Id', sql.Int, Id)
                .input('NombreCliente', sql.NVarChar(50), NombreCliente)
                .input('ApellidoCliente', sql.NVarChar(50), ApellidoCliente)
                .input('Telefono', sql.NVarChar(50), Telefono)
                .input('Descripcion', sql.NVarChar(999), Descripcion)
                .input('Fecha', sql.Date, Fecha)
                .query('UPDATE Agendas SET NombreCliente = @NombreCliente, ApellidoCliente = @ApellidoCliente, Telefono = @Telefono, Descripcion = @Descripcion, Fecha = @Fecha  WHERE Id = @Id');
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