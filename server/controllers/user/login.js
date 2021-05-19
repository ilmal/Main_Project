const router = require("express").Router()
const User = require("../../models/user/config.model")
const bcrypt = require("bcrypt")
const authToken = require("../../jwt/verifyToken")
const jtw = require("jsonwebtoken")
const { cookie } = require("request-promise")


router.post("/", async (req, res) => {

    console.log("reqName: ", req.body.name)

    // if name exists
    const user = await User.findOne({ name: req.body.name })
    if (!user) {
        console.log("User does not exist1")
        return res.send("User doesn't exist")
    }

    // if pass is correct
    const pass = await bcrypt.compare(req.body.password, user.password)
    if (!pass) {
        console.log("Pass not valid")
        return res.send("Pass not valid")
    }

    // assign jwt token & cookies
    const token = jtw.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: 3600
    })
    console.log("cookieTOKEN: ", token)

    const domainWhitelist = [
        'http://192.168.1.247:3000',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://192.168.1.247:5000',
        'http://localhost:5000',
        'http://127.0.0.1:5000'
    ]

    let cookieDomain = ""

    if (domainWhitelist.indexOf(req.headers.origin) !== -1) {
        cookieDomain = req.headers.origin
    }
    // res.cookie("loginAuth", token, {
    //     sameSite: 'none', secure: true
    // })
    // res.cookie("userID", user.id, {
    //     sameSite: 'none', secure: true 
    // })
    res.send({
        "loginAuth": token,
        "userID": user.id,
        "message": "Success!"
    })

    // res
    //     .writeHead(200, {
    //         "Set-Cookie": [`loginAuth=${token}; Secure;SameSite=None;Path=/`, `userID=${user.id}; Secure;SameSite=None;Path=/`]
    //     })
    //     .send()

    console.log("login success")
})

module.exports = router