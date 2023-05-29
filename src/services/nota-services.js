import config from '../../dbconfig.js';
import sql from 'mssql';

export default class notaServices {

    static insertNota = async (nota) => {
        let returnEntity = null;
        console.log(character);
        const { Id, Notas, fkReunion } = nota;
        let pool = await sql.connect(config);

        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Notas', sql.NVarChar(9999), Notas)
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
                .query('SELECT * FROM Notas WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static updateNota = async (Nota) => {
        let returnEntity = null;
        const { Id, Notas, fkReunion } = Nota;
        try {
            const request = new sql.Request(pool);

            returnEntity = request
                .input('Notas', sql.NVarChar(9999), Notas)
                .query('UPDATE Notas SET Nota = @Nota WHERE Id = @Id');
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    static deleteNota = async (id) => {
        let returnEntity = null;
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