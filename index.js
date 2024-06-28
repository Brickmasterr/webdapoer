require('dotenv').config()
require('events').EventEmitter.defaultMaxListeners = 1000;

const config = require('./src/config');
const MYSQL_CLASS = require('./src/handler/database/DBUtil');
const connection = new MYSQL_CLASS(config.dbConfig);
connection.connect(config.dbConfig, function() {
    global.mysql_connection = connection;

    require('./src/server');
});


process.on('unhandledRejection', e => console.error(e))
    .on('uncaughtException', e => console.error(e));