const router = require("express").Router()
const User = require("../../models/user/config.model")
const bcrypt = require("bcrypt")
const authToken = require("../../jwt/verifyToken")
const jtw = require("jsonwebtoken")
var ObjectId = require('mongodb').ObjectID;

router.post("/", async (req, res) => {

    console.log(req.body.oldPassword)

    const oid = ObjectId(req.body.id)

    // if user exists
    const user = await User.findOne({ _id: oid })
    if (!user) {
        console.log("user does not exist")
        return res.status(400)
    }

    // if pass is correct
    const pass = await bcrypt.compare(req.body.oldPassword, user.password)
    if (!pass) {
        console.log("pass not valid")
        return res.status(400)
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.newPassword, salt)

    user.password = hashedPass

    await user.save((err, doc) => {
        if (!err) {
            console.log("saving...")
            console.log("saved!")
        } else {
            console.log("Error occured during record insertion: ", err);
        }
    });

    res.send({
        data: "success"
    })

    console.log("login success")
})

module.exports = router