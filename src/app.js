const express = require('express');
const http = require('http');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const { join, extname } = require('node:path');
const multer = require('multer');
const cors = require('cors');

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

// Use the CORS middleware
app.use(cors());
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

function safeHtml(text) {
    // Escape HTML characters to prevent XSS
    const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    // Escape the text
    const escapedText = escapeHtml(text);

    // Replace newlines with <br> tags
    const html = escapedText.replace(/\n/g, '<br>');

    return html ?? '';
}

const textToHtml = (text) => {
    // Escape HTML characters to prevent XSS
    const escapeHtml = (unsafe) => {
      return unsafe ?? ''
        // .replace(/&/g, "&amp;")
        // .replace(/</g, "&lt;")
        // .replace(/>/g, "&gt;")
        // .replace(/"/g, "&quot;")
        // .replace(/'/g, "&#039;");
    };

    // Escape the text
    const escapedText = escapeHtml(text);

    // Replace different types of line breaks with <br>
    const html = escapedText.replace(/(\r\n|\n|\r)/g, '<br>');

    // Wrap the entire text in <p> tags
    // return `<p>${html}</p>`;
    return html ?? '';
};

app.get('/', (req, res) => {
    const Query = [
        {
            queryText: "SELECT * FROM Product",
            values: []
        },
        {
            queryText: "SELECT * FROM Layanan",
            values: []
        },
        {
            queryText: "SELECT layananId, varianId FROM DetailVarian",
            values: []
        }
    ]
    connection.runMultipleSelectQueries(Query)
    .then((results) => {
        const ProductsData = results[0].map((x) => {
            x.description = textToHtml(x.description);
            return x;
        });

        const LayananData = results[1].map((x) => {
            x.count = results[2].filter(v => v.layananId == x.layananId).length;
            x.description = textToHtml(x.description);
            return x;
        });

        res.render('hero/index', {
            user: req.user,
            PRODUCTS: ProductsData,
            LAYANAN: LayananData
        });
    })
    .catch(e => {
        const ProductsData = [
            {
              productId: 'ngBk5',
              title: 'Snack Box',
              description: 'Cocok untuk Jumat Berkah, acara kantor, piknik, pengajian dan lain-lain.',
              image: '/photoProducts/pIRTAv6r8K.jpg',
              price: 0,
              show: 1,
              createdAt: '2024-07-11T19:03:59.000Z',
              lastUpdate: '2024-07-11T19:03:59.000Z'
            },
            {
              productId: 'xMX6M',
              title: 'Nasi Box',
              description: 'Cocok untuk makan siang, acara kantor, keluarga dan reuni.',
              image: '/photoProducts/F7ws8XyX8L.jpg',
              price: 0,
              show: 1,
              createdAt: '2024-07-11T19:04:42.000Z',
              lastUpdate: '2024-07-11T19:04:42.000Z'
            },
            {
              productId: 'XoFkr',
              title: 'Jumat Berkah',
              description: 'Momen berbagi rezeki.',
              image: '/photoProducts/rQagrTDqw3.jpg',
              price: 0,
              show: 1,
              createdAt: '2024-07-11T19:05:26.000Z',
              lastUpdate: '2024-07-11T19:05:26.000Z'
            }
        ];
        const LayananData = [
            {
              layananId: '4Gy2B',
              title: 'Varian Snack',
              description: '',
              image: '/photoProducts/aVPWwXW6Jr.png',
              show: 1,
              createdAt: '2024-07-11T19:12:49.000Z',
              lastUpdate: '2024-07-11T19:12:49.000Z'
            },
            {
              layananId: 'LWqJc',
              title: 'Varian Sayur',
              description: 'test',
              image: '/photoProducts/uBpxP4TTTH.png',
              show: 1,
              createdAt: '2024-07-11T19:11:26.000Z',
              lastUpdate: '2024-07-11T19:11:26.000Z'
            },
            {
              layananId: 'oIHPC',
              title: 'Varian Lauk',
              description: '',
              image: '/photoProducts/i3YT7vtqTl.png',
              show: 1,
              createdAt: '2024-07-11T19:11:58.000Z',
              lastUpdate: '2024-07-11T19:11:58.000Z'
            }
        ];
        res.render('hero/index', {
            user: req.user,
            PRODUCTS: ProductsData,
            LAYANAN: LayananData
        });
    })
})

