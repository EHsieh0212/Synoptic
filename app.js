require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const productRoutes = require('./server/routers/products')
const adminRoutes = require('./server/routers/admin')
const userRoutes = require('./server/routers/user')
const checkoutRoutes = require('./server/routers/checkout')
const path = require("path");
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const cors = require('cors')
const compression = require('compression')


//////////////////////////////////////////////////////////////////////////////////
// SSL certification
const https_options = {
 ca: fs.readFileSync("ca_bundle.crt"),
 key: fs.readFileSync("private.key"),
 cert: fs.readFileSync("certificate.crt")
};
https.createServer(https_options, function (req, res) {
 res.writeHead(200);
 res.end("Welcome to Node.js HTTPS Server");
}).listen(8443)


///////////////////////////////////////////////////////////////////////////////////
// middlewares & routes
// configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());
// static files
app.use('', express.static(path.join(__dirname, 'server/public')));
app.use('/admin', express.static(path.join(__dirname, 'server/public')));
// path for react frontend
app.use(express.static(path.join(__dirname, 'client', 'build')));
// routers
app.use('/api/v1/products', [productRoutes]);
app.use('/api/v1/back', [adminRoutes]);
app.use('/api/v1/back', [checkoutRoutes]);
app.use('/api/v1/user', [userRoutes]);


///////////////////////////////////////////////////////////////////////////////////
// (3)global-status error catching middleware
app.use((err, req, res, next) => {
    res.status(err.status || 404);
    res.json({
        error: {
            msg: err
        }
    });
});

///////////////////////////////////////////////////////////////////////////////////
// server starter
app.listen(port, ()=>{
    console.log(`Hello server ${port} port, I am app.js`);
})
