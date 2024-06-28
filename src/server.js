require('./handler/util/Logger');
// console.log('test 1');
const app = require('./app');
// console.log('test 2');

const expServer = app.server.listen(process.env.port, () => {
    console.log(`server running at http://localhost:${process.env.port}`);
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