app.get('/detail', (req, res) => {
    if (!req.query?.menu) return res.redirect('/');
    res.render(`hero/index${parseInt(req.query.menu) + 1}`);
})

app.get('/dashboard', ensureLoggedIn, (req, res, next) => {
    if (req.isAuthenticated()) {
        ensurePassword(req, res, next)
    } else return next();
}, (req, res) => {
    const Query = [
        {
            queryText: "SELECT * FROM Product",
            values: []
        },
        {
            queryText: "SELECT * FROM Layanan",
            values: []
        },
        {
            queryText: "SELECT * FROM Review",
            values: []
        },
        {
            queryText: "SELECT DetailVarian.*, la.title as varianName FROM DetailVarian LEFT JOIN Layanan la ON DetailVarian.layananId = la.layananId",
            values: []
        }
    ]
    connection.runMultipleSelectQueries(Query)
    .then((results) => {
        const ProductsData = results[0].map((x) => {
            x.description = textToHtml(x.description);
            return x;
        });
        const LayananData = results[1].map((x) => {
            x.description = textToHtml(x.description);
            return x;
        });
        const ReviewData = results[2].map((x) => {
            let test = '';
            let active  = 0;
            let notActive = 0;
            for (let index = 1; index <= 5; index++) {
                test += `<i class='bx ${index <= x.rate ? 'bxs-star star active' : "bx-star star"}' style="--i: ${index - 1};"></i>`
                if (index <= x.rate) active++
                else notActive++
            }
            x.rating = textToHtml(test).replace('<p>', '').replace('</p>', '');
            x.message = textToHtml(x.message).replace('<p>', '').replace('</p>', '');
            return x;
        });
        const VarianData = results[3]

        res.render('dashboard/index', {
            user: req.user,
            PRODUCTS: ProductsData,
            LAYANAN: LayananData,
            REVIEW: ReviewData,
            VARIAN: VarianData
        });
    })
    .catch((err) => {
        console.error(err);
    })
    // const SelectProductQuery = `SELECT * FROM Product`;
    // connection.query(SelectProductQuery, (err, rows) => {
    //     const TheData = rows.map((x) => {
    //         x.description = textToHtml(x.description);
    //         return x;
    //     });

    //     res.render('dashboard/index', {
    //         user: req.user,
    //         PRODUCTS: TheData
    //     });
    // });

});
app.get('/dashboard/addproduct', ensureLoggedIn, (req, res, next) => {
    if (req.isAuthenticated()) {
        ensurePassword(req, res, next)
    } else return next();
}, (req, res) => {
    // res.sendFile(join(__dirname, 'index.html'));
    res.render('dashboard/addproduct', {
        user: req.user,
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

        const { productName, productDescription, productPrice = 0, productImage, productImageHidden } = req.body

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
                message: `The product id doesn't exist`,
                success: false,
                error: "The product id doesn't exist"
            });
            return
        }

        const { productName, productDescription, productImage, productImageHidden } = req.body

        // console.log('THE PRODUCT IMAGE!', productImageHidden, productImage);

        let ProductDetail = {
            title: productName,
            description: productDescription,
            price: parseInt(0),
            show: 1
        }

        if (productImageHidden || productImage) {
            ProductDetail.image = productImageHidden ?? productImage;
        }

        // console.log(req.body);

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

app.post(
    '/dashboard/deleteproduct',
    async (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(400);
            res.json({
                status: 400,
                message: `You must logged in to delete product`,
                success: false,
                error: "You must logged in to delete product"
            });
            return
        }

        const ProductId = req.query.productId;
        if (!ProductId) {
            res.status(400);
            res.json({
                status: 400,
                message: `The product id doesn't exist`,
                success: false,
                error: "The product id doesn't exist"
            });
            return
        }


        const InsertProductQuery = `DELETE FROM Product WHERE productId = ?`;
        connection.query(InsertProductQuery, [ProductId], (err) => {
            if (err) {
                console.error(err);
                res.status(500);
                // res.redirect('/dashboard');
                if (req.body) {
                    res.json({
                        status: 500,
                        message: `Product with ID = ${ProductId} failed to delete`,
                        success: false,
                        error: true
                    })
                }
            } else {
                res.status(200);
                if (!req.body) {
                    res.redirect('/dashboard');
                } else {
                    res.json({
                        status: 200,
                        message: `Product with ID = ${ProductId} has been deleted`,
                        success: true,
                        error: false
                    })
                }
            }
        });
    }
);

