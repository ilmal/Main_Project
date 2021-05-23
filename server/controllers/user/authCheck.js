const { verify } = require("jsonwebtoken")
const router = require("express").Router()
const verifyToken = require("../../jwt/verifyToken")
const User = require("../../models/user/config.model")
var ObjectId = require('mongodb').ObjectID;

router.get("/", verifyToken, async (req, res) => {

    const oid = ObjectId(req.headers.Id)
    console.log("oid", oid)

    // getting user
    const user = await User.findOne({ _id: oid })
    if (!user) {
        console.log("cannot find user")
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