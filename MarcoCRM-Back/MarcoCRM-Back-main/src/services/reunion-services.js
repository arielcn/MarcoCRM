import config from '../../dbconfig.js';
import sql from 'mssql';

export default class reunionServices {

    static insertReunion = async (reunion) => {
        let returnEntity = null;
        console.log(reunion);
        const { id, titulo, formato, fechaYHora, color, codigoEmpresa, imagen } = reunion;
        let pool = await sql.connect(config);

        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Id', sql.Int, Id)
                .input('Titulo', sql.NVarChar(50), Titulo)
                .input('Formato', sql.Int, Formato)
                .input('FechaYHora', sql.Date, FechaYHora)
                .input('Color', sql.NVarChar(50), Color)
                .input('CodigoEmpresa', sql.Int, CodigoEmpresa)
                .input('Imagen', sql.NVarChar(9999), Imagen)
                .query('INSERT INTO Reuniones (Titulo, Formato, FechaYHora, Color, CodigoEmpresa, Imagen) VALUES (@Titulo, @Formato, @FechaYHora, @Color, @CodigoEmpresa, @Imagen)')
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getAllReuniones = async() => {
        let returnEntity = null;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM Reuniones');
            returnEntity = result.recordsets[0];
        }catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    static getReunionById = async (id) => {
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Reuniones WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static updateReunion = async (Reunion) => {
        let returnEntity = null;
        const { id, titulo, formato, fechaYHora, color, codigoEmpresa, imagen } = Reunion;
        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Id', sql.Int, Id)
                .input('Titulo', sql.NVarChar(50), Titulo)
                .input('Formato', sql.Int, Formato)
                .input('FechaYHora', sql.Date, FechaYHora)
                .input('Color', sql.NVarChar(50), Color)
                .input('CodigoEmpresa', sql.Int, CodigoEmpresa)
                .input('Imagen', sql.NVarChar(9999), Imagen)
                .query('UPDATE Reuniones SET Titulo = @Titulo, Formato = @Formato, FechaYHora = @FechaYHora, Color = @Color, CodigoEmpresa = @CodigoEmpresa, Imagen = @Imagen WHERE Id = @Id');
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