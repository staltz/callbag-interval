const test = require('tape');
const interval = require('./index');

test('interval(50) sends 5 times then we dispose it', function(t) {
  t.plan(5);

  const expected = [0, 1, 2, 3, 4];

  let talkback;
  function observe(type, data) {
    if (type === 0) {
      talkback = data;
      return;
    }
    if (type === 1) {
      t.equals(data, expected.shift(), 'interval sent data');
      if (expected.length === 0) {
        talkback(2);
      }
      return;
    }
  }

  interval(50)(0, observe);
});

test('interval(1000) can be disposed before anything is sent', function(t) {
  t.plan(1);

  let talkback;
  function observe(type, data) {
    if (type === 0) {
      talkback = data;
      setTimeout(() => {
        talkback(2);
        t.pass('disposed');
      }, 200);
      return;
    }
    if (type === 1) {
      t.fail('data should not be sent');
      return;
    }
  }

  interval(1000)(0, observe);
});
