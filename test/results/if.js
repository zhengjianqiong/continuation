/* Generated by Continuation.js v0.0.7 */
var err, text, a;
(function (cont) {
  if (bool) {
    if (a) {
      a = b;
    }
    fs.readFile('e.js', function () {
      err = arguments[0];
      text = arguments[1];
      cont();
    });
  } else {
    setTimeOut(function () {
      (function (cont) {
        if (c == 1) {
          fs.readFile('e.js', function () {
            err = arguments[0];
            text = arguments[1];
            cont();
          });
        } else {
          cont();
        }
      }(function (err) {
        if (err !== undefined)
          return cont(err);
        cont();
      }));
    }, 1000);
  }
}(function (err) {
  if (err !== undefined)
    return cont(err);
  a = err;
}));