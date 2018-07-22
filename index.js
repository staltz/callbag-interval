const timer = require('callbag-timer');

const interval = period => timer(period, period);

module.exports = interval;
