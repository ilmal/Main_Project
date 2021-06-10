const { verify } = require("jsonwebtoken")
const router = require("express").Router()
const verifyToken = require("../../jwt/verifyToken")
const User = require("../../models/user/config.model")
var ObjectId = require('mongodb').ObjectID;

router.get("/", verifyToken, async (req, res) => {

    if (req.headers.id === null) {
        res.send({
            type: "err",
            payload: "not verified"
        })
    }
    const oid = ObjectId(req.headers.id)

    // getting user
    const user = await User.findOne({ _id: oid })
    if (!user) {
        console.log("cannot find user (authCheck)")
        return res.send({
            type: "err",
            payload: "cannot find user"
        })
    }

    if (user.verified) {
        res.send({
            auth: true
        })
    } else {
        res.send({
            type: "err",
            payload: "not verified"
        })
    }

})

module.exports = router