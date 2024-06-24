const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const { join } = require('node:path');

const app = express();
const server = http.createServer(app);

// Database declaration from global mysql_connection;
const connection = mysql_connection;

// MiddleWare
const passport = require('./middleware/passport/main')(connection);
const CookieUtil = require('./handler/util/CookieUtil');


require('./handler/util/Functions');

// Custom middleware to ensure user is logged out
const ensureLoggedOut = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/dashboard'); // Redirect to profile or any other page if user is already logged in
}

const ensureLoggedIn = async function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    CookieUtil.setCookie(res, 'previousUrl', req.originalUrl);
    const token = CookieUtil.getCookie(req, 'auth');

    // console.log('ensureLoggedIn', token);

    if (!token) {
        res.redirect('/login');
        return;
    }

    const userId = await connection.getUserIdFromToken(token);
    // console.log('userId', userId);
    if (!userId) res.redirect('/login'); // Redirect to profile or any other page if user is already logged in
    else {
        const user = await connection.getUserById(userId);
        req.user = user;
        // console.log(req.user);
        return next();
    }
}

const ensurePassword = UtilFunctions.ensurePassword;

// Cokie parser middleware
app.use(cookieParser());

// Session middleware
app.use(session({
    genid: (req) => {
        return uuidv4(); // Generate unique session ID
    },
    secret: 'webdapoer', // Change this to a secret key
    resave: false,
    saveUninitialized: true
}));

// Serve static files from the "public" directories
app.set('views', join(__dirname, 'views'));
app.use(express.static(join(__dirname, 'public')));

// view engine setup
app.set('view engine', 'ejs');
app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/dashboard', ensureLoggedIn, (req, res, next) => {
    if (req.isAuthenticated()) {
        ensurePassword(req, res, next)
    } else return next();
}, (req, res) => {
    // res.sendFile(join(__dirname, 'index.html'));
    res.render('dashboard/index', {
        songs: null
    });
});
app.get('/dashboard/addproduct', ensureLoggedIn, (req, res, next) => {
    if (req.isAuthenticated()) {
        ensurePassword(req, res, next)
    } else return next();
}, (req, res) => {
    // res.sendFile(join(__dirname, 'index.html'));
    res.render('dashboard/addproduct', {
        songs: null
    });
});

app.get('/pages/*', (req, res, next) => {
    if (req.isAuthenticated()) {
        ensurePassword(req, res, next)
    } else return next();
}, (req, res) => {
    console.log(req);
    // res.sendFile(join(__dirname, 'index.html'));
    res.render('index', {
        songs: null
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post(
    '/login', ensureLoggedOut,
    passport.authenticate('local', {
        // successRedirect: '/links',
        failureRedirect: '/login',
    }),
    async (req, res) => {
        const previousUrl = CookieUtil.getCookie(req, 'previousUrl') || '/dashboard';
        // console.log(previousUrl);
        CookieUtil.clearCookie(res, 'previousUrl');
        // console.log(2, previousUrl);
        // console.log(previousUrl);
        // Generate token and store in database
        const token = await connection.generateToken(req.user.user_id, true);
        CookieUtil.setCookie(res, 'auth', token, { maxAge: 3600000, httpOnly: false, secure: false });
        // console.log('from login', CookieUtil.getCookie(req, 'auth'));
        // CookieUtil.setCookie(res, 'auth', 'true', { maxAge: 3600000 });
        // res.redirect('/dashboard');
        res.redirect(previousUrl);
    }
);

app.get('/setpassword', ensureLoggedIn, (req, res) => {
    res.status(200);
    res.render('setpassword');
});

app.post('/setpassword', ensureLoggedIn, (req, res) => {
    // Handle the registration form submission
    // console.log(req);
    // console.log(req.route.stack);
    let newUser = {
        password: req.body.password,
    };

    bcrypt.genSalt(5, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            console.log(newUser.password, hash);
            newUser.password = hash;
            // Store hash in your password DB.
            // Insert the new user into the database
            const insertQuery = `UPDATE Users SET ? WHERE user_id = '${req.user.user_id}'`;
            connection.query(insertQuery, newUser, (err) => {
                if (err) {
                    console.error(err);
                    res.redirect('/setpassword');
                } else {
                    res.redirect('/login');
                }
            });
        });
    });
});

module.exports = app;
module.exports.server = server;