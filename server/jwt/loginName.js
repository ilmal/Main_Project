const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const express = require("express")
const app = express()
const User = require("../models/user/config.model")

app.use(cookieParser())

const loginName = (req, res, next)=>{
    const cookie = req.cookies
    const decode = jwt.decode(cookie.loginAuth)
    req.user = decode    
    if(req.user === null){
        return res.app.locals.uname = "signed out", next()
    }
    User.find((err, data)=>{
        if(!err){
            data.forEach(element => {
                if (element._id == req.user._id){
                    const uname = element.name
                    res.app.locals.uname = uname
                    next()
                }
            })
        }else{
            console.log("error when getting data: ", err)
        }
    })
}
module.exports = loginName
