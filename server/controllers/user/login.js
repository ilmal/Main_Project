const router = require("express").Router()
const User = require("../../models/user/config.model")
const bcrypt = require("bcrypt")
const authToken = require("../../jwt/verifyToken")
const jtw = require("jsonwebtoken")


router.post("/", async (req, res) => {

    console.log("reqName: ", req.body.name)

    // if email exists
    const user = await User.findOne({ name: req.body.name })
    if (!user) {
        console.log("User does not exist1")
        return res.send("User doesn't exist").status(400)
    }

    // if pass is correct
    const pass = await bcrypt.compare(req.body.password, user.password)
    if (!pass) {
        console.log("Pass not valid")
        return res.send("Pass not valid").status(400)
    }

    // assign jwt token & cookies
    const token = jtw.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: 3600
    })
    res.cookie("loginAuth", token, {
        httpOnly: false
    })
    res.cookie("userID", user.id, {
        httpOnly: false
    })

    res.send("success")

    console.log("login success")
})

module.exports = router