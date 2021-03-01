const router = require("express").Router()
const User = require("../../models/user/config.model")
const bcrypt = require("bcrypt")
const authToken = require("../../jwt/verifyToken")
const jtw = require("jsonwebtoken")


router.post("/", async (req, res) => {

    // if email exists
    const user = await User.findOne({ name: req.body.name })
    if (!user) {
        console.log("user does not exist")
        return res.status(400)
    }

    // if pass is correct
    const pass = await bcrypt.compare(req.body.password, user.password)
    if (!pass) {
        console.log("pass not valid")
        return res.status(400)
    }

    // assign jwt token & cookies
    const token = jtw.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: 1200
    })
    console.log("token: ", token)
    res.cookie("loginAuth", token, {
        httpOnly: false
    })
    console.log(console.log("ID: ", user.id))
    res.cookie("userID", user.id, {
        httpOnly: false
    })

    res.send({
        data: "success"
    })

    console.log("login success")
})

module.exports = router