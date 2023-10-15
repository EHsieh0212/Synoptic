const mysql = require('mysql2');
require('dotenv').config();

if (!process.env.DB_HOST ||
    !process.env.DB_USER ||
    !process.env.DB_PWD) {
    throw new Error("HOST/USER/PWD should be set in environment variables");
}

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME
})

/**
 * Perform async/await SQL command
 * @param {string} sql: the main sql command
 * @param {Array} inputString: prepared statements in an array
 */
const dbSqlCommand = async (sql, params) => {
    try {
        params = params || [];
        const queryResult = await db.promise().execute(sql, params);
        return queryResult;
    } catch (error) {
        console.error('Error executing SQL:', error);
        throw error;
    }
}

/**
 * Perform SQL transaction, mainly used in admin product creation.
 * @param {} actions 
 */
const dbTransaction = async (actions) => {
    try {
        await db.promise().query('START TRANSACTION');
        for (let i = 0; i < actions.length; i++) {
            await dbSqlCommand(actions, actions[i][0], actions[i][1]);
        }
        await db.promise().query('COMMIT');
    } catch (error) {
        if (db) {
            await db.promise().query('ROLLBACK');
        };
        console.error(error);
        throw new Error("Error occurrs when performing SQL transaction, resulting in a rollback.");
    }
}

module.exports = { db, dbSqlCommand, dbTransaction };

