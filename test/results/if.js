(function (cont) {
    if (bool) {
        if (a) {
            a = b;
        } else {
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
            }(function () {
                cont();
            }));
        }, 1000);
    }
}(function () {
    var a = err;
}));