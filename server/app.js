// dotenv
const dotenv = require("dotenv")
dotenv.config()

//requireing db
require("./models/minecraftConfig/db.js");
require("./models/user/db.js");

const express = require("express");
const PORT = 3001;
const bodyparser = require("body-parser")
const app = express();
const cookieParser = require("cookie-parser")
const loginName = require("./jwt/loginName");

// cookies
app.use(cookieParser());

//bodyparser
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.use(loginName)

// redirecting get req
const controller_router = require("./controllers/router.js")
app.use("/api", controller_router)

// setting up server:
app.listen(PORT, ()=> console.log(`listening on port: ${PORT}`));
