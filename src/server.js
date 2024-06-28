require('./handler/util/Logger');
// console.log('test 1');
const WEB_PORT = Number(process.env.port ?? 3000);
const app = require('./app');
// console.log('test 2');

const expServer = app.server.listen(WEB_PORT, () => {
    console.log(`server running at http://localhost:${WEB_PORT}`);
});

// add graceful shutdown.
process.on('SIGTERM', () => {
    Logger.info('SIGTERM RECEIVED. Shutting down gracefully');
    expServer.close(() => {
        Logger.info('💥 Process terminated!');
        process.exit(1);
    });
});

process.on('SIGINT', () => {
    Logger.info('SIGINT RECEIVED. Shutting down gracefully');
    expServer.close(() => {
        Logger.info('💥 Process terminated!');
    });
    process.exit(1);
});