require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const router = require("./routes");
const path = require("path");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cookieParser = require("cookie-parser");
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const compression = require('compression');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const { redisClient, redisClientService } = require('./database/redis/init')

//////////////////////////////////////////////////////////////////////////////////
// SSL certification
// const https_options = {
//  ca: fs.readFileSync("ca_bundle.crt"),
//  key: fs.readFileSync("private.key"),
//  cert: fs.readFileSync("certificate.crt")
// };
// https.createServer(https_options, function (req, res) {
//  res.writeHead(200);
//  res.end("Welcome to Node.js HTTPS Server");
// }).listen(8443)


///////////////////////////////////////////////////////////////////////////////////
// middlewares & routes
// configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(urlencodedParser);
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
// static files
app.use('/', express.static(path.join(__dirname, './public')));

// redis related
app.set('redisClientService', redisClientService);
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: 'synoptic-secret',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            secure: false,
            maxAge: 3600 * 1000 * 3
        }
    })
);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// all routers
app.use("/api/v1", router);

///////////////////////////////////////////////////////////////////////////////////
// (3)global-status error catching middleware
// Global error handler
app.use((err, req, res, next) => {
    if (err) {
        res.status(err.status || 500);
        res.json({ error: { message: err.message } });
        console.error(err);
    } else {
        next()
    }
});



///////////////////////////////////////////////////////////////////////////////////
// server starter
app.listen(port, () => {
    console.log(`Hello server ${port} port.`);
})
