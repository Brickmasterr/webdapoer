
// Compare Password
const bcrypt = require('bcrypt');
const connection = mysql_connection;

let Functions = (connection) => {
    return {
        comparePasswords: (password, hashedPassword) => {
            // return password == hashedPassword;
            return bcrypt.compareSync(password, hashedPassword);
        },
        GenerateUserId: function (length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;
            }
            return result;
        },
        bcrypt: bcrypt,
        ensurePassword: function (req, res, next) {
            const querySelect = `SELECT password FROM users WHERE user_ID = '${req.user.user_id}'`
            connection.query(querySelect, (err, rows) => {
                if (err) return console.error(err);
                if (rows.length) {
                    // console.log(rows[0].password, rows[0].password == null);
                    if (rows[0].password) {
                        next();
                        return true
                    } else {
                        res.redirect('/setpassword');
                        return false;
                    }
                } else {
                    res.redirect('/register');
                    return false;
                };
            });
        },
    }
}

// module.exports = Functions;
global.UtilFunctions = {
    comparePasswords: (password, hashedPassword) => {
        // return password == hashedPassword;
        return bcrypt.compareSync(password, hashedPassword);
    },
    GenerateUserId: function (length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    },
    bcrypt: bcrypt,
    ensurePassword: function (req, res, next) {
        const querySelect = `SELECT password FROM Users WHERE user_ID = '${req.user.user_id}'`
        connection.query(querySelect, (err, rows) => {
            if (err) return console.error(err);
            if (rows.length) {
                // console.log(rows[0].password, rows[0].password == null);
                if (rows[0].password) {
                    next();
                    return true
                } else {
                    res.redirect('/setpassword');
                    return false;
                }
            } else {
                res.redirect('/register');
                return false;
            };
        });
    },
    removeDupes: function (tracks, lastQueue) {
        const newtracks = [];
        for (let i = 0; i < tracks.length; i++) {
            let exists = false;
            for (j = 0; j < lastQueue.length; j++) {
                if (tracks[i].url === lastQueue[j].url) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                newtracks.push(tracks[i]);
            }
        }
        return newtracks;
    },
    deepParseJSON: function (jsonString) {
        return JSON.parse(jsonString, (key, value) => {
            if (typeof value === 'string') {
                try {
                    return JSON.parse(value);
                } catch (error) {
                    return value; // Return the original value if parsing fails
                }
            }
            return value;
        });
    },
    checkSpotify: function(link) {
        const spotifyList = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:[a-zA-Z\-]+\/)?(?:playlist\/|\?uri=spotify:playlist:)((\w|-){22})/i;
        const spotifyAlbum = /https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:[a-zA-Z\-]+\/)?(?:album\/|\?uri=spotify:album:)((\w|-){22})/i;

        if (spotifyList.exec(link)) {
            return {
                type: 'list',
                spotify: true
            }
        } else  if (spotifyAlbum.exec(link)) {
            return {
                type: 'album',
                spotify: true
            }
        }
        return {
            type: null,
            spotify: false
        }
    }
}