app.post(
    '/dashboard/addlayanan',
    async (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(400);
            res.json({
                status: 400,
                message: `You must logged in to add layanan`,
                success: false,
                error: "You must logged in to add layanan"
            });
            return
        }

        const { productName, productDescription, layananImage, layananImageHidden } = req.body

        let ProductDetail = {
            layananId: GenerateUserId(5),
            title: productName,
            description: productDescription,
            image: layananImageHidden ?? layananImage,
            show: 1
        }

        console.log(ProductDetail, productName, productDescription, layananImage, layananImageHidden);

        const InsertProductQuery = `INSERT INTO Layanan SET ?`;
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
    '/dashboard/updatelayanan',
    async (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(400);
            res.json({
                status: 400,
                message: `You must logged in to edit layanan`,
                success: false,
                error: "You must logged in to edit layanan"
            });
            return
        }

        const LayanaanId = req.query.layananId;
        if (!LayanaanId) {
            res.status(400);
            res.json({
                status: 400,
                message: `The layanan id doesn't exist`,
                success: false,
                error: "The layanan id doesn't exist"
            });
            return
        }

        const { productName, productDescription, productImage, productImageHidden } = req.body

        console.log('THE LAYANAN IMAGE!', productImageHidden, productImage);

        let LayananDetail = {
            title: productName,
            description: productDescription,
            show: 1
        }

        if (productImageHidden || productImage) {
            LayananDetail.image = productImageHidden ?? productImage;
        }

        const InsertProductQuery = `UPDATE Layanan SET ? WHERE layananId = ?`;
        connection.query(InsertProductQuery, [LayananDetail, LayanaanId], (err) => {
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
    '/dashboard/deletelayanan',
    async (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(400);
            res.json({
                status: 400,
                message: `You must logged in to delete product`,
                success: false,
                error: "You must logged in to delete product"
            });
            return
        }

        const LayananId = req.query.layananId;
        if (!LayananId) {
            res.status(400);
            res.json({
                status: 400,
                message: `The layanan id doesn't exist`,
                success: false,
                error: "The layanan id doesn't exist"
            });
            return
        }

        const InsertProductQuery = `DELETE FROM Layanan WHERE layananId = ?`;
        connection.query(InsertProductQuery, [LayananId], (err) => {
            if (err) {
                console.error(err);
                res.status(500);
                // res.redirect('/dashboard');
                if (req.body) {
                    res.json({
                        status: 500,
                        message: `Product with ID = ${LayananId} failed to delete`,
                        success: false,
                        error: true
                    })
                }
            } else {
                res.status(200);
                if (!req.body) {
                    res.redirect('/dashboard');
                } else {
                    res.json({
                        status: 200,
                        message: `LayananId with ID = ${LayananId} has been deleted`,
                        success: true,
                        error: false
                    })
                }
            }
        });
    }
);

app.post(
    '/api/addreview',
    async (req, res) => {
        const { rating, name, opinion } = req.body

        let ProductDetail = {
            reviewId: GenerateUserId(5),
            name,
            rate: parseInt(rating),
            message: opinion
        }

        const InsertProductQuery = `INSERT INTO Review SET ?`;
        connection.query(InsertProductQuery, ProductDetail, (err) => {
            if (err) {
                console.error(err);
                res.status(500);
                // res.redirect('/dashboard');
            } else {
                res.status(200);
                res.redirect('/');
            }
        });
    }
);

app.post(
    '/dashboard/deletereview',
    async (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(400);
            res.json({
                status: 400,
                message: `You must logged in to delete review`,
                success: false,
                error: "You must logged in to delete review"
            });
            return
        }

        const ReviewId = req.query.reviewId;

        if (!ReviewId) {
            res.status(400);
            res.json({
                status: 400,
                message: `The review id doesn't exist`,
                success: false,
                error: "The review id doesn't exist"
            });
            return
        }

        const DeleteReviewQuery = `DELETE FROM Review WHERE reviewId = ?`;
        connection.query(DeleteReviewQuery, ReviewId, (err) => {
            if (err) {
                console.error(err);
                res.status(500);
                // res.redirect('/dashboard');
                if (req.body) {
                    res.json({
                        status: 500,
                        message: `Review with ID = ${ReviewId} failed to delete`,
                        success: false,
                        error: true
                    })
                }
            } else {
                res.status(200);
                if (!req.body) {
                    res.redirect('/dashboard');
                } else {
                    res.json({
                        status: 200,
                        message: `Review with ID = ${ReviewId} has been deleted`,
                        success: true,
                        error: false
                    })
                }
            }
        });
    }
);

