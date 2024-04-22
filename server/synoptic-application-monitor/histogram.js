const promClient = require('prom-client');

const histogram = (register) => {
  const hc = new promClient.Histogram({
    name: 'synoptic_my_custom_histogram',
    help: 'This is my custom histogram',
    labelNames: ['code', 'color'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10], // 0.1 to 10 seconds
  });

  setTimeout(() => {
    hc.labels('200', 'blue').observe(Math.random());
    hc.labels('300', 'red').observe(Math.random());
    hc.labels('300', 'blue').observe(Math.random());
    hc.labels('200', 'red').observe(Math.random());
  }, 10);

  register.registerMetric(hc);
};

module.exports = { histogram };
