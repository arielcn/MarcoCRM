import config from '../../dbconfig.js';
import sql from 'mssql';

export default class reunionServices {

    static insertReunion = async (reunion) => {
        let returnEntity = null;
        console.log(reunion);
        const { Id, Titulo, Formato, Fecha, Imagen, fkUsuario } = reunion;
        let pool = await sql.connect(config);

        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Id', sql.Int, Id)
                .input('Titulo', sql.NVarChar(50), Titulo)
                .input('Formato', sql.NVarChar(50), Formato)
                .input('Fecha', sql.Date, Fecha)
                .input('Imagen', sql.NVarChar(9999), Imagen)
                .input('fkUsuario', sql.Int, fkUsuario)
                .query('INSERT INTO Reuniones (Titulo, Formato, Fecha, Imagen, fkUsuario) VALUES (@Titulo, @Formato, @Fecha, @Imagen, @fkUsuario)')
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getAllReuniones = async(id) => {
        let returnEntity = null;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input("Id", id)
                .query('SELECT * FROM Reuniones WHERE fkUsuario = @Id');
            returnEntity = result.recordsets[0];
        }catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    static getAllReunionesPorEmpresa = async (CodigoEmpresa) => {
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('fkEmpresa', sql.NVarChar(50), CodigoEmpresa)
                //.query('SELECT R.* FROM Reuniones R WHERE fkUsuario (SELECT Id FROM Usuarios WHERE fkEmpresa = @fkEmpresa AND fkRol = 2)');
                .query('SELECT R.*, U.Nombre FROM Reuniones R INNER JOIN Usuarios U ON U.fkEmpresa = @fkEmpresa WHERE U.fkRol = 2 AND U.Id = R.fkUsuario');
            returnEntity = result.recordsets[0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getReunionById = async (Id) => {
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Id', sql.Int, Id)
                .query('SELECT * FROM Reuniones WHERE Id = @Id');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static updateReunion = async (Reunion) => {
        let returnEntity = null;
        const { Id, Titulo, Formato, Fecha, Color, CodigoEmpresa, Imagen, fkUsuario } = Reunion;
        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Id', sql.Int, Id)
                .input('Titulo', sql.NVarChar(50), Titulo)
                .input('Formato', sql.Int, Formato)
                .input('Fecha', sql.Date, Fecha)
                .input('Imagen', sql.NVarChar(9999), Imagen)
                .input('fkUsuario', sql.Int, fkUsuario)
                .query('UPDATE Reuniones SET Titulo = @Titulo, Formato = @Formato, Fecha = @Fecha, Imagen = @Imagen, fkUsuario = @fkUsuario WHERE Id = @Id');
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static deleteReunion = async (id) => {
        let returnEntity = null;
        try {
            const request = new sql.Request(pool);
            returnEntity = request
                .input('Id', sql.Int, id)
                .query('DELETE from Reuniones WHERE Id = @Id ');
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

}