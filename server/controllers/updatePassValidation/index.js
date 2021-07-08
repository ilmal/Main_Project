const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../../models/user/config.model")
const jwt = require("jsonwebtoken")
var ObjectId = require('mongodb').ObjectID;
router.post("/", (req, res) => {

    jwt.verify(req.body.token, process.env.TOKEN_SECRET, async (err) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                console.log("ExpiredToken since: ", err.expiredAt)
                res.send({
                    type: "err",
                    payload: "Expired token"
                })
            }
            if (err.name === "invalid signature") {
                console.log("invalid signature")
                res.send({
                    type: "err",
                    payload: "invalid signature"
                })
            }
            console.log("Error: ", err)
            res.send({
                type: "err",
                payload: err.name
            })
        } else {
            const oid = ObjectId(req.body.id)

            // getting user
            const user = await User.findOne({ _id: oid })
            if (!user) {
                console.log("cannot find user")
                return res.send({
                    type: "err",
                    payload: "cannot find user"
                })
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(req.body.newPassword, salt)

            user.password = hashedPass

            await user.save(err => {
                if (err) {
                    console.log("ERR, during insertion at updatePassValidation: ", err)
                    return res.send({
                        type: "err",
                        payload: "something went wrong during password update, please try again later!"
                    })
                } else {
                    console.log("saved!")
                    res.send({
                        type: "success",
                        payload: "password updated!"
                    })
                }
            })
        }
    })
})

module.exports = router