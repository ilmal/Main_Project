const router = require("express").Router()
var ObjectId = require('mongodb').ObjectID;

const User = require("../../models/user/config.model")

router.post("/", async (req, res) => {
    const oid = ObjectId(req.body.userID)

    // if email exists
    const user = await User.findOne({ _id: oid })
    if (!user || user === "null") {
        console.log("user does not exist2")
        res.send("User ID doesn't exist")
    } else {

        if (req.body.name != "") {
            user.name = req.body.name
        }
        if (req.body.email != "") {
            user.email = req.body.email
        }

        await user.save(err => {
            if (err) {
                console.log("ERR, during insertion at changeUserValues.js: ", err)
                res.send("something went wrong!")
            } else {
                console.log("saved!")
                res.send("Changes successfully changed!")
            }
        })
    }
})

module.exports = router