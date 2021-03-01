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

app.use((req, res, next)=> {
    res.header({
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        "Access-Control-Allow-Credentials": "true"
    });
    next();
  });

// redirecting get req
const controller_router = require("./routes/router.js")
app.use("/api", controller_router)

// setting up server:
app.listen(PORT, ()=> console.log(`listening on port: ${PORT}`));
