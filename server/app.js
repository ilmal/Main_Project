// dotenv
if (process.env.TYPE === "production") {
    require("dotenv").config()
} else {
    require('dotenv').config({ path: `./.env.dev` })
}

//requireing db
require("./models/minecraftConfig/db.js");
require("./models/user/db.js");

const express = require("express");
const app = express();
const http = require("http")
const https = require("https")
const path = require("path")
const HTTPS_PORT = 31002;
const HTTP_PORT = 31001;
const bodyparser = require("body-parser")
const cookieParser = require("cookie-parser")
const fs = require("fs")

// cookies
app.use(cookieParser());

//bodyparser
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.use((req, res, next) => {
    const corsWhitelist = [
        "http://localhost:31000",
        "http://192.168.1.247:31000",
        "https://nils.u1.se:8005",
        "http://nils.u1.se:8005",
        "https://servers.u1.se",
        "http://servers.u1.se",
        'https://192.168.1.247:3000',
        'https://localhost:3000',
        'https://127.0.0.1:3000',
    ];
    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.header({
            "Access-Control-Allow-Origin": req.headers.origin,
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Accept, Authorization, authorization, id, Set-Cookie",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS"
        });
        res.set({
            "Access-Control-Allow-Origin": req.headers.origin,
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie",
            "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Accept, Authorization, authorization, id, Set-Cookie",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS"
        })
    }
    next();
});

// redirecting get req
const controller_router = require("./routes/router.js");
app.use("/api", controller_router)

const https_options = {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem"))
}

// setting up server:
https.createServer(https_options, app).listen(HTTPS_PORT, () => console.log(`HTTPS listening on port: ${HTTPS_PORT}`));
http.createServer(app).listen(HTTP_PORT, () => console.log(`HTTP listening on port: ${HTTP_PORT}`));
