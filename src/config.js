module.exports = {
  dbConfig: {
    connectionLimit: 10,
    port: process.env.dbConfig_port,
    host: process.env.dbConfig_host,
    user: process.env.dbConfig_user,
    password: process.env.dbConfig_password,
    database: 'webdapoer'
  }
}