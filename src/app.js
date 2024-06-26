const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const { join, extname } = require('node:path');
const multer = require('multer');

const app = express();
const server = http.createServer(app);

// Database declaration from global mysql_connection;
const connection = mysql_connection;

// MiddleWare
const passport = require('./middleware/passport/main')(connection);
const CookieUtil = require('./handler/util/CookieUtil');

require('./handler/util/Functions');


const ensurePassword = UtilFunctions.ensurePassword;
const GenerateUserId = UtilFunctions.GenerateUserId;

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log('test upload 1');
        cb(null, 'photoProducts/');
    },
    filename: function (req, file, cb) {
        // console.log('test upload 2');
        // console.log(req.user);
        cb(null, GenerateUserId(10) + extname(file.originalname));
    }
});

// Create multer instance with the storage configuration
const uploadMulter = multer({ storage: storage });

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
// Serve uploaded files statically
app.use('/photoProducts', express.static(join(__dirname, '../photoProducts')));

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

    const SelectProductQuery = `SELECT * FROM Product`;
    connection.query(SelectProductQuery, (err, rows) => {
        console.log(rows);
        // res.sendFile(join(__dirname, 'index.html'));
        res.render('dashboard/index', {
            songs: null,
            PRODUCTS: rows
        });
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

app.post(
    '/dashboard/addproduct',
    async (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(400);
            res.json({
                status: 400,
                message: `You must logged in to add product`,
                success: false,
                error: "You must logged in to add product"
            });
            return
        }

        const { productName, productDescription, productPrice, productImage, productImageHidden } = req.body

        let ProductDetail = {
            productId: GenerateUserId(5),
            title: productName,
            description: productDescription,
            image: productImageHidden ?? productImage,
            price: parseInt(productPrice),
            show: 1
        }

        console.log(req.body);

        const InsertProductQuery = `INSERT INTO Product SET ?`;
        connection.query(InsertProductQuery, ProductDetail, (err) => {
            if (err) {
                console.error(err);
                res.status(500);
                // res.redirect('/dashboard');
            } else {
                res.status(200);
                res.redirect('/dashboard');
            }
        });
    }
);

app.post(
    '/dashboard/updateproduct',
    async (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(400);
            res.json({
                status: 400,
                message: `You must logged in to edit product`,
                success: false,
                error: "You must logged in to edit product"
            });
            return
        }

        const ProductId = req.query.productId;
        if (!ProductId) {
            res.status(400);
            res.json({
                status: 400,
                message: `You must logged in to edit product`,
                success: false,
                error: "You must logged in to edit product"
            });
            return
        }

        const { productName, productDescription, productPrice, productImage, productImageHidden } = req.body

        let ProductDetail = {
            title: productName,
            description: productDescription,
            image: productImageHidden ?? productImage,
            price: parseInt(productPrice),
            show: 1
        }

        console.log(req.body);

        const InsertProductQuery = `UPDATE Product SET ? WHERE productId = ?`;
        connection.query(InsertProductQuery, [ProductDetail, ProductId], (err) => {
            if (err) {
                console.error(err);
                res.status(500);
                // res.redirect('/dashboard');
            } else {
                res.status(200);
                res.redirect('/dashboard');
            }
        });
    }
);

// POST request to handle the profile picture upload
app.post('/dashboard/upload', uploadMulter.single('productImage'), (req, res) => {
    if (req.file) {
        // res.status(200).send('File uploaded successfully');
    } else {
        res.status(400).send('Error uploading file');
        return
    }
    // Handle the uploaded file and update the user's profile picture
    const ProductPicture = req.file;

    // Update the user's profile picture in the database or any other logic
    console.log('Product picture uploaded:', ProductPicture.filename);

    // res.redirect('/dashboard/profile');
    // Send the profile picture URL back as a JSON response
    res.json({ ProductPicture: `/uploads/${ProductPicture.filename}` });
});

app.get('/pages/*', (req, res, next) => {
    if (req.isAuthenticated()) {
        ensurePassword(req, res, next)
    } else return next();
}, (req, res) => {
    console.log(req.params[0]);
    // res.sendFile(join(__dirname, 'index.html'));
    if (req.params[0].includes('.html')) {
        res.sendFile(join(__dirname, `views/pages/${req.params[0]}`))
    } else {
        res.render(`pages/${req.params[0]}`, {
            songs: null
        });
    }
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