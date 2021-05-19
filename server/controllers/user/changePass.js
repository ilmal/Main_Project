const router = require("express").Router()
const User = require("../../models/user/config.model")
const bcrypt = require("bcrypt")
const authToken = require("../../jwt/verifyToken")
const jtw = require("jsonwebtoken")
var ObjectId = require('mongodb').ObjectID;

router.post("/", async (req, res) => {
    const oid = ObjectId(req.body.id)

    // if user exists
    const user = await User.findOne({ _id: oid })
    if (!user) {
        console.log("user does not exist! (Not logged in)")
        return res.send({
            type: "err",
            payload: "You need to login!"
        })
    }

    // if pass is correct
    const pass = await bcrypt.compare(req.body.oldPassword, user.password)
    if (!pass) {
        console.log("pass not valid")
        return res.send({
            type: "err",
            payload: "Pass not valid"
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.newPassword, salt)

    user.password = hashedPass

    await user.save((err, doc) => {
        if (!err) {
            console.log("saving...")
            console.log("saved!")
            res.send({
                type: "success",
                payload: "Password changed!"
            })
        } else {
            console.log("Error occured during record insertion: ", err);
            res.send({
                type: "err",
                payload: "Something went wrong!"
            })
        }
    });
})

module.exports = router