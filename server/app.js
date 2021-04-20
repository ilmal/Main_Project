// dotenv
const dotenv = require("dotenv")
dotenv.config()

//requireing db
require("./models/minecraftConfig/db.js");
require("./models/user/db.js");

const express = require("express");
const app = express();
const PORT = 3001;
const bodyparser = require("body-parser")
const cookieParser = require("cookie-parser")

// cookies
app.use(cookieParser());

//bodyparser
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.use((req, res, next) => {
    const corsWhitelist = [
        'http://192.168.1.247:3000',
        'http://localhost:3000',
        'http://192.168.1.247:5000',
        'http://localhost:5000'
    ];
    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
        res.header({
            "Access-Control-Allow-Origin": req.headers.origin,
            // "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            "Access-Control-Allow-Credentials": "true"
        });
        res.set({
            "Access-Control-Allow-Origin": req.headers.origin,
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            "Access-Control-Allow-Credentials": "true"
        })
    }
    next();
});

// redirecting get req
const controller_router = require("./routes/router.js")
app.use("/api", controller_router)

// setting up server:
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
