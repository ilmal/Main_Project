const router = require("express").Router()
let request = require('request');
const User = require("../../models/user/config.model")
const jwt = require("jsonwebtoken")
var ObjectId = require('mongodb').ObjectID;

router.post("/", async (req, res) => {

    console.log(req.body.token)


    const verified = jwt.verify(req.body.token, process.env.TOKEN_SECRET, async (err) => {
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
            console.log("THIS IS PASSING!")

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
            user.verified = true

            await user.save(err => {
                if (err) {
                    console.log("ERR, during insertion at changeUserValues.js: ", err)
                    return res.send({
                        type: "err",
                        payload: "ERR, during insertion at changeUserValues.js"
                    })
                } else {
                    console.log("saved!")
                    res.send({
                        type: "success",
                        payload: "success"
                    })
                }
            })
        }
    })
})

module.exports = router;