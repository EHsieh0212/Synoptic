require('dotenv').config();
const express = require('express');
const app = express();
const port = 4000;
const router = require('./routes');
// const path = require("path");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const cookieParser = require('cookie-parser');
// const fs = require('fs');
// const https = require('https');
const client = require('prom-client');
const { histogram } = require('./synoptic-application-monitor/histogram');
const { gauge } = require('./synoptic-application-monitor/gauge');
const { counter } = require('./synoptic-application-monitor/counter');
const cors = require('cors');
const compression = require('compression');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const { redisClient, redisClientService } = require('./database/redis/init');

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

//////////////////////////////////////////////////////////////////////////////////
// Prometheus Server Setting
const register = new client.Registry();

// Add a default metrics and enable the collection of it
client.collectDefaultMetrics({
  app: 'synoptic-monitoring-app',
  prefix: 'node_',
  timeout: 10000,
  gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5], // These are the default buckets.
  register,
});

// histogram
histogram(register);

// gauge
gauge(register);

// counter
counter(register);

// Must set Prometheus before setting session
app.get('/metrics', async (req, res) => {
  try {
    // Start the timer
    const end = httpRequestDurationMicroseconds.startTimer();
    const route = req.route.path;

    const metrics = await register.metrics();
    res.setHeader('Content-Type', register.contentType);
    res.end(metrics);

    // End timer and add labels
    end({ route, code: res.statusCode, method: req.method });
  } catch (error) {
    console.error('Error generating metrics:', error);
    res.status(500).json({ error: 'Internal server error from Prometheus' });
  }
});

///////////////////////////////////////////////////////////////////////////////////
// middlewares & routes
// configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(compression());
app.use(urlencodedParser);

app.use(
  cors({
    origin(origin, callback) {
      callback(null, true);
    },
    credentials: true,
  }),
);

// redis related
app.set('redisClientService', redisClientService);
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'synoptic-secret',
    resave: false,
    saveUninitialized: false,
    proxy: true,
    rolling: true,
    cookie: {
      secure: true,
      sameSite: 'none',
      httpOnly: true,
      maxAge: 3600 * 1000 * 3,
    },
  }),
);

// all routers
app.use('/api/v1', router);

///////////////////////////////////////////////////////////////////////////////////
// (3)global-status error catching middleware
// Global error handler
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500);
    res.json({ error: { message: err.message } });
    console.error(err);
  } else {
    next();
  }
});

app.get('/test', function (req, res) {
  res.send('synoptic test routing success status');
});

///////////////////////////////////////////////////////////////////////////////////
// server starter
app.listen(port, () => {
  console.log(`Hello server ${port} port.`);
});

module.exports = app;
