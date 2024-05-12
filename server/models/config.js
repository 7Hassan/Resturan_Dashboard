const sql = require('mssql');
const config = {
    user: 'sa',
    password: 'StrongPassw0rd',
    server: 'localhost',
    database: 'resturent',
    options: {
        encrypt: true, // For Azure SQL Database
        trustServerCertificate: true

    }
};


const executeQuery = async (query) => {
    try {

        await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    } catch (error) {
        console.error('Error occurred:', error);
        throw error;
    } finally {
        sql.close();
    }
}
module.exports = { config, executeQuery }

