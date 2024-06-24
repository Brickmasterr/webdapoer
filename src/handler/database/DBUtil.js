// utils/DBUtil.js

const mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
// const { param } = require('../routers/links/main');

class DBUtil {
    constructor(config) {
        this.config = config;
        // this.pool = mysql.createPool(config);
        this.pool = null;
    }

    connect(config, callback) {
        this.pool = mysql.createPool(config);
        console.log('trying to connect', this.config);
        this.pool.on('connection', (connection) => {
            console.log('MySQL connection established');
            connection.on('error', (err) => {
                console.error('MySQL connection error:', err);
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    this.handleDisconnect();
                }
            });
        });
        // this.query = this.pool.query;
        if (callback) callback();
    }

    handleDisconnect() {
        this.pool.end(() => {
            console.log('MySQL connection closed');
            this.connect(this.config, function () {
                console.log("MySQL: Reconnected");
            }); // Reconnect
        });
    }

    async query(sql, params, callback) {
        // console.log(typeof (sql), typeof (params), typeof (callback));
        /*
            when not use params
            params convert to callback
        */
        if (typeof (params) == 'function') { callback = params; params = []; }
        if (!callback) {
            return new Promise((resolve, reject) => {
                this.pool.getConnection((err, connection) => {
                    if (err) {
                        callback(err, null);
                        return;
                    }

                    connection.query(sql, params, (queryErr, results) => {
                        connection.release();

                        if (queryErr) {
                            reject(queryErr);
                        } else {
                            resolve(results);
                        }
                    });
                });
            });
        } else {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    callback(err, null);
                    return;
                }

                connection.query(sql, params, (queryErr, results) => {
                    connection.release();

                    if (queryErr) {
                        callback(queryErr, null);
                    } else {
                        callback(null, results);
                    }
                });
            });
        }
    }

    escape(value) {
        return this.pool.escape(value);
    }

    execute(query, params, callback) {
        this.pool.getConnection((err, connection) => {
            if (err) {
                console.error('Failed to get MySQL connection:', err);
                callback(err, null);
                return;
            }
            connection.query(query, params, (err, results) => {
                connection.release();
                if (err) {
                    console.error('Failed to execute MySQL query:', err);
                    callback(err, null);
                    return;
                }
                callback(null, results);
            });
        });
    }

    async runMultipleSelectQueries(queries) {
        const results = [];

        try {
            for (const query of queries) {
                const { queryText, values } = query;
                const result = await this.query(queryText, values);
                results.push(result);
            }
            return results;
        } catch (err) {
            throw err;
        }
    }

    /*
        FOR USER / TOKEN
     */
    async deleteExpiredTokens() {
        const currentTime = new Date().toISOString();

        // Delete expired tokens from the database
        await this.query('DELETE FROM tokens WHERE expiration_time < ?', [currentTime]);
    }

    getUsers() {
        return new Promise((resolve, reject) => {
            this.pool.query('SELECT * FROM users', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    authenticateUser(username, password) {
        return new Promise((resolve, reject) => {
            this.pool.query(
                'SELECT * FROM users WHERE email = ? AND password = ?',
                [username, password],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (results.length > 0) {
                            resolve(results[0]);
                        } else {
                            resolve(null);
                        }
                    }
                }
            );
        });
    }

    generateToken(userId, check) {
        return new Promise((resolve, reject) => {
            const token = uuidv4(); // Your token generation logic here
            const expirationTime = this.calculateExpirationTime(); // Your expiration time calculation logic here
            console.log(userId, token, expirationTime);

            let ada = check ? false : true;
            if (check) {
                this.pool.query(
                    'SELECT user_id FROM tokens WHERE token = ?',
                    [token],
                    (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (results.length > 0) {
                                if (this.checkTokenExpiration(results[0]).status) {
                                    resolve(null);
                                } else {
                                    resolve(results[0].user_id);
                                    ada = true;
                                }
                            } else {
                                resolve(null);
                            }
                        }
                    }
                );
            }

            if (!ada) {
                // Insert the new token with expiration time into the database
                this.pool.query(
                    'INSERT INTO tokens (user_id, token, expiration_time) VALUES (?, ?, ?)',
                    [userId, token, expirationTime],
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(token);
                        }
                    }
                );
            }
        });
    }

    getUserIdFromToken(token) {
        return new Promise((resolve, reject) => {
            this.pool.query(
                'SELECT user_id FROM tokens WHERE token = ?',
                [token],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (results.length > 0) {
                            if (this.checkTokenExpiration(results[0]).status) {
                                resolve(null);
                            } else resolve(results[0].user_id);
                        } else {
                            resolve(null);
                        }
                    }
                }
            );
        });
    }

    getUserById(userId) {
        return new Promise((resolve, reject) => {
            this.pool.query(
                'SELECT * FROM users WHERE user_id = ?',
                [userId],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (results.length > 0) {
                            resolve(results[0]);
                        } else {
                            resolve(null);
                        }
                    }
                }
            );
        });
    }

    formatDateTime(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    calculateExpirationTime() {
        // Get the current date in the UTC+07:00 time zone
        const currentDate = new Date();
        const timeZoneOffset = -7 * 60; // UTC+07:00 is -7 hours offset from UTC
        currentDate.setUTCMinutes(currentDate.getUTCMinutes() - timeZoneOffset);

        const expirationDuration = 60 * 60 * 1000; // Expiration duration in milliseconds (e.g., 1 hour)
        const currentTime = currentDate
        const expirationTime = new Date(currentTime.getTime() + expirationDuration);
        // console.log(currentTime, expirationTime, expirationTime.toISOString());
        // return expirationTime.toISOString();
        return this.formatDateTime(expirationTime);
    }

    checkTokenExpiration(tokenData) {
        let status = false,
            message = ''
        if (!tokenData) {
            status = true
            message = 'Invalid token'
        }

        const expirationTime = new Date(tokenData.expiration_time);

        if (expirationTime <= this.getAsiaDate()) {
            status = true
            message = 'Token has expired'
        }

        return { status, message }
    }

    getAsiaDate() {
        // Get the current date in the UTC+07:00 time zone
        const currentDate = new Date();
        const timeZoneOffset = -7 * 60; // UTC+07:00 is -7 hours offset from UTC
        currentDate.setUTCMinutes(currentDate.getUTCMinutes() - timeZoneOffset);
        return currentDate
    }
}

module.exports = DBUtil;