const router = require("express").Router()
var ObjectId = require('mongodb').ObjectID;

const User = require("../../models/user/config.model")

router.post("/", async (req, res) => {
    const oid = ObjectId(req.body.id)

    // if email exists
    const user = await User.findOne({ _id: oid })
    if (!user) {
        console.log("user does not exist2")
        res.send("This user doesn't exist")
    }

    if (user != null) {
        console.log("You are: ", user.name)
    }


    res.send({
        name: user.name,
        email: user.email
    })
})

module.exports = router