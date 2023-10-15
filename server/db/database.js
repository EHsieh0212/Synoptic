const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
})

const dbSqlCommand = async(sql, target) => {
    let queryResult;
    if (target){
        try{
            queryResult = await db.promise().query(sql, target);
        } catch(error){
            console.log(error)
            throw error;
        }
    } else{
        try{
            queryResult = await db.promise().query(sql);
        } catch(error){
            throw error;
        }
    }
    return queryResult;
}

const dbTransaction = async (actions) => {
    try {
        await db.promise().query('START TRANSACTION');
        for (let i in actions){
            await dbSqlCommand(actions[i][0], actions[i][1]);
        }
      } catch (error) {
        if (db) {
            await conn.query('ROLLBACK');
        };
        throw error;
      }
}

module.exports = {dbSqlCommand, dbTransaction};