app.post(
    '/dashboard/addvarian',
    async (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(400);
            res.json({
                status: 400,
                message: `You must logged in to add varian`,
                success: false,
                error: "You must logged in to add varian"
            });
            return
        }

        const { varianName, varian, varianImage, varianImageHidden } = req.body

        let ProductDetail = {
            varianId: GenerateUserId(5),
            layananId: varian,
            title: varianName,
            image: varianImageHidden ?? varianImage,
            show: 1
        }

        const InsertProductQuery = `INSERT INTO DetailVarian SET ?`;
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
    '/dashboard/updatevarian',
    async (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(400);
            res.json({
                status: 400,
                message: `You must logged in to edit varian`,
                success: false,
                error: "You must logged in to edit varian"
            });
            return
        }

        const varianId = req.query.varianId;
        if (!varianId) {
            res.status(400);
            res.json({
                status: 400,
                message: `The varian id doesn't exist`,
                success: false,
                error: "The varian id doesn't exist"
            });
            return
        }

        const { productName, varian, productImage, productImageHidden } = req.body

        console.log('THE LAYANAN IMAGE!', productImageHidden, productImage);

        let LayananDetail = {
            title: productName,
            layananId: varian,
            show: 1
        }

        if (productImageHidden || productImage) {
            LayananDetail.image = productImageHidden ?? productImage;
        }

        const InsertProductQuery = `UPDATE DetailVarian SET ? WHERE varianId = ?`;
        connection.query(InsertProductQuery, [LayananDetail, varianId], (err) => {
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
    '/dashboard/deletevarian',
    async (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(400);
            res.json({
                status: 400,
                message: `You must logged in to delete varian`,
                success: false,
                error: "You must logged in to delete varian"
            });
            return
        }

        const VarianId = req.query.varianId;
        if (!VarianId) {
            res.status(400);
            res.json({
                status: 400,
                message: `The varian id doesn't exist`,
                success: false,
                error: "The varian id doesn't exist"
            });
            return
        }

        const InsertProductQuery = `DELETE FROM DetailVarian WHERE varianId = ?`;
        connection.query(InsertProductQuery, [VarianId], (err) => {
            if (err) {
                console.error(err);
                res.status(500);
                // res.redirect('/dashboard');
                if (req.body) {
                    res.json({
                        status: 500,
                        message: `Varian with ID = ${VarianId} failed to delete`,
                        success: false,
                        error: true
                    })
                }
            } else {
                res.status(200);
                if (!req.body) {
                    res.redirect('/dashboard');
                } else {
                    res.json({
                        status: 200,
                        message: `Varian with ID = ${VarianId} has been deleted`,
                        success: true,
                        error: false
                    })
                }
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
    res.json({ ProductPicture: `/photoProducts/${ProductPicture.filename}` });
});

app.get('/dashboard/product', ensureLoggedIn, (req, res) => {
    const SelectProductQuery = `SELECT * FROM Product`;
    connection.query(SelectProductQuery, (err, rows) => {
        const TheData = rows.map((x) => {
            x.description = textToHtml(x.description);
            return x;
        });

        res.render('dashboard/productList', {
            user: req.user,
            PRODUCTS: TheData
        });
    });
});

app.get('/dashboard/product/:id', ensureLoggedIn, (req, res) => {
    const ProductId = req.params.id;
    if (!ProductId) {
        res.status(404);
        res.sendFile(join(__dirname, `views/pages/error-404.html`));
        return;
    }

    const SelectProductQuery = `SELECT * FROM Product WHERE productId = ?`
    connection.query(SelectProductQuery, ProductId, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(404);
            res.sendFile(join(__dirname, `views/pages/error-404.html`));
        } else {
            const TheData = rows.map((x) => {
                x.description = safeHtml(x.description);
                return x
            })
            res.status(200);
            res.render('dashboard/product', {
                user: req.user,
                ProductData: TheData[0]
            });
        }
    });
});

app.get('/dashboard/layanan/:id', ensureLoggedIn, (req, res) => {
    const ProductId = req.params.id;
    if (!ProductId) {
        res.status(404);
        res.sendFile(join(__dirname, `views/pages/error-404.html`));
        return;
    }

    const SelectProductQuery = `SELECT * FROM Layanan WHERE layananId = ?`
    connection.query(SelectProductQuery, ProductId, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(404);
            res.sendFile(join(__dirname, `views/pages/error-404.html`));
        } else {
            const TheData = rows.map((x) => {
                x.description = safeHtml(x.description);
                return x
            })
            res.status(200);
            res.render('dashboard/layanan', {
                user: req.user,
                LayananData: TheData[0]
            });
        }
    });
});

app.get('/dashboard/varian/:id', ensureLoggedIn, (req, res) => {
    const ProductId = req.params.id;
    if (!ProductId) {
        res.status(404);
        res.sendFile(join(__dirname, `views/pages/error-404.html`));
        return;
    }

    const Query = [
        {
            queryText: "SELECT * FROM DetailVarian WHERE varianId = ?",
            values: [ProductId]
        },
        {
            queryText: "SELECT layananId, title FROM Layanan",
            values: []
        },
    ]
    connection.runMultipleSelectQueries(Query)
    .then((results) => {
        const VarianData = results[0]
        const LayananData = results[1]
        res.status(200);
        res.render('dashboard/varian', {
            user: req.user,
            LAYANAN: LayananData,
            VarianData: VarianData[0]
        });
    })
    .catch(err => {
        console.error(err);
        res.status(404);
        res.sendFile(join(__dirname, `views/pages/samples/error-404.html`));
    })
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
            user: req.user,
        });
    }
});

// Login
app.get('/login', (req, res) => {
    res.render('login');
});

// Logout
app.get('/logout', (req, res) => {
    req.logout(() => { });
    res.redirect('/');
});

app.post('/logout', (req, res) => {
    req.logout(() => { });
    res.redirect('/');
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