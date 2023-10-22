require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const router = require("./routes");
const path = require("path");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended : false});
const cookieParser = require("cookie-parser");
const https = require('https');
const fs = require('fs');
const cors = require('cors')
const compression = require('compression')


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
app.use(cors());
// static files
app.use('/', express.static(path.join(__dirname, './public')));
// app.use('/admin', express.static(path.join(__dirname, 'server/public')));
// path for react frontend
// app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use("/api/v1", router);


///////////////////////////////////////////////////////////////////////////////////
// (3)global-status error catching middleware
// Global error handler
app.use((err, req, res, next) => {
    if (err){
        res.status(err.status || 500);
        res.json({ error: { message: err.message } });
        console.error(err);
    } else{
        next()
    }
});



///////////////////////////////////////////////////////////////////////////////////
// server starter
app.listen(port, () => {
    console.log(`Hello server ${port} port.`);
})