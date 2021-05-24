const router = require("express").Router()
const Confirm = require("./confirmation")
const User = require("../../models/user/config.model")
var ObjectId = require('mongodb').ObjectID;

router.post("/", async(req, res) => {
    const oid = ObjectId(req.body.id)

    // getting user
    const user = await User.findOne({ _id: oid })
    if (!user) {
        console.log("cannot find user (resendConfirmationMail)")
        return res.send({
            type: "err",
            payload: "cannot find user"
        })
    }

    res.send(Confirm(user.email))
})

module.exports = router