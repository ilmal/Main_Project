const router = require("express").Router()
const Confirm = require("./confirmation")
const User = require("../../models/user/config.model")
var ObjectId = require('mongodb').ObjectID;

router.post("/", async (req, res) => {
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

    const confirmation = await Confirm(user.email)

    if (confirmation.type != "err") {
        console.log("Confirm(user.email).payload: ", confirmation.payload)
        res.send({
            type: "message",
            payload: confirmation.payload
        })
    } else {
        res.send({
            type: "err",
            payload: confirmation.payload
        })
    }
})

module.exports = router