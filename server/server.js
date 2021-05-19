'use strict';

var app = require('./app.js');

const httpsWorker = (glx) => {

    var httpsServer = glx.httpsServer();

    httpsServer.listen(3001, "0.0.0.0", () => {
        console.log("HTTPS listening on", 3001)
    })

    var httpServer = glx.httpServer();

    httpServer.listen(3002, "0.0.0.0", function() {
        console.info("HTTP Listening on ", 3002);
    });
}

require('greenlock-express')
    .init({
        packageRoot: __dirname,

        // contact for security and critical bug notices
        maintainerEmail: "nils@u1.se",

        // where to look for configuration
        configDir: './greenlock.d',

        // whether or not to run at cloudscale
        cluster: false
    })
    // Serves on 80 and 443
    // Get's SSL certificates magically!
    .ready(httpsWorker);


