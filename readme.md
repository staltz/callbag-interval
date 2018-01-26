# callbag-interval

A callbag listenable source that sends incremental numbers every x milliseconds.

`npm install callbag-interval`

## example

```js
const interval = require('callbag-interval');
const observe = require('callbag-observe');

const source = interval(1000);

observe(x => console.log(x))(source); // 0
                                      // 1
                                      // 2
                                      // 3
                                      // ...
```
