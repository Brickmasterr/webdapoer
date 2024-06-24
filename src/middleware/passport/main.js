
const config = require('../../config');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (connection) => {

    // Passport local strategy for email authentication
    passport.use(
        'local',
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
            // Query the MySQL database to find the user with the provided email
            const query = `SELECT * FROM Users WHERE username = ${connection.escape(username)}`;
            connection.query(query, (err, rows) => {
                if (err) return done(err);

                if (!rows.length) {
                    return done(null, false, { message: 'Invalid username or password' });
                }

                const user = rows[0];
                // Compare the password with the stored hash in the database
                // You'll need to implement the password hashing and comparison logic
                if (!UtilFunctions.comparePasswords(password, user.password)) {
                    return done(null, false, { message: 'Invalid username or password' });
                }

                return done(null, user);
            });
        })
    );

    // Serialize and deserialize user objects for session management
    passport.serializeUser((user, done) => {
        // done(null, user.id);
        done(null, user);

    });

    passport.deserializeUser((id, done) => {
        // Query the database to find the user with the provided ID
        done(null, id);
    });

    return passport
};