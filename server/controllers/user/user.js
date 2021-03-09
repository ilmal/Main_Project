const router = require("express").Router()
var ObjectId = require('mongodb').ObjectID;

const User = require("../../models/user/config.model")

router.post("/", async (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "http://localhost:3000"
    })

    const oid = ObjectId(req.body.id)

    // if email exists
    const user = await User.findOne({ _id: oid })
    if (!user) {
        console.log("user does not exist")
        return res.status(400)
    }

    console.log("You are: ", user.name)


    res.send({
        name: user.name,
        email: user.email
    })
})

module.exports = router