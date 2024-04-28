const promClient = require('prom-client');
const onFinished = require('on-finished');

const httpRequestHistogramMiddleware = (register) => {
  const httpRequestDurationMicroseconds = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 0.7, 1, 5, 7, 10],
    registers: [register],
  });

  return (req, res, next) => {
    const end = httpRequestDurationMicroseconds.startTimer();

    onFinished(res, () => {
      end({ method: req.method, route: req.route.path, code: res.statusCode });
    });

    next();
  };
};

module.exports = httpRequestHistogramMiddleware;
