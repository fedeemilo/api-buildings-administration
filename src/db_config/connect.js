const { logConsole } = require('./helpers');
const { db: credentials, env } = require("../globalConfig");
const oracledb = require("oracledb");
let connectionPool;

const connectionPoolMock = (onlineForTest = false) => ({
    dbPool: {
        getConnection: () => ({
            execute: () => ({ rows: [] }),
            close: () => true
        })
    },
    online: onlineForTest
})

//* create the connection pool with the proper dbParams
const createPool = async (dbParams, enviroment = env) => {
    if (enviroment === 'test') return connectionPoolMock(true);
    const { user, password, connectString } = dbParams;
    if (user === "" || password === "" || connectString === "") {
        logConsole(`Error creating pool - Validate dbParams ${dbParams}`);
        return connectionPoolMock();
    }
    if (!connectionPool) {
        try {
            const dbConn = await oracledb.createPool({
                user,
                password,
                connectString
            });

            connectionPool = {
                dbPool: dbConn,
                online: true
            }
            logConsole(`Connection Pool created successfully`);
        } catch (error) {
            logConsole(`Error creating pool - SOW:42 ${error.message}`);
            return connectionPoolMock()
        }
    }
    return connectionPool
};

const getPool = () => (createPool(credentials));

module.exports = { createPool, getPool };