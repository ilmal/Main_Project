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
const controller_router = require("./routes/router.js")
app.use("/api", controller_router)
app.get("*", (res, req)=>{
    res.status(404).end()
})

// setting up server:
app.listen(PORT, ()=> console.log(`listening on port: ${PORT}`));
