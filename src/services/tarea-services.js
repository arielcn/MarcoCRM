import config from '../../dbconfig.js';
import sql from 'mssql';

export default class tareaServices {

    static insertTarea = async (Tarea) => {
        let returnEntity = null;
        console.log(character);
        const { Id, Titulo, Nota, Estado, Fecha, fkUsuario } = Tarea;
        let pool = await sql.connect(config);

        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Id', sql.Int, Id)
                .input('Titulo', sql.NVarChar(50), Titulo)
                .input('Nota', sql.NVarChar(9999), Nota)
                .input('Estado', sql.NVarChar(50), Estado)
                .input('Fecha', sql.Date, Fecha)
                .input('fkUsuario', sql.Int, fkUsuario)
                .query('INSERT INTO Tareas VALUES (@Nota, @Estado, @Fecha, @fkUsuario)')
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getAllTareas = async(Id) => {
        let returnEntity = null;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Id', sql.Int, Id)
                .query('SELECT * FROM Tareas WHERE fkUsuario = @Id ');
            returnEntity = result.recordsets[0];
        }catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    static getTareaById = async (Id) => {
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, Id)
                .query('SELECT * FROM Tareas WHERE Id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static updateTarea = async (Tarea) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        const { Id, Titulo, Nota, Estado, Fecha, fkUsuario } = Tarea;
        try {
            const request = new sql.Request(pool);
            returnEntity = request
            .input('Id', sql.Int, Id)
            .input('Titulo', sql.NVarChar(50), Titulo)
            .input('Nota', sql.NVarChar(9999), Nota)
            .input('Estado', sql.NVarChar(50), Estado)
            .input('Fecha', sql.Date, Fecha)
            .input('fkUsuario', sql.Int, fkUsuario)
                .query('UPDATE Tareas SET Nota = @Nota, Estado = @Estado, Fecha = @Fecha WHERE fkUsuario = @Id');
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static deleteTarea = async (id) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        try {
            const request = new sql.Request(pool);
            returnEntity = request
                .input('Id', sql.Int, id)
                .query('DELETE from Tareas WHERE fkUsuario = @Id ');
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

}