import config from '../../dbconfig.js';
import sql from 'mssql';

export default class notaServices {

    static insertNota = async (nota) => {
        let returnEntity = null;
        console.log(character);
        const { id, notas, fkReunion } = nota;
        let pool = await sql.connect(config);

        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Notas', sql.NVarChar(9999), Notas)
                .input('fkReunion', sql.Int, fkReunion)
                .input('Id', sql.Int, Id)
                .query('INSERT INTO Notas (Notas) VALUES (@Notas)')
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static getAllNotas = async() => {
        let returnEntity = null;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                .query('SELECT * FROM Notas WHERE fkReunion = @id ');
            returnEntity = result.recordsets[0];
        }catch (error){
            console.log(error);
        }
        return returnEntity;
    }

    static getNotaById = async (id) => {
        let returnEntity = null;
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pId', sql.Int, id)
                .query('SELECT * FROM Notas WHERE Id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static updateNota = async (Nota) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        const { id, notas, fkReunion } = Nota;
        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Notas', sql.NVarChar(9999), Notas)
                .input('Id', sql.Int, Id)
                .input('fkReunion', sql.Int, fkReunion)
                .query('UPDATE Notas SET Nota = @Nota WHERE Id = @Id');
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static deleteNota = async (id) => {
        let returnEntity = null;
        let pool = await sql.connect(config);
        try {
            const request = new sql.Request(pool);
            returnEntity = request
                .input('Id', sql.Int, id)
                .query('DELETE from Notas WHERE Id = @Id ');
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

}