'use strict';

const ms = require('ms')
  , Timer = require('timer.js')
  , ProgressBar = require('progress')
  , hdate = require('human-date')
  , notifier = require('node-notifier')
  , argv = require('minimist')(process.argv.slice(1), { boolean: 'd' })
  , log = console.log
  ;

if (argv.d) {
  log('Timer started');
  require('daemon')();
}

if (process.env.NODE_ENV !== 'test') {
  // find the time argument
  const timeArg = argv._.find(arg => ms(arg));
  if (!timeArg) {
    throw new Error('Invalid time, try "5min"');
  }
  toZero(timeArg);
}

function toZero(timeArg, done) {
  // convert to ms
  const time = ms(timeArg);

  let bar;
  const tick = 0.5;
  const timer = new Timer({
    tick,
    onstart,
    ontick,
    onend
  }).start(time / 1000);
  
  function onstart() {
    const timeStr = hdate.relativeTime(time / 1000, {
      futureSuffix: '…',
      allUnits: true
    });
    log(`Counting down ${timeStr}`);
    bar = new ProgressBar('[:bar]', {
      complete: '=',
      incomplete: ' ',
      width: 60,
      total: time
    });
    bar.tick(0);
  }

  function ontick(msLeft) {
    bar.tick(tick * 1000);
  }

  function onend() {
    if (typeof done === 'function') {
      return done();
    }

    bar.tick(time);
    const title = 'to-zero countdown complete';
    const msg = { message: argv.m || title };
    if (msg.message != title) msg.title = title;
    notifier.notify(msg);
  }
}

module.exports = toZero;
